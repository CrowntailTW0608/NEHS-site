import { useState, useEffect } from "react";
import {
  Trophy,
  Calendar,
  ExternalLink,
  Menu,
  Home,
  ChevronLeft,
  Clock,
  Phone,
  BookOpen,
  Image as ImageIcon,
  FileText,
  Globe,
  Facebook,
  Sun,
  Moon,
  Newspaper,
} from "lucide-react";
import { motion } from "motion/react";

import HomeTab from "./tabs/HomeTab";
import BulletinTab from "./tabs/BulletinTab";
import MidtermTab from "./tabs/MidtermTab";
import ScheduleTab from "./tabs/ScheduleTab";
import CalendarTab from "./tabs/CalendarTab";
import HonorsTab from "./tabs/HonorsTab";
import ExtensionsTab from "./tabs/ExtensionsTab";
import TextbooksTab from "./tabs/TextbooksTab";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [activeTab, setActiveTab] = useState(() => {
    const param = new URLSearchParams(window.location.search).get("tab");
    return param ?? "home";
  });
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeTab);
    window.history.replaceState(null, "", url.toString());
  }, [activeTab]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const sidebarItems = [
    { id: "home", label: "校務佈告欄", icon: Home, type: "tab" },
    ...(new Date() < new Date("2026-04-23") ? [{ id: "midterm", label: "期中考公告", icon: FileText, type: "tab", hot: true }] : []),
    { id: "bulletin", label: "招生資訊", icon: Newspaper, type: "tab" },
    { id: "schedule", label: "作息時間表", icon: Clock, type: "tab" },
    { id: "calendar", label: "行事曆", icon: Calendar, type: "tab" },
    { id: "honors", label: "榮譽榜", icon: Trophy, type: "tab" },
    { id: "extensions", label: "校內分機", icon: Phone, type: "tab" },
    { id: "textbooks", label: "教科書選用", icon: FileText, type: "tab" },
    { id: "course_plan", label: "課程計畫", icon: BookOpen, type: "link", url: "https://sites.google.com/nehs.tc.edu.tw/elem/%E8%AA%B2%E7%A8%8B%E8%A8%88%E7%95%AB%E5%85%AC%E9%96%8B%E8%B3%87%E6%96%99" },
    { id: "photos", label: "照片錦集", icon: ImageIcon, type: "link", url: "https://drive.google.com/drive/folders/1AYfxyl38OH3lo7NgCh1wFzGSbFm6QgKZ" },
    { id: "facebook", label: "官方臉書", icon: Facebook, type: "link", url: "https://www.facebook.com/people/%E5%9C%8B%E7%AB%8B%E4%B8%AD%E7%A7%91%E5%AF%A6%E4%B8%AD-%E5%9C%8B%E5%B0%8F%E9%83%A8/61567154196139/?locale=zh_TW" },
    { id: "milk", label: "台中有鈣讚", icon: Globe, type: "link", url: "https://milkgood.tc.edu.tw/" },
    { id: "cloud_school", label: "台中雲端校務系統", icon: Globe, type: "link", url: "https://school.tc.edu.tw/" },
    { id: "nehs", label: "中科實驗中學官網", icon: Globe, type: "link", url: "https://www.nehs.tc.edu.tw/" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-40 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
            {isSidebarOpen ? (
              <>
                <motion.a
                  href="https://sites.google.com/nehs.tc.edu.tw/elem/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap hover:underline px-1"
                >
                  中科實中-國小部(非官方)
                </motion.a>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Sidebar Navigation */}
          <nav className={`flex-1 py-6 px-3 space-y-1 custom-scrollbar ${isSidebarOpen ? "overflow-y-auto" : "overflow-visible"}`}>
            {sidebarItems.map((item) => (
              <div key={item.id} className="relative group/nav">
                <button
                  onClick={() => {
                    if (item.type === "link") {
                      window.open(item.url, "_blank");
                    } else {
                      setActiveTab(item.id);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group
                    ${activeTab === item.id
                      ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg shadow-slate-200 dark:shadow-slate-900"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? "text-white dark:text-slate-900" : "group-hover:text-slate-900 dark:group-hover:text-white"}`} />
                  {isSidebarOpen && (
                    <div className="flex items-center justify-between w-full">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-medium whitespace-nowrap flex items-center gap-1.5"
                      >
                        {item.label}
                        {(item as { hot?: boolean }).hot && (
                          <span className="text-[10px] font-bold leading-none px-1 py-0.5 rounded bg-red-500 text-white">HOT</span>
                        )}
                      </motion.span>
                      {item.type === "link" && (
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      )}
                    </div>
                  )}
                </button>
                {/* Collapsed tooltip */}
                {!isSidebarOpen && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="px-3 pb-4">
            <button
              onClick={() => setIsDark(d => !d)}
              className="w-full flex items-center justify-center p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              title={isDark ? "切換為亮色模式" : "切換為暗色模式"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ml-0 overflow-x-hidden ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
        {/* Header */}
        <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all mr-3"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                國小部 <span className="text-slate-500 dark:text-slate-400 font-medium">{sidebarItems.find(i => i.id === activeTab)?.label}</span>
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {activeTab === "home" ? <HomeTab /> :
           activeTab === "bulletin" ? <BulletinTab /> :
           activeTab === "midterm" ? <MidtermTab /> :
           activeTab === "schedule" ? <ScheduleTab /> :
           activeTab === "calendar" ? <CalendarTab /> :
           activeTab === "honors" ? <HonorsTab /> :
           activeTab === "extensions" ? <ExtensionsTab /> :
           activeTab === "textbooks" ? <TextbooksTab /> :
           (() => {
             const activeItem = sidebarItems.find(i => i.id === activeTab);
             const Icon = activeItem ? activeItem.icon : Trophy;
             return (
               <div className="flex flex-col items-center justify-center py-32 text-center">
                 <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-[3rem] mb-6">
                   <Icon className="w-16 h-16 text-slate-300 dark:text-slate-600" />
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                   {activeItem?.label} 頁面
                 </h2>
                 <p className="text-slate-500 dark:text-slate-400 max-w-md">
                   此頁面目前正在開發中，未來將會提供更多關於「{activeItem?.label}」的資訊與功能。
                 </p>
                 <button
                   onClick={() => setActiveTab("honors")}
                   className="mt-8 px-8 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all active:scale-95"
                 >
                   回到榮譽榜
                 </button>
               </div>
             );
           })()
          }
        </main>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto w-full px-4 py-12 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" />
            資訊來源：
            <a
              href="https://sites.google.com/nehs.tc.edu.tw/elem/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
            >
              國立中科實驗高級中學 國小部 官網
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
