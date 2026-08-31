import { Phone, ExternalLink, Info, Mail } from "lucide-react";

interface ExtensionItem {
  role: string;
  ext: string;
  name?: string;
  email?: string;
  duty?: string;
}

const extensionsData: { category: string; items: ExtensionItem[] }[] = [
  { category: "行政人員", items: [
    { role: "國小部主任", name: "陳主任", ext: "5100", email: "elem5100@nehs.tc.edu.tw", duty: "綜理國小部業務；校內事務溝通協調。" },
    { role: "教務組長", name: "蔡組長", ext: "5110", email: "elem5110@nehs.tc.edu.tw", duty: "課表安排、代課協調、教學業務規劃、數位融入教學、評量命題、語文競賽、教師研習、閱讀教育推動、教科書管理" },
    { role: "學務組長", name: "莊組長", ext: "5120", email: "elem5120@nehs.tc.edu.tw", duty: "品德教育、生活常規、學生獎懲、校安通報、性平霸凌業務、體育競賽、衛生健康、午餐業務" },
    { role: "輔導組長", name: "柯組長", ext: "5130", email: "elem5130@nehs.tc.edu.tw", duty: "學生諮商輔導、親師溝通、特教業務、學習扶助、教育志工管理" },
    { role: "訓育組長", name: "許組長", ext: "5140", email: "elem5140@nehs.tc.edu.tw", duty: "各項活動辦理、課後照顧班業務、課後社團業務" },
    { role: "國小部註冊組", name: "周小姐", ext: "5150", email: "elem5150@nehs.tc.edu.tw", duty: "註冊業務、請購行政、差旅費請領、文書紀錄、器材管理" },
    { role: "健康中心", name: "蔡護理師", ext: "5160", email: "elem5160@nehs.tc.edu.tw", duty: "健康檢查、緊急事故處置、醫藥用品管理、防疫工作、健康教育推進" },
  ]},
  { category: "教室分機", items: [
    { role: "一年一班", ext: "5011" },
    { role: "一年二班", ext: "5012" },
    { role: "一年三班", ext: "5013" },
    { role: "一年四班", ext: "5014" },
    { role: "二年一班", ext: "5021" },
    { role: "二年二班", ext: "5022" },
    { role: "二年三班", ext: "5023" },
    { role: "二年四班", ext: "5024" },
    { role: "二年五班", ext: "5025" },
    { role: "三年一班", ext: "5031" },
    { role: "三年二班", ext: "5032" },
    { role: "三年三班", ext: "5015" },
    { role: "四年一班", ext: "5041" },
    { role: "四年二班", ext: "5042" },
    { role: "五年一班", ext: "5051" },
    { role: "五年二班", ext: "5052" },
    { role: "警衛室", ext: "5099" },
  ]},
];

export default function ExtensionsTab() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Phone className="w-8 h-8 text-slate-400" />
            業務執掌與分機
          </h2>
          <a href="tel:0425686850" className="mt-1 ml-11 text-slate-500 dark:text-slate-400 text-base font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
            04-25686850
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 leading-relaxed">
            更新時間{" "}<br className="sm:hidden" />
            2026/8/31 12:00{" "}<br className="sm:hidden" />
            （請以官網為主）
          </span>
          <a
            href="https://sites.google.com/nehs.tc.edu.tw/elem/%E6%A5%AD%E5%8B%99%E5%9F%B7%E6%8E%8C%E5%88%86%E6%A9%9F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl transition-all shrink-0"
          >
            執掌與分機 <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 教室分機 */}
      {extensionsData.filter(g => g.category === "教室分機").map((group, gIdx) => {
        const numerals = ["一", "二", "三", "四", "五", "六"];
        const classItems = group.items.filter(item => /^[一二三四五六]年[一二三四五六]班$/.test(item.role));
        const otherItems = group.items.filter(item => !/^[一二三四五六]年[一二三四五六]班$/.test(item.role));

        const byGrade: Record<string, ExtensionItem[]> = {};
        classItems.forEach(item => {
          const grade = item.role.match(/^([一二三四五六]年)/)![1];
          if (!byGrade[grade]) byGrade[grade] = [];
          byGrade[grade].push(item);
        });
        const grades = Object.keys(byGrade);
        const maxClasses = Math.max(...grades.map(g => byGrade[g].length));

        return (
          <div key={gIdx} className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="bg-slate-900 dark:bg-slate-700 px-6 py-4">
              <h3 className="text-white font-bold text-xl">{group.category}</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 p-4 rounded-2xl flex items-start gap-3">
                <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-xl">
                  <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-200 text-base mb-0.5">注意事項</h4>
                  <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed">
                    撥打教室及警衛室請改撥代表號 <span className="font-mono font-bold">04-25686827</span>，接通後需等待 2 聲嘟嘟聲後，聽到逼逼聲方可輸入分機號碼。請勿於「上課時間」撥打教室分機，感謝您的配合與體諒。
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700">
                <table className="w-full text-base border-collapse text-center">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-900">
                      <th className="px-4 py-3 text-left font-bold text-slate-500 dark:text-slate-400">年級</th>
                      {Array.from({ length: maxClasses }, (_, i) => (
                        <th key={i} className="px-4 py-3 font-bold text-slate-500 dark:text-slate-400">{i + 1} 班</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map(grade => (
                      <tr key={grade} className="border-t border-slate-100 dark:border-slate-700">
                        <td className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">{grade}級</td>
                        {Array.from({ length: maxClasses }, (_, i) => {
                          const item = byGrade[grade].find(it => it.role === `${grade}${numerals[i]}班`);
                          return (
                            <td key={i} className="px-4 py-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                              {item ? item.ext : <span className="text-slate-300 dark:text-slate-600 font-normal">—</span>}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {otherItems.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {otherItems.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                      <span className="text-base font-medium text-slate-600 dark:text-slate-300">{item.role}</span>
                      <span className="text-base font-mono font-bold text-blue-600 dark:text-blue-400">{item.ext}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* 行政人員 */}
      {extensionsData.filter(g => g.category === "行政人員").map((group, gIdx) => (
        <div key={gIdx} className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-900 dark:bg-slate-700 px-6 py-4">
            <h3 className="text-white font-bold text-xl">{group.category}</h3>
          </div>
          <div className="p-6 space-y-4">
            {group.items.map((item, iIdx) => (
              <div key={iIdx} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-bold text-slate-500 dark:text-slate-400">
                      {item.role}
                    </span>
                    {item.name && <span className="font-bold text-lg text-slate-900 dark:text-slate-100">{item.name}</span>}
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-mono font-bold text-lg">
                    <Phone className="w-4 h-4" />
                    {item.ext}
                  </div>
                </div>
                {item.duty && (
                  <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {item.duty}
                  </p>
                )}
                {item.email && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Mail className="w-4 h-4" />
                    {item.email}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
