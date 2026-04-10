import { Home } from "lucide-react";

export default function HomeTab() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
        <Home className="w-8 h-8 text-slate-400" />
        校務佈告欄
      </h2>
      <iframe
        src="https://school.tc.edu.tw/open-message/060323b"
        className="w-full flex-1 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm"
        style={{ minHeight: "75vh" }}
        title="校務佈告欄"
      />
    </div>
  );
}
