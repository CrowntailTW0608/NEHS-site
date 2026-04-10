import { Clock, ExternalLink } from "lucide-react";

export default function ScheduleTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-6 h-6 text-slate-400" />
            作息時間表
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 leading-relaxed">
              更新時間{" "}<br className="sm:hidden" />
              2026/3/23 12:00{" "}<br className="sm:hidden" />
              （請以官網為主）
            </span>
            <a
              href="https://sites.google.com/nehs.tc.edu.tw/elem/%E5%9C%8B%E5%B0%8F%E9%83%A8%E4%B8%80%E9%80%B1%E4%BD%9C%E6%81%AF%E6%99%82%E9%96%93%E8%A1%A8"
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
            src={`${import.meta.env.BASE_URL}files/國小部一週作息時間表.jpg`}
            alt="作息時間表"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
