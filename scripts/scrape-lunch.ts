import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

interface BulletinPost {
  title: string;
  url: string;
  date: string;
}

async function scrapeLunch(): Promise<BulletinPost[]> {
  const response = await axios.get("https://www.nehs.tc.edu.tw/category/stud00/stud04/");
  const $ = cheerio.load(response.data);
  const posts: BulletinPost[] = [];

  $(".wp-block-latest-posts__list li").each((_, li) => {
    const a = $(li).find("a").first();
    const time = $(li).find("time").first();
    const title = a.text().trim();
    const url = a.attr("href") || "";
    const date = time.attr("datetime")?.slice(0, 10) || time.text().trim();
    if (title && url && title.includes("菜單")) {
      posts.push({ title, url, date });
    }
  });

  // Some pages may list posts in other selectors; try a fallback search for links that include the keyword
  if (posts.length === 0) {
    $("a").each((_, el) => {
      const text = $(el).text().trim();
      const href = $(el).attr("href") || "";
      if (text.includes("菜單") && href.startsWith("http")) {
        posts.push({ title: text, url: href, date: "" });
      }
    });
  }

  return posts;
}

export async function run(lastUpdated: string, outDir: string) {
  const posts = await scrapeLunch();
  fs.writeFileSync(path.join(outDir, "lunch.json"), JSON.stringify({ lastUpdated, posts }, null, 2), "utf-8");
  console.log(`營養午餐完成：${posts.length} 筆，已寫入 lunch.json`);
}

// 直接執行
if (process.argv[1].includes("scrape-lunch")) {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
  const pad = (n: number) => String(n).padStart(2, "0");
  const lastUpdated = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const outDir = path.join(process.cwd(), "public");
  fs.mkdirSync(outDir, { recursive: true });
  console.log("開始爬取營養午餐..." );
  run(lastUpdated, outDir).catch(err => { console.error(err); process.exit(1); });
}
