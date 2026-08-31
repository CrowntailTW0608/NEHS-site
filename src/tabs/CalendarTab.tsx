import { Fragment } from "react";
import { Calendar, ExternalLink } from "lucide-react";

interface CalendarRow {
  date: string;
  content: string;
  note?: string;
  highlight?: boolean;
}

interface CalendarSection {
  year: string;
  rows: CalendarRow[];
}

const calendarData: CalendarSection[] = [
  {
    year: "115 年",
    rows: [
      { date: "8/31(一)", content: "115 學年度第一學期開學日" },
      { date: "8/31(一)", content: "課後照顧班開始上課", note: "上課日 8/31(一)至 1/19(二)\n10/30(五)、1/20(三)不提供服務" },
      { date: "9/9(三)", content: "課後社團陸續開課", note: "因國定假日放假影響，各社團開課日不一，實際日期以通知為主。" },
      { date: "9/7(一)-9/11(五)", content: "身高體重視力檢查週" },
      { date: "9/14(一)-9/18(五)", content: "暑假作業展" },
      { date: "9/16(三)", content: "家長日(18:00~20:00)", note: "【家長入校】" },
      { date: "9/25(五)-9/28(一)", content: "中秋節、教師節放假", highlight: true },
      { date: "10/9(五)", content: "國慶日補假", highlight: true },
      { date: "10/26(一)", content: "光復節補假", highlight: true },
      { date: "10/30(五)", content: "校慶暨公益市集、萬聖節活動", note: "【家長入校】\n當日無課後照顧班及社團" },
      { date: "11/4(三)-11/5(四)", content: "第一次定期評量（一年級不參加）", note: "二年級-國、數\n中高年級-國、自、英；數、社" },
      { date: "11/10(二)", content: "一年級國語闖關多元評量" },
      { date: "11/12(四)", content: "中高年級校外教學活動", note: "*待招標*日期可能變更" },
      { date: "11/17(二)", content: "作業抽查 1" },
      { date: "11/19(四)", content: "低年級校外教學活動", note: "*待招標*日期可能變更" },
      { date: "11/23(四)-11/27(五)", content: "校內語文競賽" },
      { date: "12/7(一)", content: "機關王校內初賽" },
      { date: "12/14(一)", content: "健康小學堂益智搶答競賽" },
      { date: "12/22(二)", content: "一年級英語闖關多元評量" },
      { date: "12/25(五)", content: "行憲紀念日補假", highlight: true },
      { date: "12/30(三)", content: "班際跳繩比賽" },
    ],
  },
  {
    year: "116 年",
    rows: [
      { date: "1/1(五)", content: "開國紀念日放假", highlight: true },
      { date: "1/5(二)", content: "作業抽查 2" },
      { date: "1/12(二)-1/13(三)", content: "第二次定期評量", note: "低年級-國、數\n中高年級-國、自、英；數、社" },
      { date: "1/20(三)", content: "休業式(全校 10:30 放學)", note: "當日無供應午餐\n請留意放學時間" },
      { date: "1/21(四)", content: "寒假開始", highlight: true, note: "2/11(四)第二學期開學日" },
    ],
  },
];

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
            <span className="text-xs text-slate-400 leading-relaxed">
              更新時間{" "}<br className="sm:hidden" />
              2026/8/31 12:00{" "}<br className="sm:hidden" />
              （請以官網為主）
            </span>
            <a
              href="https://school.tc.edu.tw/open-message/060323b/view-news/272"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              查看原始頁面 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-4">以下日期如有變更，需經本校主管會議通過，並另行公告。115/8/24 製表</p>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 dark:bg-slate-700 text-white">
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap">日期</th>
                <th className="px-4 py-3 text-left font-bold">內容</th>
                <th className="px-4 py-3 text-left font-bold">備註</th>
              </tr>
            </thead>
            <tbody>
              {calendarData.map((section) => (
                <Fragment key={section.year}>
                  <tr className="bg-slate-100 dark:bg-slate-900">
                    <td colSpan={3} className="px-4 py-2 text-center font-bold text-slate-700 dark:text-slate-300">
                      {section.year}
                    </td>
                  </tr>
                  {section.rows.map((row, idx) => (
                    <tr
                      key={`${section.year}-${idx}`}
                      className={`border-t border-slate-100 dark:border-slate-700 ${
                        row.highlight ? "bg-slate-50 dark:bg-slate-900/60" : "bg-white dark:bg-slate-800"
                      }`}
                    >
                      <td className="px-4 py-2 whitespace-nowrap text-slate-600 dark:text-slate-300">{row.date}</td>
                      <td className={`px-4 py-2 text-slate-800 dark:text-slate-100 ${row.highlight ? "font-bold" : ""}`}>
                        {row.content}
                      </td>
                      <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400 whitespace-pre-line">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
