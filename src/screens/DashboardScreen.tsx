import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Search, Bell, Calendar as CalendarIcon, Info, Users, Sparkles, ChevronRight, BookOpen, Plus, CreditCard, Club, PenTool, LayoutGrid, Clock, ListChecks, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function DashboardScreen() {
  const { profile, isAdmin } = useAuth();
  const [notices, setNotices] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticesQuery = query(collection(db, 'notices'), orderBy('createdAt', 'desc'), limit(4));
        const eventsQuery = query(collection(db, 'events'), orderBy('date', 'asc'), limit(4));
        
        const [noticesSnap, eventsSnap] = await Promise.all([
          getDocs(noticesQuery),
          getDocs(eventsQuery)
        ]);

        const noticesData = noticesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const eventsData = eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        if (noticesData.length === 0) {
          setNotices([
            { id: '1', title: 'End-Term Examination Schedule Released', category: 'EXAMS', createdAt: new Date().toISOString() },
            { id: '2', title: 'Annual Tech Symposium: Call for Papers', category: 'EVENTS', createdAt: new Date().toISOString() },
            { id: '3', title: 'Library Extended Hours for Finals Week', category: 'NOTICE', createdAt: new Date().toISOString() },
            { id: '4', title: 'Semester Registration Deadline Extension', category: 'NOTICE', createdAt: new Date().toISOString() },
          ]);
        } else {
          setNotices(noticesData);
        }

        if (eventsData.length === 0) {
          setEvents([
            { id: '1', title: 'Quantum Computing Seminar', category: 'Tech', date: new Date(Date.now() + 86400000 * 2).toISOString(), location: 'Hall A' },
            { id: '2', title: 'Inter-College Chess Mastery', category: 'Sports', date: new Date(Date.now() + 86400000 * 5).toISOString(), location: 'Common Room' },
            { id: '3', title: 'Spring Fest: Pulse 2026', category: 'Cultural', date: new Date(Date.now() + 86400000 * 10).toISOString(), location: 'Main Ground' },
          ]);
        } else {
          setEvents(eventsData);
        }
      } catch (error) {
        console.warn("Could not fetch from Firestore, using mock data for demo:", error);
        setNotices([
          { id: '1', title: 'Internal Assessment Mockup', category: 'STAGING', createdAt: new Date().toISOString() },
          { id: '2', title: 'System Heartbeat: Online', category: 'STATUS', createdAt: new Date().toISOString() },
        ]);
        setEvents([
          { id: '1', title: 'Default Campus Event', category: 'General', date: new Date().toISOString(), location: 'Virtual Hub' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const essentialFeatures = [
    { name: 'Attendance', icon: <ListChecks size={24} />, path: '/attendance', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Fee Payment', icon: <CreditCard size={24} />, path: '/fees', color: 'bg-orange-50 text-orange-600' },
    { name: 'Events', icon: <EventsScreenIcon size={24} />, path: '/events', color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Clubs', icon: <Club size={24} />, path: '/clubs', color: 'bg-pink-50 text-pink-600' },
    { name: 'LMS / Tools', icon: <PenTool size={24} />, path: '/lms', color: 'bg-blue-50 text-blue-600' },
    { name: 'Calendar', icon: <CalendarIcon size={24} />, path: '/timetable', color: 'bg-purple-50 text-purple-600' },
    { name: 'Feedback', icon: <MessageSquare size={24} />, path: '/feedback', color: 'bg-amber-50 text-amber-600' },
  ];

  function EventsScreenIcon({ size }: { size: number }) {
    return <Sparkles size={size} />;
  }

  const dailySchedule = [
    { time: '09:00 AM', subject: 'Advanced Algorithms', room: 'LHC-201', type: 'Lecture' },
    { time: '11:00 AM', subject: 'Network Security', room: 'Lab-4', type: 'Lab' },
    { time: '02:00 PM', subject: 'Machine Learning', room: 'LHC-104', type: 'Lecture' },
    { time: '04:00 PM', subject: 'Departmental Seminar', room: 'Auditorium', type: 'Seminar' },
  ];

  if (loading) return (
    <div className="p-6 space-y-6">
      <div className="h-12 bg-slate-200 rounded-2xl w-1/3 animate-pulse"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-3xl animate-pulse"></div>)}
      </div>
      <div className="h-64 bg-slate-200 rounded-3xl animate-pulse"></div>
    </div>
  );

  return (
    <div className="p-6 md:p-12 space-y-16 pb-32 max-w-7xl mx-auto">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
           <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Vault Session v3.0</span>
           </div>
           <h2 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.8] uppercase italic">
              Academic <br /> 
              <span className="text-indigo-600 drop-shadow-[0_0_40px_rgba(79,70,229,0.2)]">Interface.</span>
           </h2>
        </motion.div>
        
        <div className="flex flex-col md:items-end">
           <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Authenticated Researcher</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{profile?.name || 'Authorized Guest'}</h3>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">ID: VAULT-{profile?.uid?.slice(0, 8).toUpperCase() || 'SESSION'}</p>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-slate-200 rounded-full" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Division: {profile?.department || 'GENERAL'}</span>
           </div>
        </div>
      </div>

      {/* ESSENTIAL FEATURES GRID */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-black rounded-full" />
          <h3 className="text-2xl font-black uppercase tracking-tighter italic">Essential Systems.</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {essentialFeatures.map((feature, idx) => (
            <motion.div
               key={feature.name}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.05 }}
               onClick={() => navigate(feature.path)}
               className="group relative bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:border-black transition-all cursor-pointer text-center flex flex-col items-center gap-4 hover:-translate-y-1 shadow-sm hover:shadow-xl"
            >
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6", feature.color)}>
                  {feature.icon}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{feature.name}</span>
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={14} className="text-slate-300" />
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* DAILY SCHEDULE - Vertical Timeline */}
        <section className="lg:col-span-4">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter italic">Daily Flow.</h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{format(new Date(), 'EEEE')}</span>
           </div>
           <div className="space-y-4">
             {dailySchedule.map((item, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="group relative flex gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-indigo-600 transition-all cursor-pointer overflow-hidden shadow-sm"
               >
                 <div className="flex flex-col items-center shrink-0">
                    <span className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase whitespace-nowrap">{item.time}</span>
                    <div className="w-0.5 h-full bg-slate-100 my-2 group-hover:bg-indigo-100 transition-colors" />
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[9px] font-black uppercase text-indigo-500 tracking-widest">{item.type}</span>
                       <div className="w-1 h-1 bg-slate-200 rounded-full" />
                       <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{item.room}</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 leading-tight">{item.subject}</h4>
                 </div>
                 <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Clock size={16} className="text-indigo-600" />
                 </div>
               </motion.div>
             ))}
           </div>
        </section>

        {/* NOTICES & BROADCASTS */}
        <section className="lg:col-span-8 bg-[#0A0A0A] p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                 <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Broadcasting.</h3>
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mt-2">Level Alpha Priority Channels</p>
                 </div>
                 <div className="flex flex-wrap gap-4">
                   <button 
                     onClick={async () => {
                       try {
                         await addDoc(collection(db, 'notices'), {
                           title: 'Real-Time Sync Test',
                           content: 'This broadcast verifies your Firebase internship implementation is working in real-time!',
                           category: 'Circulars',
                           createdAt: serverTimestamp(),
                           authorId: profile?.uid || 'tester'
                         });
                       } catch (e) {
                         console.error("Test alert failed:", e);
                       }
                     }}
                     className="px-6 py-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2 group/btn"
                   >
                      <Bell size={14} className="group-hover/btn:animate-ring" />
                      Test Alert System
                   </button>
                   
                   {isAdmin && (
                     <button 
                       onClick={() => navigate('/admin')}
                       className="px-6 py-3 rounded-2xl bg-white/10 text-white border border-white/20 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2"
                     >
                        <Plus size={14} />
                        Admin Panel
                     </button>
                   )}
                   <button 
                    onClick={() => navigate('/notices')}
                    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-indigo-600 transition-colors group"
                   >
                      <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {notices.map((notice, idx) => (
                   <motion.div
                     key={notice.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 + (idx * 0.1) }}
                     className="group flex flex-col justify-between p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-indigo-500/50 transition-all cursor-pointer h-[240px]"
                   >
                     <div>
                        <div className="flex items-center justify-between mb-6">
                           <span className={cn(
                             "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                             notice.category === 'EXAMS' ? "bg-orange-500/20 text-orange-400" : "bg-indigo-500/20 text-indigo-400"
                           )}>
                              {notice.category}
                           </span>
                           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{format(new Date(notice.createdAt), 'MMM dd')}</span>
                        </div>
                        <h4 className="text-xl font-bold leading-tight group-hover:text-indigo-300 transition-colors">{notice.title}</h4>
                     </div>
                     <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 italic">Verified Broadcast</span>
                        </div>
                        <ChevronRight size={18} className="text-slate-700 group-hover:text-indigo-400 transition-colors" />
                     </div>
                   </motion.div>
                 ))}
              </div>
           </div>
           
           <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
           <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </section>
      </div>

      {/* UPCOMING EVENTS */}
      <section>
        <div className="flex items-center justify-between mb-10">
           <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
              <h3 className="text-3xl font-black uppercase tracking-tighter italic">Event Chronicles.</h3>
           </div>
           <button onClick={() => navigate('/events')} className="group flex items-center gap-3 p-2 pl-6 bg-slate-50 rounded-full border border-slate-100 hover:bg-white transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Timeline Expansion</span>
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                 <Plus size={20} />
              </div>
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {events.map((event, idx) => (
             <motion.div
               key={event.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="group relative h-[500px] rounded-[3.5rem] overflow-hidden bg-slate-900 border-8 border-white shadow-2xl"
             >
                <img 
                  src={event.imageUrl || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800`} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" 
                  alt={event.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-between text-white">
                   <div className="flex justify-between items-start">
                      <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/20">
                         {event.category}
                      </span>
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center border border-white/20">
                         <span className="text-lg font-black leading-none">{format(new Date(event.date), 'dd')}</span>
                         <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{format(new Date(event.date), 'MMM')}</span>
                      </div>
                   </div>
                   
                   <div>
                      <h4 className="text-4xl font-black mb-6 tracking-tighter uppercase italic leading-[0.9] group-hover:text-indigo-400 transition-colors">
                         {event.title}
                      </h4>
                      <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <Info size={14} className="text-indigo-500" />
                            {event.location}
                         </div>
                         <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: '100%' }} 
                              transition={{ duration: 1.5 }}
                              className="h-full bg-indigo-500" 
                            />
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
}
