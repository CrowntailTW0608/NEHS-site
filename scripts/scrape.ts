import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

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

async function scrape(): Promise<Student[]> {
  const studentsMap = new Map<string, Student>();
  const baseUrl = "https://school.tc.edu.tw/open-honor/060323b";

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
        const genericTitles = ["各班統計項目統計", "榮譽榜", "學生榮譽榜", "榮譽榜清單"];
        if (!honorTitle || genericTitles.some(gt => honorTitle.includes(gt))) {
          honorTitle = honorLink.title;
        }

        const categoryMatch = honorTitle.match(/\(([^)]+)\)/);
        const category = categoryMatch ? categoryMatch[1] : "一般";

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
                studentsMap.set(studentId, { id: studentId, name, className, seatNumber: 0, honors: [] });
              }
              const student = studentsMap.get(studentId)!;
              if (!student.honors.find(h => h.url === honorLink.url && h.achievement === achievement)) {
                const cleanTitle = honorTitle.replace(/\([^)]+\)/, "").trim();
                student.honors.push({
                  title: cleanTitle === achievement ? "" : cleanTitle,
                  achievement, date, category, url: honorLink.url
                });
              }
            }
          }
        });

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
        console.error(`Error fetching ${honorLink.url}:`, err);
      }
    }
  }

  const anonymize = (name: string) => {
    if (name.length < 2) return name;
    const mid = Math.floor(name.length / 2);
    return name.slice(0, mid) + "O" + name.slice(mid + 1);
  };

  const result = Array.from(studentsMap.values());
  result.forEach(s => { s.name = anonymize(s.name); });
  result.sort((a, b) => {
    if (a.className !== b.className) return a.className.localeCompare(b.className);
    return a.seatNumber - b.seatNumber;
  });
  return result;
}

async function main() {
  console.log("開始爬取榮譽榜...");
  const students = await scrape();

  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
  const pad = (n: number) => String(n).padStart(2, "0");
  const lastUpdated = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const output = { lastUpdated, students };
  const outPath = path.join(process.cwd(), "public", "honors.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");
  console.log(`完成：${students.length} 位學生，已寫入 ${outPath}`);
  console.log(`更新時間：${lastUpdated}`);
}

main().catch(err => { console.error(err); process.exit(1); });
