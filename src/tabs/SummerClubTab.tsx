import { Calendar, Clock3, ExternalLink, FileText, MousePointerClick, Sparkles } from "lucide-react";

const activities = [
  {
    name: "超能運動家",
    audience: "二至四年級",
    schedule: "115 年 8 月 17 日（一）至 8 月 21 日（五）07:40-11:50",
    duration: "共五個半日",
    fee: "1,667 元",
    summary: "以游泳與球類運動為主，增加專注力、學習運動技術與規則，也會同步培養團隊合作精神。",
  },
  {
    name: "夏日樂學 A",
    audience: "一年級、二至四年級",
    schedule: "115 年 8 月 22 日（六）07:40-17:00",
    duration: "共一日",
    fee: "850 元（含午餐）",
    summary: "A、B 兩梯次主題相同但內容不同，可兩班都報名；課程涵蓋科學新發現、繪聲繪影 ABC、創意手作、美感探索、音樂律動與情緒學習。",
  },
  {
    name: "夏日樂學 B",
    audience: "一年級、二至四年級",
    schedule: "115 年 8 月 24 日（一）至 8 月 25 日（二）07:40-17:00",
    duration: "共二日",
    fee: "1,700 元（含午餐）",
    summary: "A、B 兩梯次主題相同但內容不同，可兩班都報名；課程涵蓋科學新發現、繪聲繪影 ABC、創意手作、美感探索、音樂律動與情緒學習。",
  },
];

const registrationSteps = [
  "進入報名網站後，先選擇「大雅區、國立中科實驗高級中學（國小部）」。",
  "接著點選「學生」，再選擇班級、姓名與座號。",
  "登入密碼為學生身分證字號 9 碼，不含英文字母。",
  "登入後可依公告附件畫面完成報名流程。",
];

export default function SummerClubTab() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-slate-400" />
            115 學年暑期社團活動
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 leading-relaxed">
            更新時間{" "}<br className="sm:hidden" />
            2026/05/19 20:30{" "}<br className="sm:hidden" />
            （請以官網為主）
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://school.tc.edu.tw/open-message/060323b/view-news/227"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl transition-all shrink-0"
            >
              原始公告 <ExternalLink className="w-4 h-4" />
            </a>
            <a
              // href="https://school.tc.edu.tw/csp/talent/#/"
              href="https://school.tc.edu.tw/csp/talent/060323b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold hover:underline bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl transition-all shrink-0"
            >
              報名網站 <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100">報名期間</h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            115 年 5 月 20 日（三）08:00 起至 115 年 5 月 24 日（日）23:59 止。
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <Clock3 className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100">公告資訊</h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            公告單位為國小部主任，更新時間為 2026/05/19 19:55。報名前請務必先詳閱簡章。
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100">附件提醒</h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            原始公告附有報名介面截圖、暑期課後社團簡章與 DM，若要確認細節請回原公告查看附件。
          </p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-[2rem] px-6 py-5 flex items-start gap-3">
        <MousePointerClick className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
          報名流程的登入密碼是學生身分證字號 9 碼，不含英文字母。若要減少報名時出錯，先把班級、座號與密碼準備好再登入。
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">活動時程</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {activities.map((activity) => (
            <div key={activity.name} className="px-6 py-5 flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
              <div className="max-w-3xl">
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{activity.name}</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{activity.schedule}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-emerald-700 dark:text-emerald-300">
                    對象：{activity.audience}
                  </span>
                  <span className="rounded-full bg-amber-50 dark:bg-amber-950/40 px-3 py-1 text-amber-700 dark:text-amber-300">
                    費用：{activity.fee}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{activity.summary}</p>
              </div>
              <span className="inline-flex self-start rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {activity.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      <details className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group">
        <summary className="px-6 py-5 flex items-center justify-between gap-3 cursor-pointer list-none">
          <div className="flex items-center gap-3">
            <MousePointerClick className="w-5 h-5 text-slate-400" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">報名方式</h3>
          </div>
          <span className="text-sm text-slate-400 transition-transform group-open:rotate-180">⌄</span>
        </summary>
        <ol className="border-t border-slate-100 dark:border-slate-700 px-6 py-5 space-y-4">
          {registrationSteps.map((step, index) => (
            <li key={step} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-100 text-sm font-bold text-white dark:text-slate-900">
                {index + 1}
              </span>
              <p className="pt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </details>

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-slate-400" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">附件與 DM</h3>
          </div>
          <a
            href="https://school.tc.edu.tw/open-message/060323b/get-file/6a0c17b38433b2a1c8017024"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl transition-all shrink-0"
          >
            查看暑期社團簡章 PDF <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="p-6">
          <img
            src={`${import.meta.env.BASE_URL}files/2026_summer_club.jpg`}
            alt="115 學年暑期社團活動 DM"
            className="w-full rounded-[1.5rem] border border-slate-200 dark:border-slate-700 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}