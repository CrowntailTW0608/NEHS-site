# 國立中科實驗高級中學 國小部 入口網站

國小部資訊整合入口（非官方），提供校務佈告欄、期中考公告、招生資訊、榮譽榜、行事曆、作息時間表、校內分機、教科書選用等功能。

**線上網址：** https://crowntailtw0608.github.io/NEHS-site/

## 功能一覽

| 頁面 | 說明 |
|------|------|
| 校務佈告欄 | 嵌入台中雲端校務系統公告 |
| 期中考公告 | 各年級考試科目、版本、範圍（時效性，到期自動隱藏） |
| 招生資訊 | 爬取中科實中官網招生佈告欄，靜態 JSON |
| 作息時間表 | 本地圖片 |
| 行事曆 | 本地圖片 |
| 榮譽榜 | 爬取台中雲端校務系統榮譽榜，靜態 JSON |
| 校內分機 | 行政人員業務執掌與教室分機 |
| 教科書選用 | 嵌入本地 PDF |

另有外部連結：課程計畫、照片錦集、官方臉書、台中有鈣讚、台中雲端校務系統、中科實驗中學官網。

## 本地開發

**前置需求：** Node.js

```bash
npm install       # 安裝依賴
npm run scrape    # 爬取榮譽榜 + 招生資訊（首次或需更新時執行）
npm run dev       # 啟動開發伺服器 http://localhost:3000
```

## 建置與部署

```bash
npm run build     # 建置前端至 dist/
```

部署至 GitHub Pages 由 `.github/workflows/deploy.yml` 自動處理（push to master 觸發）。

招生資訊由 `.github/workflows/scrape-bulletin.yml` 每日台灣時間 04:00 自動爬取並 commit。

## 技術架構

- **前端**：React 19 + TypeScript + Vite + Tailwind CSS v4
- **後端（本地開發）**：Express + Cheerio（爬蟲）
- **部署**：GitHub Pages（靜態）
