import { Image, ExternalLink } from "lucide-react";

export default function NewUniformTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Image className="w-6 h-6 text-slate-400" />
            國小部新生服裝（運動服）
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 leading-relaxed">
              更新時間{" "}
              <br className="sm:hidden" />
              2026/05/28 06:00{" "}
              <br className="sm:hidden" />
              （請以官網為主）
            </span>
            <a
              href="https://www.nehs.tc.edu.tw/2026/05/18/%e3%80%90%e5%85%ac%e5%91%8a%e3%80%91115%e5%ad%b8%e5%b9%b4%e5%ba%a6%e5%9c%8b%e5%b0%8f%e9%83%a8%e6%96%b0%e7%94%9f%e6%9c%8d%e8%a3%9d%ef%bc%88%e9%81%8b%e5%8b%95%e6%9c%8d%ef%bc%89-%e5%be%b5%e6%b1%82/"
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
            src={`${import.meta.env.BASE_URL}files/國小運動服樣式.png`}
            alt="國小部新生服裝（運動服）"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
