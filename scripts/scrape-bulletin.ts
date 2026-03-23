import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

interface BulletinPost {
  title: string;
  url: string;
  date: string;
}

async function scrapeBulletin(): Promise<BulletinPost[]> {
  const response = await axios.get("https://www.nehs.tc.edu.tw/%e6%8b%9b%e7%94%9f%e8%b3%87%e8%a8%8a%e5%9c%8b%e5%b0%8f%e9%83%a8/");
  const $ = cheerio.load(response.data);
  const posts: BulletinPost[] = [];
  $(".wp-block-latest-posts__list li").each((_, li) => {
    const a = $(li).find("a").first();
    const time = $(li).find("time").first();
    const title = a.text().trim();
    const url = a.attr("href") || "";
    const date = time.attr("datetime")?.slice(0, 10) || time.text().trim();
    if (title && url) posts.push({ title, url, date });
  });
  return posts;
}

export async function run(lastUpdated: string, outDir: string) {
  const posts = await scrapeBulletin();
  fs.writeFileSync(path.join(outDir, "bulletin.json"), JSON.stringify({ lastUpdated, posts }, null, 2), "utf-8");
  console.log(`佈告欄完成：${posts.length} 筆，已寫入 bulletin.json`);
}

// 直接執行
if (process.argv[1].includes("scrape-bulletin")) {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
  const pad = (n: number) => String(n).padStart(2, "0");
  const lastUpdated = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const outDir = path.join(process.cwd(), "public");
  fs.mkdirSync(outDir, { recursive: true });
  console.log("開始爬取佈告欄...");
  run(lastUpdated, outDir).catch(err => { console.error(err); process.exit(1); });
}
