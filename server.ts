import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { createServer as createViteServer } from "vite";
import path from "path";

const app = express();
const PORT = 3000;

interface HonorDetail {
  title: string;
  achievement: string;
  date: string;
  category: string;
  url: string;
}

interface Student {
  id: string;
  name: string;
  className: string;
  seatNumber: number;
  honors: HonorDetail[];
}

let studentsCache: Student[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

async function fetchHonors(): Promise<Student[]> {
  const now = Date.now();
  if (studentsCache.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return studentsCache;
  }

  try {
    const studentsMap = new Map<string, Student>();
    const baseUrl = "https://school.tc.edu.tw/open-honor/060323b";
    
    // Scrape first 5 pages of the main list
    for (let page = 1; page <= 5; page++) {
      const pageUrl = page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
      const response = await axios.get(pageUrl);
      const $ = cheerio.load(response.data);
      
      const honorLinks: { title: string; url: string }[] = [];
      $(".list-group-item, tr, li").each((_, el) => {
        const a = $(el).find("a");
        const href = a.attr("href");
        if (href && (href.includes("view?id=") || href.includes("/view/"))) {
          const fullUrl = href.startsWith("http") ? href : `https://school.tc.edu.tw${href}`;
          if (!honorLinks.find(l => l.url === fullUrl)) {
            honorLinks.push({ title: a.text().trim(), url: fullUrl });
          }
        }
      });

      for (const honorLink of honorLinks) {
        try {
          await new Promise(resolve => setTimeout(resolve, 50));
          const detailResponse = await axios.get(honorLink.url);
          const $detail = cheerio.load(detailResponse.data);
          
          let honorTitle = $detail(".card-title").text().trim();
          // Filter out generic titles
          const genericTitles = ["各班統計項目統計", "榮譽榜", "學生榮譽榜", "榮譽榜清單"];
          if (!honorTitle || genericTitles.some(gt => honorTitle.includes(gt))) {
            honorTitle = honorLink.title;
          }
          
          const categoryMatch = honorTitle.match(/\(([^)]+)\)/);
          const category = categoryMatch ? categoryMatch[1] : "一般";
          
          // 1. Parse structured table
          $detail("table tr").each((_, tr) => {
            const cells = $detail(tr).find("td");
            if (cells.length >= 4) {
              const achievement = $detail(cells[1]).text().trim();
              const className = $detail(cells[2]).text().trim();
              const nameLink = $detail(cells[3]).find("a");
              const name = nameLink.text().trim();
              const studentHref = nameLink.attr("href");
              const date = $detail(cells[4]).text().trim();
              
              if (studentHref && studentHref.includes("id=")) {
                const studentId = studentHref.split("id=")[1];
                
                if (!studentsMap.has(studentId)) {
                  studentsMap.set(studentId, {
                    id: studentId,
                    name,
                    className,
                    seatNumber: 0,
                    honors: []
                  });
                }
                
                const student = studentsMap.get(studentId)!;
                if (!student.honors.find(h => h.url === honorLink.url && h.achievement === achievement)) {
                  // Clean up title: remove category and generic parts
                  const cleanTitle = honorTitle.replace(/\([^)]+\)/, "").trim();
                  
                  student.honors.push({
                    title: cleanTitle === achievement ? "" : cleanTitle,
                    achievement,
                    date,
                    category,
                    url: honorLink.url
                  });
                }
              }
            }
          });

          // 2. Parse text content for seat numbers
          const content = $detail(".card-body, .panel-body").text();
          const lines = content.split(/\n|、|，|\s{2,}/).map(l => l.trim()).filter(l => l.length > 0);
          
          for (const line of lines) {
            const match = line.match(/(\d{3})[- ]?(\d{1,2})[- ]?([\u4e00-\u9fa5]{2,5})/);
            if (match) {
              const [_, className, seat, name] = match;
              for (const student of studentsMap.values()) {
                if (student.name === name && (student.className.includes(className) || className.includes(student.className))) {
                  student.seatNumber = parseInt(seat);
                  break;
                }
              }
            }
          }
        } catch (err) {
          console.error(`Error fetching honor detail ${honorLink.url}:`, err);
        }
      }
    }

    const result = Array.from(studentsMap.values());
    result.sort((a, b) => {
      if (a.className !== b.className) return a.className.localeCompare(b.className);
      return a.seatNumber - b.seatNumber;
    });

    studentsCache = result;
    lastFetchTime = now;
    return result;
  } catch (error) {
    console.error("Error fetching honors:", error);
    return [];
  }
}

async function startServer() {
  app.get("/api/honors", async (req, res) => {
    const data = await fetchHonors();
    res.json({
      students: data,
      count: data.length,
      lastUpdated: new Date(lastFetchTime).toLocaleString()
    });
  });

  app.get("/api/proxy-image", async (req, res) => {
    const imageUrl = req.query.url as string;
    if (!imageUrl) {
      return res.status(400).send("URL is required");
    }

    try {
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
        timeout: 10000
      });

      const contentType = response.headers["content-type"];
      res.setHeader("Content-Type", contentType || "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
      res.send(response.data);
    } catch (error) {
      console.error("Error proxying image:", error);
      res.status(500).send("Error fetching image");
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
