# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm install              # Install dependencies
npm run scrape           # 同時爬取榮譽榜 + 招生資訊，輸出至 public/honors.json 與 public/bulletin.json（開發前需先執行一次）
npm run scrape:honors    # 只爬取榮譽榜
npm run scrape:bulletin  # 只爬取招生資訊佈告欄
npm run dev              # Start development server (Express + Vite HMR) on port 3000
npm run build            # Build frontend with Vite to dist/
npm run start            # Start production server (serves built dist/)
npm run lint             # Type-check with tsc --noEmit
npm run clean            # Remove dist/
```

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:
- `APP_URL` — Hosting URL
- `VITE_BASE_URL` — Vite base path（GitHub Pages 部署時由 CI 自動設定，本地開發不需要）

## Architecture

This is a **school portal web app** (國立中科實中國小部) with an integrated Express + React architecture.

### Server (`server.ts`)
- Express server on port 3000
- `GET /api/honors` — scrapes honor roll from `https://school.tc.edu.tw/open-honor/060323b` (pages 1–5) via `axios` + `cheerio`, in-memory cache with 1-hour TTL（本地開發備用，GitHub Pages 不使用）
- `GET /api/proxy-image` — proxies external images (query param `url`), adds CORS/cache headers，用於繞過學校網站圖片的跨域限制
- `GET /files/*` — serves static files from `src/files/` (images, PDFs)
- Dev mode: Vite as Express middleware (`middlewareMode: true`)
- Production mode: serves static `dist/`

### Static Data Scraping
所有資料走靜態 JSON 路線（GitHub Pages 不支援 server-side API）：
- `scripts/scrape.ts` — 主入口，同時呼叫 `scrape-honors.ts` + `scrape-bulletin.ts`
- `scripts/scrape-honors.ts` — 爬取榮譽榜，輸出 `public/honors.json`（含 `lastUpdated`、`students`）
- `scripts/scrape-bulletin.ts` — 爬取招生資訊佈告欄，輸出 `public/bulletin.json`（含 `lastUpdated`、`posts`）
- `.github/workflows/deploy.yml` — push to master 時執行 `npm run scrape`、build、部署至 GitHub Pages
- `.github/workflows/scrape-bulletin.yml` — 每日 UTC 20:00（台灣 04:00）爬取佈告欄並 commit `public/bulletin.json`

### Frontend (`src/App.tsx` + `src/tabs/`)
`App.tsx` 是 layout-only component，只管理 sidebar 導覽、`activeTab`、深色模式三個狀態。各 tab 內容是獨立 component，位於 `src/tabs/`：

- `HomeTab` — `<iframe>` 校務佈告欄
- `MidtermTab` — 硬編碼課表（年級×節次 grid，資料定義於檔案頂部）；含隱藏的原始 iframe（待確認後刪除）
- `BulletinTab` — fetch `bulletin.json`，渲染文章列表（自管 fetch 狀態）
- `ScheduleTab` — `<img>` 作息時間表
- `CalendarTab` — `<img>` 行事曆
- `HonorsTab` — fetch `honors.json`，含搜尋/班級篩選/grid-list 切換/學生 modal；refresh 按鈕與 view toggle 位於 **header**（`App.tsx` 管理，透過 props 傳入：`viewMode`、`refreshKey`、`onLoadingChange`）
- `ExtensionsTab` — 硬編碼分機資料（`extensionsData` 定義於檔案頂部）
- `TextbooksTab` — `<iframe>` PDF

**External links**（新分頁，直接在 `sidebarItems` 設定 `type: "link"`）：台中雲端校務系統、課程計畫、照片錦集、官方臉書、台中有鈣讚、中科實驗中學官網

其他功能（均在 `App.tsx`）：
- URL tab sync：`?tab=<id>` query param，切換 tab 時 `replaceState`
- 深色模式：`localStorage.getItem("theme") === "dark"`，class `dark` 掛在 `<html>`
- `motion/react` sidebar 動畫；HonorsTab 另有學生卡片 hover 動畫與 modal AnimatePresence

### Static Assets (`src/files/`)
Local files served at `/files/` by Express（dev）and copied to `dist/files/` by GitHub Actions（prod）:
- `國小部一週作息時間表.jpg`
- `國小部簡明行事曆.jpg`
- `114_國立中科實中國小部_教科書選用版本暨自編教材一覽表.pdf`

### Key Data Types
```ts
interface Student {
  id: string;
  name: string;        // 匿名化：中間字替換為 "O"（e.g. "王O明"）
  className: string;   // e.g. "三年一班"
  seatNumber: number;
  honors: HonorDetail[];
}
interface HonorDetail {
  title: string;
  achievement: string;
  date: string;
  category: string;
  url: string;
}
interface BulletinPost {
  title: string;
  url: string;
  date: string;
}
```

### Styling
- **Tailwind CSS v4**：用 `@tailwindcss/vite` plugin，CSS 入口為 `@import "tailwindcss"`（非 v3 的 `@tailwind base/components/utilities`）
- 深色模式：`src/index.css` 以 `@custom-variant dark (&:where(.dark, .dark *))` 定義，不使用 Tailwind 的 `darkMode` 設定

### Path Alias
`@` resolves to the project root.

### `sidebarItems` 擴充注意
- 選用 `hot?: boolean` 屬性顯示紅色 HOT 標籤；存取時須用 `(item as { hot?: boolean }).hot` 避免 TypeScript 窄化後的型別問題
- 時效性項目用 spread + 三元隱藏：`...(new Date() < new Date("YYYY-MM-DD") ? [{ id, ... }] : [])`（`midterm` 於 2026-04-23 後自動消失）

### 其他檔案
- `metadata.json`（根目錄）— Codex 專案識別檔，無需修改
