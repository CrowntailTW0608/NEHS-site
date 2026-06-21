import { useState } from "react";
import { FileText, ExternalLink, Download } from "lucide-react";

type GV = string | string[];

const GRADES = ["一年級", "二年級", "三年級", "四年級", "五年級", "六年級"];
const _ = "";

const PUBLISHER_COLORS: Record<string, string> = {
  翰林: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  康軒: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  南一: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  部編: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  自編: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  Buzz: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  P21: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
  真平: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
};

function PublisherBadge({ name }: { name: string }) {
  let cls = "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";
  for (const [k, c] of Object.entries(PUBLISHER_COLORS)) {
    if (name.includes(k)) { cls = c; break; }
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${cls}`}>
      {name}
    </span>
  );
}

function GradeCell({ value }: { value: GV }) {
  if (!value || value === "" || (Array.isArray(value) && value.length === 0)) {
    return <span className="text-slate-300 dark:text-slate-600">—</span>;
  }
  const items = Array.isArray(value) ? value : [value];
  return (
    <div className="flex flex-col gap-1 items-center">
      {items.map((item, i) => <PublisherBadge key={i} name={item} />)}
    </div>
  );
}

type TableRow =
  | { kind: "section"; text: string }
  | { kind: "group"; text: string }
  | { kind: "data"; name: string; grades: GV[]; indent?: boolean; note?: string };

const TABLE_DATA: TableRow[] = [
  { kind: "section", text: "領域學習課程" },
  { kind: "group", text: "語文" },
  { kind: "data", name: "國語文", grades: ["翰林", "翰林", "翰林", "翰林", "南一", _], indent: true },
  { kind: "data", name: "本土語文", grades: [
    ["真平(閩南語)", "康軒(客家語)"],
    ["真平(閩南語)", "康軒(客家語)"],
    ["真平(閩南語)", "康軒(客家語)"],
    ["真平(閩南語)", "康軒(客家語)"],
    ["真平(閩南語)", "康軒(客家語)"],
    _,
  ], indent: true },
  { kind: "data", name: "新住民語文", grades: ["部編", "部編", "部編", "部編", "部編", _], indent: true },
  { kind: "data", name: "臺灣手語",   grades: ["部編", "部編", "部編", "部編", "部編", _], indent: true },
  { kind: "data", name: "英語文",     grades: [_, _, "Buzz(2)", "Buzz(3)", "Buzz(4)", _], indent: true },
  { kind: "data", name: "數學",       grades: ["康軒", "翰林", "康軒", "康軒", "康軒", _] },
  { kind: "group", text: "生活課程" },
  { kind: "data", name: "生活課程（整合）", grades: ["康軒", "康軒", _, _, _, _], indent: true, note: "一~二年級" },
  { kind: "data", name: "社會",     grades: [_, _, "翰林", "翰林", "南一", _], indent: true },
  { kind: "data", name: "自然科學", grades: [_, _, "南一", "翰林", "翰林", _], indent: true },
  { kind: "data", name: "藝術",     grades: [_, _, "康軒", "翰林", "翰林", _], indent: true },
  { kind: "data", name: "綜合活動", grades: [_, _, "南一", "南一",  "南一", _], indent: true },
  { kind: "data", name: "健康與體育", grades: ["翰林", "翰林", "康軒", "康軒", "翰林", _] },
  { kind: "section", text: "彈性學習課程" },
  { kind: "data", name: "國際領航家", grades: ["自編", "自編", "自編", "自編", "P21(3)", _] },
  { kind: "data", name: "中科閱世界", grades: ["自編", "自編", "自編", "自編", "自編",   _] },
  { kind: "data", name: "科技遊樂園", grades: ["自編", "自編", "自編", "自編", "自編",   _] },
  { kind: "data", name: "數位探險家", grades: [_, _, "自編", "自編", "自編", _] },
];

const LEGEND_ITEMS: [string, string][] = [
  ["翰林", PUBLISHER_COLORS["翰林"]],
  ["康軒", PUBLISHER_COLORS["康軒"]],
  ["南一", PUBLISHER_COLORS["南一"]],
  ["部編", PUBLISHER_COLORS["部編"]],
  ["自編", PUBLISHER_COLORS["自編"]],
  ["真平", PUBLISHER_COLORS["真平"]],
  ["Buzz / P21", PUBLISHER_COLORS["Buzz"]],
];

export default function TextbooksTab() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <FileText className="w-8 h-8 text-slate-400" />
          教科書選用
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs text-slate-400 leading-relaxed text-right">
            115 學年度（製表 115/5/22）<br />
            <span className="text-slate-300 dark:text-slate-600">請以官網資料為主</span>
          </span>
          <a
            href="https://sites.google.com/nehs.tc.edu.tw/elem/%E8%AA%B2%E7%A8%8B%E8%A8%88%E7%95%AB%E5%85%AC%E9%96%8B%E8%B3%87%E6%96%99"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
          >
            查看原始頁面 <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Download banner */}
      <div className="flex flex-wrap items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl px-4 py-3">
        <Download className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="text-sm text-blue-800 dark:text-blue-300">下載 PDF：</span>
        <a
          href={`${import.meta.env.BASE_URL}files/114-2-教科書選用.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          115 學年度教科書選用
        </a>
        <span className="text-sm text-slate-400">｜</span>
        <a
          href={`${import.meta.env.BASE_URL}files/114_國立中科實中國小部_教科書選用版本暨自編教材一覽表.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          114 學年度（舊）
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <table className="w-full text-sm border-collapse" style={{ minWidth: 620 }}>
          <colgroup>
            <col style={{ width: "9rem" }} />
            {GRADES.map((g) => <col key={g} style={{ width: "5rem" }} />)}
          </colgroup>
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">領域／課程</th>
              {GRADES.map((g) => (
                <th key={g} className="px-2 py-3 font-semibold text-slate-700 dark:text-slate-300 text-center">
                  {g}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => {
              if (row.kind === "section") {
                return (
                  <tr key={i} className="bg-slate-600 dark:bg-slate-700">
                    <td colSpan={7} className="px-4 py-2 text-white font-bold text-xs tracking-widest">
                      {row.text}
                    </td>
                  </tr>
                );
              }
              if (row.kind === "group") {
                return (
                  <tr key={i} className="bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-600">
                    <td colSpan={7} className="px-5 py-2 text-slate-500 dark:text-slate-400 font-semibold text-xs tracking-wide">
                      ▸ {row.text}
                    </td>
                  </tr>
                );
              }
              return (
                <tr
                  key={i}
                  className="border-t border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className={`py-3 pr-3 text-slate-700 dark:text-slate-300 font-medium ${row.indent ? "pl-8" : "pl-4"}`}>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      {row.indent && (
                        <span className="inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0 translate-y-[-1px]" />
                      )}
                      <span>{row.name}</span>
                      {row.note && (
                        <span className="text-xs text-slate-400 font-normal">({row.note})</span>
                      )}
                    </div>
                  </td>
                  {row.grades.map((grade, gi) => (
                    <td key={gi} className="px-2 py-3 text-center">
                      <GradeCell value={grade} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        <span className="text-xs text-slate-400 shrink-0">出版商色碼：</span>
        {LEGEND_ITEMS.map(([name, cls]) => (
          <span key={name} className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${cls}`}>
            {name}
          </span>
        ))}
      </div>

      {/* Notes */}
      <ul className="text-xs text-slate-400 dark:text-slate-500 space-y-1 px-1 list-disc list-inside">
        <li>本土語文／臺灣手語／新住民語文，依學生實際選擇語言別進行學習。</li>
        <li>生活課程為一~二年級整合課程（含社會、自然科學、藝術），三年級起分科。</li>
        <li>彈性課程自編教材須經學校課程發展委員會審查通過。</li>
        <li>六年級欄位尚未填列（以官網公告為準）。</li>
      </ul>

      {/* PDF viewer */}
      <div className="relative" style={{ minHeight: "75vh" }}>
        <p className="text-xs text-slate-400 mb-2 px-1">原始 PDF（行動裝置可能無法顯示，請點上方連結下載）</p>
        {!loaded && (
          <div className="absolute inset-0 top-6 flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 border-4 border-slate-100 dark:border-slate-700 border-t-slate-900 dark:border-t-slate-300 rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-400">載入中...</p>
          </div>
        )}
        <iframe
          src={`${import.meta.env.BASE_URL}files/114-2-教科書選用.pdf`}
          className="w-full rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm"
          style={{ height: "75vh" }}
          title="教科書選用 PDF"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
