import { useState, useEffect } from "react";
import { Newspaper, ExternalLink } from "lucide-react";

interface BulletinPost {
  title: string;
  url: string;
  date: string;
}

export default function BulletinTab() {
  const [posts, setPosts] = useState<BulletinPost[]>([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bulletin.json`)
      .then(r => r.json())
      .then(d => { setPosts(d.posts || []); setLastUpdated(d.lastUpdated || ""); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <Newspaper className="w-8 h-8 text-slate-400" />
          招生資訊
        </h2>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-slate-400">更新時間 {lastUpdated}（請以官網為主）</span>
          )}
          <a
            href="https://www.nehs.tc.edu.tw/%e6%8b%9b%e7%94%9f%e8%b3%87%e8%a8%8a%e5%9c%8b%e5%b0%8f%e9%83%a8/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl transition-all shrink-0"
          >
            原始網頁 <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <ul className="divide-y divide-slate-100 dark:divide-slate-700">
          {loading ? (
            <li className="px-6 py-12 text-center text-slate-400">載入中...</li>
          ) : posts.length === 0 ? (
            <li className="px-6 py-12 text-center text-slate-400">暫無資料</li>
          ) : posts.map((post, i) => (
            <li key={i}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
              >
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{post.title}</span>
                <span className="text-xs text-slate-400 shrink-0">{post.date}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
