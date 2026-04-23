import { Library, ExternalLink, Monitor, Smartphone, PlayCircle, Info } from "lucide-react";

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
              <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" viewBox="0 0 814 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.4-150.3-109.9C85.4 774.5 48 661.2 48 552.1 48 366.4 165.1 267 280.4 267c61.6 0 113.1 40.2 150.7 40.2 35.1 0 91.1-42.4 156.8-42.4 24.9 0 108.2 2.6 168.9 80.8zm-234.1-167.3c28.3-34.1 48.1-81.4 48.1-128.8 0-6.4-.6-13.4-1.9-19.2-45.5 1.8-99.6 30.3-132.3 70.2-26.8 31.4-51.7 78.8-51.7 127.1 0 7 1.2 14 1.9 16.4 3.2.6 8.3 1.3 13.4 1.3 40.8 0 89.5-27 122.5-67z"/>
              </svg>
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
              <svg className="w-6 h-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FBBC05" d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96z"/>
                <path fill="#EA4335" d="M10.627 11.49L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055z"/>
                <path fill="#4285F4" d="M1 13.396V2.603L6.846 8z"/>
                <path fill="#34A853" d="M1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
              </svg>
              <span className="font-medium text-slate-700 dark:text-slate-300">Android（Google Play）</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </a>
        </div>
      </div>

      {/* Tutorial */}
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <PlayCircle className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">操作教學影片</h3>
        </div>
        <div className="px-6 py-5">
          <a
            href="https://youtu.be/oqGXUnKd96s"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0000" d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81z"/>
              <path fill="#FFFFFF" d="M9.75 15.5V8.5l6.5 3.5-6.5 3.5z"/>
            </svg>
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
