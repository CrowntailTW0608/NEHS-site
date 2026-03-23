import * as fs from "fs";
import * as path from "path";
import { run as runHonors } from "./scrape-honors.js";
import { run as runBulletin } from "./scrape-bulletin.js";

const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
const pad = (n: number) => String(n).padStart(2, "0");
const lastUpdated = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
const outDir = path.join(process.cwd(), "public");
fs.mkdirSync(outDir, { recursive: true });

console.log("開始爬取榮譽榜...");
await runHonors(lastUpdated, outDir);

console.log("開始爬取佈告欄...");
await runBulletin(lastUpdated, outDir);

console.log(`更新時間：${lastUpdated}`);
