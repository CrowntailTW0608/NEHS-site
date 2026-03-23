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
  Menu,
  Home,
  Info,
  ChevronLeft,
  Clock,
  Phone,
  BookOpen,
  Image as ImageIcon,
  FileText,
  Globe,
  Facebook,
  Mail,
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

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");


  const sidebarItems = [
    { id: "home", label: "校務佈告欄", icon: Home, type: "tab" },
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
  ];

  const extensionsData = [
    { category: "行政人員", items: [
      { role: "國小部主任", name: "陳主任", ext: "5100", email: "elem5100@nehs.tc.edu.tw", duty: "綜理國小部業務；校內事務溝通協調。" },
      { role: "教務組長", name: "蔡組長", ext: "5110", email: "elem5110@nehs.tc.edu.tw", duty: "課表安排、調代課協調支援、代理代課教支教師管理及鐘點費計算、規劃與執行教學業務、數位融入教學、評量命題事宜、辦理語文競賽、教師研習" },
      { role: "學務組長", name: "林組長", ext: "5120", email: "elem5120@nehs.tc.edu.tw", duty: "學生生活輔導、社團活動、體育競賽、衛生保健、環境教育、校園安全" },
      { role: "輔導組長", name: "王組長", ext: "5130", email: "elem5130@nehs.tc.edu.tw", duty: "學生輔導諮商、特教業務、親師溝通、生命教育、性別平等教育" },
    ]},
    { category: "教室分機", items: [
      { role: "一年一班", ext: "5011" },
      { role: "一年二班", ext: "5012" },
      { role: "一年三班", ext: "5013" },
      { role: "一年四班", ext: "5014" },
      { role: "一年五班", ext: "5015" },
      { role: "二年一班", ext: "5021" },
      { role: "二年二班", ext: "5022" },
      { role: "三年一班", ext: "5031" },
      { role: "三年二班", ext: "5032" },
      { role: "四年一班", ext: "5041" },
    ]}
  ];

  useEffect(() => {
    fetchData();
  }, []);

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
      if (!groups[student.className]) {
        groups[student.className] = [];
      }
      groups[student.className].push(student);
    });
    return groups;
  }, [filteredStudents]);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-40 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-20"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-slate-900 p-2 rounded-xl shrink-0">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-bold text-slate-900 whitespace-nowrap"
                >
                  中科實中(國小部)
                </motion.span>
              )}
            </div>
            {isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-full flex items-center justify-center p-3 mb-4 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.type === "link") {
                    window.open(item.url, "_blank");
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group
                  ${activeTab === item.id 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }
                `}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? "text-white" : "group-hover:text-slate-900"}`} />
                {isSidebarOpen && (
                  <div className="flex items-center justify-between w-full">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                    {item.type === "link" && (
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    )}
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer / Toggle (Removed) */}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    國小部 <span className="text-slate-500 font-medium">{sidebarItems.find(i => i.id === activeTab)?.label}</span>
                  </h1>
                </div>
              </div>
              
              {activeTab === "honors" && (
                <div className="flex items-center gap-4">
                  {lastUpdated && (
                    <div className="hidden md:flex items-center gap-2">
                      <p className="text-[10px] text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        更新時間 {lastUpdated}（請以官網為主）
                      </p>
                      <a
                        href="https://sites.google.com/nehs.tc.edu.tw/elem/%E4%B8%AD%E7%A7%91%E5%AF%A6%E4%B8%AD%E5%9C%8B%E5%B0%8F%E9%83%A8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        查看原始頁面 <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                  <button
                    onClick={fetchData}
                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors"
                    title="重新整理"
                  >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <div className="hidden sm:flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                    >
                      <ListIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {activeTab === "honors" ? (
            <>
              {/* Honors Content */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="搜尋學生姓名、班級榮譽內容..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-300 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      className="pl-9 pr-8 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 outline-none appearance-none cursor-pointer text-slate-600"
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

              {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <div className="w-12 h-12 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-400 font-medium">正在取得榮譽榜資料...</p>
                </div>
              ) : students.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                  <RefreshCw className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">目前暫無榮譽榜資料</p>
                  <button 
                    onClick={fetchData}
                    className="mt-4 px-8 py-2.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
                  >
                    重新嘗試
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  {(Object.entries(groupedByClass) as [string, Student[]][]).length > 0 ? (
                    (Object.entries(groupedByClass) as [string, Student[]][]).map(([className, students]) => (
                      <section key={className} className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                          <div className="bg-slate-700 text-white px-4 py-1.5 rounded-xl text-sm font-bold shadow-sm">
                            {className}
                          </div>
                          <span className="text-slate-400 text-sm font-medium">
                            {students.length} 位獲獎學生
                          </span>
                        </div>

                        <div className={viewMode === "grid" 
                          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                          : "space-y-2"
                        }>
                          {students.map(student => (
                            <motion.div
                              layout
                              key={student.id}
                              whileHover={{ y: -4, scale: 1.01 }}
                              onClick={() => setSelectedStudent(student)}
                              className={`
                                bg-white border border-slate-100 cursor-pointer transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-200
                                ${viewMode === "grid" 
                                  ? "p-6 rounded-[1.5rem] flex flex-col gap-4" 
                                  : "p-5 rounded-2xl flex items-center justify-between"
                                }
                              `}
                            >
                              <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2.5">
                                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{student.name}</h3>
                                </div>
                                {viewMode === "list" && (
                                  <p className="text-xs text-slate-600">
                                    共 {student.honors.length} 項榮譽
                                  </p>
                                )}
                              </div>

                              {viewMode === "grid" && (
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <div className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
                                    <Award className="w-3.5 h-3.5" />
                                    {student.honors.length} 項榮譽
                                  </div>
                                </div>
                              )}

                              {viewMode === "list" && (
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                      <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">找不到符合搜尋條件的學生</p>
                      <button 
                        onClick={() => {setSearchTerm(""); setSelectedClass("all");}}
                        className="mt-4 text-blue-600 font-bold hover:underline"
                      >
                        清除所有篩選
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : activeTab === "schedule" ? (
            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-slate-400" />
                    作息時間表
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">更新時間 2026/3/23 12:00（請以官網為主）</span>
                    <a
                      href="https://sites.google.com/nehs.tc.edu.tw/elem/%E5%9C%8B%E5%B0%8F%E9%83%A8%E4%B8%80%E9%80%B1%E4%BD%9C%E6%81%AF%E6%99%82%E9%96%93%E8%A1%A8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      查看原始頁面 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 p-4">
                  <img
                    src={`${import.meta.env.BASE_URL}files/國小部一週作息時間表.jpg`}
                    alt="作息時間表"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ) : activeTab === "calendar" ? (
            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-slate-400" />
                    行事曆
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">更新時間 2026/3/23 12:00（請以官網為主）</span>
                    <a
                      href="https://sites.google.com/nehs.tc.edu.tw/elem/%E5%9C%8B%E5%B0%8F%E9%83%A8%E7%B0%A1%E6%98%8E%E8%A1%8C%E4%BA%8B%E6%9B%86"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      查看原始頁面 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 p-4">
                  <img
                    src={`${import.meta.env.BASE_URL}files/國小部簡明行事曆.jpg`}
                    alt="行事曆"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ) : activeTab === "extensions" ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Phone className="w-8 h-8 text-slate-400" />
                    業務執掌與分機
                  </h2>
                  <a href="tel:0425686850" className="mt-1 ml-11 text-slate-500 text-sm font-medium hover:text-slate-900 transition-colors">
                    04-25686850
                  </a>
                </div>
                <a 
                  href="https://sites.google.com/nehs.tc.edu.tw/elem/%E6%A5%AD%E5%8B%99%E5%9F%B7%E6%8E%8C%E5%88%86%E6%A9%9F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 font-bold hover:underline bg-blue-50 px-4 py-2 rounded-xl transition-all"
                >
                  查看原始網頁 <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {extensionsData.map((group, gIdx) => (
                  <div key={gIdx} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-900 px-6 py-4">
                      <h3 className="text-white font-bold text-lg">{group.category}</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {group.category === "教室分機" && (
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                          <div className="bg-amber-100 p-2 rounded-xl">
                            <Info className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-amber-900 text-sm mb-0.5">注意事項</h4>
                            <p className="text-amber-800 text-xs leading-relaxed">
                              請勿於「上課時間」撥打教室分機，感謝您的配合與體諒。
                            </p>
                          </div>
                        </div>
                      )}
                      {group.items.map((item, iIdx) => (
                        <div key={iIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all group">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="bg-white px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-500">
                                {item.role}
                              </span>
                              {item.name && <span className="font-bold text-slate-900">{item.name}</span>}
                            </div>
                            <div className="flex items-center gap-1.5 text-blue-600 font-mono font-bold">
                              <Phone className="w-3.5 h-3.5" />
                              {item.ext}
                            </div>
                          </div>
                          {item.duty && (
                            <p className="text-sm text-slate-500 leading-relaxed mb-3">
                              {item.duty}
                            </p>
                          )}
                          {item.email && (
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Mail className="w-3.5 h-3.5" />
                              {item.email}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          ) : activeTab === "textbooks" ? (
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-slate-400" />
                  教科書選用
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">更新時間 2026/3/23 12:00（請以官網為主）</span>
                  <a
                    href="https://sites.google.com/nehs.tc.edu.tw/elem/%E8%AA%B2%E7%A8%8B%E8%A8%88%E7%95%AB%E5%85%AC%E9%96%8B%E8%B3%87%E6%96%99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    查看原始頁面 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <iframe
                src={`${import.meta.env.BASE_URL}files/114_國立中科實中國小部_教科書選用版本暨自編教材一覽表.pdf`}
                className="w-full flex-1 rounded-[2rem] border border-slate-200 shadow-sm"
                style={{ minHeight: "75vh" }}
                title="教科書選用"
              />
            </div>
          ) : activeTab === "home" ? (
            <div className="flex flex-col gap-4 h-full">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Home className="w-8 h-8 text-slate-400" />
                校務佈告欄
              </h2>
              <iframe
                src="https://school.tc.edu.tw/open-message/060323b"
                className="w-full flex-1 rounded-[2rem] border border-slate-200 shadow-sm"
                style={{ minHeight: "75vh" }}
                title="校務佈告欄"
              />
            </div>
          ) : (() => {
            const activeItem = sidebarItems.find(i => i.id === activeTab);
            const Icon = activeItem ? activeItem.icon : Trophy;
            return (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="bg-slate-100 p-8 rounded-[3rem] mb-6">
                  <Icon className="w-16 h-16 text-slate-300" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {activeItem?.label} 頁面
                </h2>
                <p className="text-slate-500 max-w-md">
                  此頁面目前正在開發中，未來將會提供更多關於「{activeItem?.label}」的資訊與功能。
                </p>
                <button 
                  onClick={() => setActiveTab("honors")}
                  className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
                >
                  回到榮譽榜
                </button>
              </div>
            );
          })()}
        </main>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto w-full px-4 py-12 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" />
            資訊來源：
            <a
              href="https://sites.google.com/nehs.tc.edu.tw/elem/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline underline-offset-4 transition-colors"
            >
              國立中科實驗高級中學 國小部 官網
            </a>
          </p>
          <p className="text-slate-300 text-xs mt-2">
            &copy; 2026 學生榮譽可視化看板
          </p>
        </footer>
      </div>

      {/* Detail Modal */}
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
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-slate-50 flex justify-between items-start bg-white">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 flex items-center gap-1.5 text-xs font-medium">
                      <GraduationCap className="w-4 h-4" />
                      {selectedStudent.className}
                    </span>
                  </div>
                  <h2 className="text-5xl font-bold tracking-tight text-slate-900">{selectedStudent.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2.5 text-lg">
                    <Trophy className="w-6 h-6 text-slate-400" />
                    榮譽紀錄 ({selectedStudent.honors.length})
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {selectedStudent.honors.map((h, idx) => (
                    <div 
                      key={idx}
                      className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-slate-200 transition-all group"
                    >
                      <div className="flex justify-between items-start gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-bold px-2 py-1 bg-white text-slate-500 rounded-lg border border-slate-100 uppercase tracking-wider">
                              {h.category}
                            </span>
                            {h.title && (
                              <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {h.title}
                              </h4>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            {h.achievement}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white px-3 py-1.5 rounded-xl border border-slate-100 flex items-center gap-1.5 shrink-0 shadow-sm">
                          <Calendar className="w-3.5 h-3.5" />
                          {h.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="w-full py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-[1.25rem] hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]"
                >
                  關閉視窗
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
    </div>
  );
}
