import { FileText, ExternalLink, Download } from "lucide-react";

export default function TextbooksTab() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <FileText className="w-8 h-8 text-slate-400" />
          教科書選用
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">更新時間 2026/3/23 12:00（請以官網為主）</span>
          <a
            href="https://sites.google.com/nehs.tc.edu.tw/elem/%E8%AA%B2%E7%A8%8B%E8%A8%88%E7%95%AB%E5%85%AC%E9%96%8B%E8%B3%87%E6%96%99"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            查看原始頁面 <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl px-4 py-3">
        <Download className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="text-sm text-blue-800 dark:text-blue-300">PDF 無法在行動裝置顯示時，請</span>
        <a
          href={`${import.meta.env.BASE_URL}files/114_國立中科實中國小部_教科書選用版本暨自編教材一覽表.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          點此開啟 PDF
        </a>
      </div>
      <iframe
        src={`${import.meta.env.BASE_URL}files/114_國立中科實中國小部_教科書選用版本暨自編教材一覽表.pdf`}
        className="w-full flex-1 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm"
        style={{ minHeight: "75vh" }}
        title="教科書選用"
      />
    </div>
  );
}
