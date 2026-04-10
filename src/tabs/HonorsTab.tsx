import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Award,
  ChevronRight,
  X,
  Users,
  Trophy,
  Calendar,
  GraduationCap,
  LayoutGrid,
  List as ListIcon,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HonorDetail {
  title: string;
  achievement: string;
  date: string;
  category: string;
  url: string;
}

interface Student {
  id: string;
  name: string;
  className: string;
  seatNumber: number;
  honors: HonorDetail[];
}

export default function HonorsTab() {
  const [students, setStudents] = useState<Student[]>([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}honors.json`);
      const result = await response.json();
      setStudents(result.students || []);
      setLastUpdated(result.lastUpdated || "");
    } catch (error) {
      console.error("Failed to fetch honors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const classes = useMemo(() => {
    const chineseToNum: Record<string, number> = { "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6 };
    const uniqueClasses = Array.from(new Set(students.map(d => d.className))) as string[];
    return uniqueClasses.sort((a, b) => {
      const matchA = a.match(/([一二三四五六])年([一二三四五六])班/);
      const matchB = b.match(/([一二三四五六])年([一二三四五六])班/);
      if (matchA && matchB) {
        const yearA = chineseToNum[matchA[1]] || 0;
        const yearB = chineseToNum[matchB[1]] || 0;
        if (yearA !== yearB) return yearA - yearB;
        const classA = chineseToNum[matchA[2]] || 0;
        const classB = chineseToNum[matchB[2]] || 0;
        return classA - classB;
      }
      return a.localeCompare(b, "zh-Hant");
    });
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.includes(searchTerm) ||
        student.className.includes(searchTerm) ||
        student.honors.some(h => h.title.includes(searchTerm) || h.achievement.includes(searchTerm));
      const matchesClass = selectedClass === "all" || student.className === selectedClass;
      return matchesSearch && matchesClass;
    });
  }, [students, searchTerm, selectedClass]);

  const groupedByClass = useMemo(() => {
    const groups: Record<string, Student[]> = {};
    filteredStudents.forEach(student => {
      if (!groups[student.className]) groups[student.className] = [];
      groups[student.className].push(student);
    });
    return groups;
  }, [filteredStudents]);

  return (
    <>
      {/* 頂部控制列 */}
      {lastUpdated && (
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <p className="text-[10px] text-slate-400 font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
              更新時間 {lastUpdated}（請以官網為主）
            </p>
            <a
              href="https://sites.google.com/nehs.tc.edu.tw/elem/%E4%B8%AD%E7%A7%91%E5%AF%A6%E4%B8%AD%E5%9C%8B%E5%B0%8F%E9%83%A8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              查看原始頁面 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="重新整理"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 搜尋 & 篩選 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="搜尋學生姓名、班級榮譽內容..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-slate-900/5 dark:focus:ring-slate-100/5 focus:border-slate-300 dark:focus:border-slate-600 outline-none transition-all text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              className="pl-9 pr-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-slate-900/5 outline-none appearance-none cursor-pointer text-slate-600 dark:text-slate-300"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="all">所有班級</option>
              {classes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 學生列表 */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-slate-100 dark:border-slate-700 border-t-slate-900 dark:border-t-slate-300 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 font-medium">正在取得榮譽榜資料...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700">
          <RefreshCw className="w-12 h-12 text-slate-200 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">目前暫無榮譽榜資料</p>
          <button
            onClick={fetchData}
            className="mt-4 px-8 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all active:scale-95"
          >
            重新嘗試
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {(Object.entries(groupedByClass) as [string, Student[]][]).length > 0 ? (
            (Object.entries(groupedByClass) as [string, Student[]][]).map(([className, classStudents]) => (
              <section key={className} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="bg-slate-700 text-white px-4 py-1.5 rounded-xl text-sm font-bold shadow-sm">
                    {className}
                  </div>
                  <span className="text-slate-400 text-sm font-medium">
                    {classStudents.length} 位獲獎學生
                  </span>
                </div>
                <div className={viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-2"
                }>
                  {classStudents.map(student => (
                    <motion.div
                      layout
                      key={student.id}
                      whileHover={{ y: -4, scale: 1.01 }}
                      onClick={() => setSelectedStudent(student)}
                      className={`
                        bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer transition-all hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:border-slate-200 dark:hover:border-slate-600
                        ${viewMode === "grid"
                          ? "p-6 rounded-[1.5rem] flex flex-col gap-4"
                          : "p-5 rounded-2xl flex items-center justify-between"
                        }
                      `}
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">{student.name}</h3>
                        </div>
                        {viewMode === "list" && (
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            共 {student.honors.length} 項榮譽
                          </p>
                        )}
                      </div>
                      {viewMode === "grid" && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          <div className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
                            <Award className="w-3.5 h-3.5" />
                            {student.honors.length} 項榮譽
                          </div>
                        </div>
                      )}
                      {viewMode === "list" && (
                        <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">找不到符合搜尋條件的學生</p>
              <button
                onClick={() => { setSearchTerm(""); setSelectedClass("all"); }}
                className="mt-4 text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                清除所有篩選
              </button>
            </div>
          )}
        </div>
      )}

      {/* 學生詳細 Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudent(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-start bg-white dark:bg-slate-900">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 flex items-center gap-1.5 text-xs font-medium">
                      <GraduationCap className="w-4 h-4" />
                      {selectedStudent.className}
                    </span>
                  </div>
                  <h2 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{selectedStudent.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5 text-lg">
                    <Trophy className="w-6 h-6 text-slate-400" />
                    榮譽紀錄 ({selectedStudent.honors.length})
                  </h3>
                </div>
                <div className="space-y-4">
                  {selectedStudent.honors.map((h, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 transition-all group"
                    >
                      <div className="flex justify-between items-start gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-bold px-2 py-1 bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-lg border border-slate-100 dark:border-slate-600 uppercase tracking-wider">
                              {h.category}
                            </span>
                            {h.title && (
                              <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {h.title}
                              </h4>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            {h.achievement}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white dark:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-600 flex items-center gap-1.5 shrink-0 shadow-sm">
                          <Calendar className="w-3.5 h-3.5" />
                          {h.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="w-full py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-[1.25rem] hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-[0.98]"
                >
                  關閉視窗
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
