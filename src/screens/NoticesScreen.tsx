import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { motion } from 'motion/react';
import { Bell, Search, Filter, ChevronLeft, Calendar as CalendarIcon, Info, Sparkles, Clock, ScrollText, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function NoticesScreen() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = ["All", "Exams", "Seminars", "Circulars", "Holidays"];

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setNotices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = notices.filter(n => {
    const matchesCategory = filter === 'All' || n.category === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (n.content && n.content.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (loading) return (
    <div className="p-8 space-y-6">
      <div className="h-10 w-48 bg-slate-100 animate-pulse rounded-lg" />
      {[1,2,3].map(i => <div key={i} className="h-40 bg-slate-50 animate-pulse rounded-[2rem]" />)}
    </div>
  );

  return (
    <div className="p-6 md:p-14 space-y-14 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 bg-[#0A0A0A] text-white rounded-lg text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Dispatch Center
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase italic">
            Board <br /> 
            <span className="text-indigo-600">Transmissions.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
           <div className="relative w-full max-w-sm">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
             <input 
               type="text" 
               placeholder="Inquire Archive..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-16 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-sans italic shadow-sm"
             />
           </div>
           
           <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setFilter(cat)}
                 className={cn(
                   "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                   filter === cat 
                     ? "bg-[#0A0A0A] text-white shadow-xl" 
                     : "text-slate-400 hover:text-slate-900 border border-slate-100 bg-white"
                 )}
               >
                 {cat}
               </button>
             ))}
           </div>
        </div>
      </div>

      <div className="grid gap-12 pt-10 border-t border-slate-100">
        {filteredNotices.map((notice, idx) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative"
          >
             <div className="md:col-span-3">
                <div className="sticky top-10">
                   <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 group-hover:text-indigo-50 transition-colors pointer-events-none uppercase italic">
                      {(idx + 1).toString().padStart(2, '0')}
                   </div>
                   <div className="relative z-10">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">
                        Released: {format(new Date(notice.createdAt), 'dd.MM.yy')}
                      </span>
                      <div className="inline-flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                        <div className="w-1 h-1 bg-indigo-600 rounded-full animate-pulse" />
                        {notice.category}
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="md:col-span-9 space-y-6">
                <h4 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tighter uppercase italic leading-none">
                  {notice.title}
                </h4>
                <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-2xl">
                  {notice.content}
                </p>
                <div className="flex items-center gap-10 pt-4">
                   <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#0A0A0A] group/btn">
                     <span>Access Full Log</span>
                     <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover/btn:bg-[#0A0A0A] group-hover/btn:text-white transition-all">
                        <ChevronRight size={14} />
                     </div>
                   </button>
                   <div className="flex items-center gap-4">
                      <div className="h-px w-20 bg-slate-100" />
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Encrypted Metadata Attached</span>
                   </div>
                </div>
             </div>
          </motion.div>
        ))}
        
        {filteredNotices.length === 0 && (
          <div className="py-32 text-center flex flex-col items-center">
            <ScrollText size={80} className="mb-10 text-slate-50" />
            <h4 className="text-2xl font-black uppercase tracking-tighter italic text-slate-900 mb-2">Archive Null.</h4>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No telemetry matches found for current filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
