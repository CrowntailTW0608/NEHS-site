import { useState } from "react";
import { Home } from "lucide-react";

export default function HomeTab() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
        <Home className="w-8 h-8 text-slate-400" />
        校務佈告欄
      </h2>
      <div className="relative flex-1" style={{ minHeight: "75vh" }}>
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 border-4 border-slate-100 dark:border-slate-700 border-t-slate-900 dark:border-t-slate-300 rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-400">載入中...</p>
          </div>
        )}
        <iframe
          src="https://school.tc.edu.tw/open-message/060323b"
          className="w-full h-full rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm"
          title="校務佈告欄"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
