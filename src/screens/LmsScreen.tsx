import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Book, FileText, Download, Play, Search, Filter, ChevronRight, User, BookOpen, Sparkles, TrendingUp, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function LmsScreen() {
  const [activeTab, setActiveTab] = useState<'courses' | 'materials' | 'growth'>('courses');

  const growthData = [
    { name: 'Week 1', score: 45 },
    { name: 'Week 2', score: 52 },
    { name: 'Week 3', score: 48 },
    { name: 'Week 4', score: 61 },
    { name: 'Week 5', score: 75 },
    { name: 'Week 6', score: 82 },
    { name: 'Week 7', score: 90 },
  ];

  const courses = [
    { 
      id: '1', 
      title: 'Advanced Neural Networks', 
      code: 'CS-402', 
      faculty: 'Dr. Sarah Mitchell', 
      progress: 65, 
      materials: 12,
      trending: true
    },
    { 
      id: '2', 
      title: 'Distributed Systems Architecture', 
      code: 'CS-305', 
      faculty: 'Prof. James Wilson', 
      progress: 40, 
      materials: 8,
      trending: false
    },
    { 
      id: '3', 
      title: 'Cybersecurity & Ethical Hacking', 
      code: 'CS-412', 
      faculty: 'Dr. Robert Chen', 
      progress: 85, 
      materials: 15,
      trending: true
    },
  ];

  const materials = [
    { id: '1', title: 'Lecture 12: Gradient Descent Optimization', type: 'PDF', size: '2.4 MB', date: '2026-05-10', faculty: 'Dr. Sarah Mitchell' },
    { id: '2', title: 'Seminar: Future of Blockchain', type: 'Video', size: '45 mins', date: '2026-05-09', faculty: 'Prof. James Wilson' },
    { id: '3', title: 'Assignment 4: Distributed Consensus', type: 'DOCX', size: '1.1 MB', date: '2026-05-08', faculty: 'Prof. James Wilson' },
    { id: '4', title: 'References: Ethical Hacking Tools', type: 'Link', size: 'Ext', date: '2026-05-07', faculty: 'Dr. Robert Chen' },
  ];

  return (
    <div className="p-6 md:p-12 space-y-12 pb-32 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
           <div className="flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Knowledge Repository</span>
           </div>
           <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase italic">
              Learning <br /> 
              <span className="text-indigo-600">Labyrinth.</span>
           </h2>
        </div>
        <div className="flex gap-4">
           {['courses', 'materials', 'growth'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={cn(
                 "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                 activeTab === tab 
                   ? "bg-[#0A0A0A] text-white shadow-xl shadow-indigo-100" 
                   : "bg-white text-slate-400 hover:text-slate-900 border border-slate-100"
               )}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {activeTab === 'courses' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-8 rounded-[3rem] border border-slate-100 hover:border-black transition-all cursor-pointer flex flex-col justify-between h-[400px] shadow-sm hover:shadow-2xl"
            >
              <div>
                 <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:rotate-12 transition-transform">
                       <Book size={28} />
                    </div>
                    {course.trending && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse">
                         <TrendingUp size={12} />
                         Trending
                      </div>
                    )}
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-2 block">{course.code}</span>
                 <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                 <div className="flex items-center gap-2 mt-4 text-slate-400">
                    <User size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">{course.faculty}</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Knowledge Gained</span>
                    <span className="text-slate-900">{course.progress}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${course.progress}%` }} 
                      className="h-full bg-indigo-600" 
                    />
                 </div>
                 <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-500 pt-4 border-t border-slate-50">
                    <span>{course.materials} Resources Available</span>
                    <ChevronRight size={16} />
                 </div>
              </div>
            </motion.div>
          ))}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-50 p-8 rounded-[3rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-4 transition-colors hover:bg-white hover:border-indigo-600 cursor-pointer group"
          >
             <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                <Plus size={32} />
             </div>
             <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Enroll Course</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Expansion Protocols</p>
             </div>
          </motion.div>
        </div>
      ) : activeTab === 'materials' ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2.5rem] border border-slate-100 mb-8">
             <div className="relative flex-1 w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Inquire Resource Core..." 
                  className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 pl-16 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-sans"
                />
             </div>
             <button className="px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest border border-slate-100 hover:bg-white transition-all">
                <Filter size={16} />
                Refine
             </button>
          </div>

          <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
             <div className="grid grid-cols-12 gap-4 p-8 border-b border-slate-50 bg-slate-50/50">
                <div className="col-span-6 flex items-center gap-2">
                   <div className="w-1 h-4 bg-black rounded-full" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 Italics">Resource Signature</span>
                </div>
                <div className="col-span-2 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Format</div>
                <div className="col-span-2 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Scale</div>
                <div className="col-span-2 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Uplink Status</div>
             </div>
             <div className="divide-y divide-slate-50">
                {materials.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="grid grid-cols-12 gap-4 p-8 items-center hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="col-span-6 flex items-center gap-4">
                       <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          item.type === 'PDF' ? "bg-red-50 text-red-600" : 
                          item.type === 'Video' ? "bg-blue-50 text-blue-600" :
                          "bg-indigo-50 text-indigo-600"
                       )}>
                          {item.type === 'PDF' ? <FileText size={20} /> : item.type === 'Video' ? <Play size={20} /> : <Book size={20} />}
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Faculty: {item.faculty}</span>
                       </div>
                    </div>
                    <div className="col-span-2 text-center">
                       <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{item.type}</span>
                    </div>
                    <div className="col-span-2 text-center">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.size}</span>
                    </div>
                    <div className="col-span-2 text-right">
                       <button className="p-3 bg-slate-50 text-slate-900 rounded-xl hover:bg-black hover:text-white transition-all">
                          <Download size={16} />
                       </button>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden"
        >
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
              <div>
                 <h3 className="text-3xl font-black uppercase tracking-tighter italic">Cognitive Velocity.</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Growth Matrix v4.2</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Mastery Index</span>
                 </div>
              </div>
           </div>

           <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={growthData}>
                    <defs>
                       <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0A0A0A', 
                        border: 'none', 
                        borderRadius: '16px', 
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#4f46e5" 
                      strokeWidth={4} 
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-slate-50 pt-12">
              {[
                { label: 'Retention Rate', value: '92.4%', sub: '+4.2% from start' },
                { label: 'Topic Saturation', value: '78/100', sub: 'Mastery in Progress' },
                { label: 'Uplink Reliability', value: '99.9%', sub: 'No Data Gaps' },
              ].map((stat, idx) => (
                <div key={idx}>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                   <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                   <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">{stat.sub}</p>
                </div>
              ))}
           </div>
        </motion.div>
      )}
    </div>
  );
}
