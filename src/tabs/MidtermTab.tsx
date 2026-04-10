import { Fragment } from "react";
import { FileText, Calendar, ExternalLink } from "lucide-react";

type Cell = { subject: string; publisher: string; range: string } | null;

const grades = ["一年級", "二年級", "三年級", "四年級"];

const slots: { date: string; period: string; cells: Record<string, Cell> }[] = [
  { date: "4/22(三)", period: "第一節", cells: {
    "一年級": { subject: "國語", publisher: "翰林", range: "第1~6課+統整1、2" },
    "二年級": { subject: "國語", publisher: "翰林", range: "第1~6課+統整1、2" },
    "三年級": { subject: "國語", publisher: "翰林", range: "第1~6課+統整1、2" },
    "四年級": { subject: "國語", publisher: "翰林", range: "第1~6課+統整1、2" },
  }},
  { date: "4/22(三)", period: "第二節", cells: {
    "一年級": null, "二年級": null,
    "三年級": { subject: "自然", publisher: "翰林", range: "第1-2單元" },
    "四年級": { subject: "自然", publisher: "翰林", range: "第1-2單元" },
  }},
  { date: "4/22(三)", period: "第三節", cells: {
    "一年級": null, "二年級": null,
    "三年級": { subject: "英語", publisher: "Buzz", range: "U5-U6+R5-6" },
    "四年級": { subject: "英語", publisher: "Buzz", range: "U5-U6+R5-6" },
  }},
  { date: "4/23(四)", period: "第一節", cells: {
    "一年級": { subject: "數學", publisher: "康軒", range: "第1-5單元" },
    "二年級": { subject: "數學", publisher: "康軒", range: "第1-5單元" },
    "三年級": { subject: "數學", publisher: "康軒", range: "第1-4單元" },
    "四年級": { subject: "數學", publisher: "康軒", range: "第1-5單元" },
  }},
  { date: "4/23(四)", period: "第二節", cells: {
    "一年級": null, "二年級": null,
    "三年級": { subject: "社會", publisher: "南一", range: "第1-2單元" },
    "四年級": { subject: "社會", publisher: "南一", range: "第1-2單元" },
  }},
];

const subjectColor: Record<string, string> = {
  "國語": "bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300",
  "數學": "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
  "自然": "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
  "英語": "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
  "社會": "bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300",
};

export default function MidtermTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <FileText className="w-8 h-8 text-slate-400" />
          期中考公告
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 leading-relaxed">
            更新時間{" "}<br className="sm:hidden" />
            2026/04/09 04:51{" "}<br className="sm:hidden" />
            （請以官網為主）
          </span>
          <a
            href="https://sites.google.com/nehs.tc.edu.tw/elem/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl transition-all shrink-0"
          >
            原始網頁 <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-5 py-3 text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2">
        <Calendar className="w-4 h-4 shrink-0" />
        <span>114學年度第二學期期中定期評量｜<strong>115/04/22(三)～04/23(四)</strong>｜一至四年級，考完後正常上課</span>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
        <div className="bg-white dark:bg-slate-800 w-max min-w-full rounded-2xl">
          <table className="w-full text-sm min-w-[420px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 w-16"></th>
                {grades.map(g => (
                  <th key={g} className="px-3 py-3 text-center font-bold text-slate-700 dark:text-slate-200">{g}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, si) => {
                const isNewDate = si === 0 || slots[si - 1].date !== slot.date;
                const dateColor = slot.date.includes("22") ? "bg-blue-500" : "bg-violet-500";
                return (
                  <Fragment key={si}>
                    {isNewDate && (
                      <tr className="border-b border-slate-100 dark:border-slate-700/50">
                        <td colSpan={5} className="px-4 py-2">
                          <div className={`w-4/5 mx-auto text-center text-xs font-bold text-white py-1 rounded-full ${dateColor}`}>
                            {slot.date}
                          </div>
                        </td>
                      </tr>
                    )}
                    <tr className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                      <td className="px-2 sm:px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                        <span className="sm:hidden" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>{slot.period}</span>
                        <span className="hidden sm:inline">{slot.period}</span>
                      </td>
                      {grades.map(grade => {
                        const cell = slot.cells[grade];
                        return (
                          <td key={grade} className="px-2 py-2 text-center">
                            {cell ? (
                              <div className={`rounded-xl border px-2 py-2 ${subjectColor[cell.subject] ?? "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"}`}>
                                <div className="font-bold text-sm leading-tight">
                                  {cell.subject}
                                  <span className="font-normal opacity-60">
                                    <span className="hidden sm:inline">｜</span>
                                    <br className="sm:hidden" />
                                    {cell.publisher}
                                  </span>
                                </div>
                                <div className="text-xs opacity-70 mt-0.5">
                                  {cell.range.split("+").map((part, i) => (
                                    <span key={i}>{i > 0 && <><br />+<br className="sm:hidden" /></>}{part}</span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-200 dark:text-slate-700">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
