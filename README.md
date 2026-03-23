# 國立中科實驗高級中學 國小部 入口網站

國小部資訊整合入口，提供校務佈告欄、榮譽榜、行事曆、作息時間表、校內分機等功能。

**線上網址：** https://crowntailtw0608.github.io/NEHS-site/

## 本地開發

**前置需求：** Node.js

```bash
npm install       # 安裝依賴
npm run scrape    # 爬取榮譽榜資料（首次或需更新時執行）
npm run dev       # 啟動開發伺服器 http://localhost:3000
```

## 建置與部署

```bash
npm run build     # 建置前端至 dist/
```

部署至 GitHub Pages 由 `.github/workflows/deploy.yml` 自動處理（push to master 觸發）。

榮譽榜資料由 `.github/workflows/scrape.yml` 每日台灣時間 10:00 自動更新。

## 技術架構

- **前端**：React 19 + TypeScript + Vite + Tailwind CSS
- **後端（本地開發）**：Express + Cheerio（爬蟲）
- **部署**：GitHub Pages（靜態）
