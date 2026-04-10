import { Calendar, ExternalLink } from "lucide-react";

export default function CalendarTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-slate-400" />
            行事曆
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">更新時間 2026/3/23 12:00（請以官網為主）</span>
            <a
              href="https://sites.google.com/nehs.tc.edu.tw/elem/%E5%9C%8B%E5%B0%8F%E9%83%A8%E7%B0%A1%E6%98%8E%E8%A1%8C%E4%BA%8B%E6%9B%86"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              查看原始頁面 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4">
          <img
            src={`${import.meta.env.BASE_URL}files/國小部簡明行事曆.jpg`}
            alt="行事曆"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
