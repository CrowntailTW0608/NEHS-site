import { Library, ExternalLink, Monitor, Smartphone, Youtube, Info } from "lucide-react";

export default function KonoTab() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Library className="w-8 h-8 text-slate-400" />
            KONO 電子雜誌
          </h2>
          <p className="mt-1 ml-11 text-slate-500 dark:text-slate-400 text-sm">
            隨時隨地免費閱讀電子雜誌
          </p>
        </div>
        <a
          href="https://www.nehs.tc.edu.tw/2026/04/09/%e3%80%90%e5%85%ac%e5%91%8a%e3%80%91kono-libraries%e9%9b%bb%e5%ad%90%e9%9b%9c%e8%aa%8c%e4%b8%8a%e7%b7%9a%e5%9b%89%ef%bc%81/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl transition-all shrink-0"
        >
          原始公告 <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Announcement Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl px-6 py-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
          學校圖書館已開通 KONO Libraries 電子雜誌服務，提供商業週刊、英語學習、運動、娛樂等各類雜誌，支援網頁版與手機 App，App 版另有朗讀功能。
        </p>
      </div>

      {/* Web Version */}
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <Monitor className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">電腦版</h3>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <a
            href="https://library.thekono.com/tcnehs/libraries/chinese"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline break-all"
          >
            https://library.thekono.com/tcnehs/libraries/chinese
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>
          <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">帳號：</span>
              <span>學校電子信箱（@nehs.tc.edu.tw 或 @st.tc.edu.tw）</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">預設密碼：</span>
              <span>信箱 @ 前的文字（例如帳號為 abc123@st.tc.edu.tw，預設密碼為 abc123）</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Apps */}
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <Smartphone className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">手機 App</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          <a
            href="https://apps.apple.com/tw/app/kono-libraries/id1153913439"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍎</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">iOS（App Store）</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.kono.reader.k4l"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Android（Google Play）</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </a>
        </div>
      </div>

      {/* Tutorial */}
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <Youtube className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">操作教學影片</h3>
        </div>
        <div className="px-6 py-5">
          <a
            href="https://youtu.be/oqGXUnKd96s"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            https://youtu.be/oqGXUnKd96s
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>

      {/* Note */}
      <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
        首次登入後建議修改預設密碼，資訊來源：中科實驗中學官網公告（2026/04/09）
      </p>
    </div>
  );
}
