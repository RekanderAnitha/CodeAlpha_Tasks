import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Plus, Bell, Calendar as CalendarIcon, FileText, Send, CheckCircle2, X, ClipboardList, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'notice' | 'event' | 'timetable' | 'notes'>('notice');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Notice Form State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Circulars');

  // Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventCategory, setEventCategory] = useState('Fests');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await addDoc(collection(db, 'notices'), {
        title: noticeTitle,
        content: noticeContent,
        category: noticeCategory,
        createdAt: serverTimestamp(),
        authorId: user?.uid
      });
      setStatus({ type: 'success', message: 'Broadcasting protocol initiated. Notice is live.' });
      setNoticeTitle('');
      setNoticeContent('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'notices');
      setStatus({ type: 'error', message: 'Protocol failure. Check console for integrity errors.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await addDoc(collection(db, 'events'), {
        title: eventTitle,
        description: eventDesc,
        category: eventCategory,
        date: new Date(eventDate).toISOString(),
        location: eventLocation,
        createdAt: serverTimestamp(),
        authorId: user?.uid
      });
      setStatus({ type: 'success', message: 'Event successfully serialized to the timeline.' });
      setEventTitle('');
      setEventDesc('');
      setEventDate('');
      setEventLocation('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'events');
      setStatus({ type: 'error', message: 'Timeline sync failed. Verify permissions.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
        <div>
           <div className="inline-block px-3 py-1 bg-[#0A0A0A] text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              Terminal Control
           </div>
           <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Administrative <br /> Nexus</h2>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-emerald-50 px-4 py-2 rounded-2xl flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">System Online</span>
           </div>
        </div>
      </div>

      {status && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-6 rounded-3xl flex items-center justify-between border shadow-2xl",
            status.type === 'success' ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-red-50 border-red-100 text-red-800"
          )}
        >
          <div className="flex items-center gap-4">
            {status.type === 'success' ? <CheckCircle2 size={24} /> : <X size={24} />}
            <span className="font-black text-[11px] uppercase tracking-widest">{status.message}</span>
          </div>
          <button onClick={() => setStatus(null)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X size={18} /></button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-3 space-y-2">
            <TabButton active={activeTab === 'notice'} onClick={() => setActiveTab('notice')} icon={<Bell size={18} />} label="ANNOUNCEMENTS" />
            <TabButton active={activeTab === 'event'} onClick={() => setActiveTab('event')} icon={<CalendarIcon size={18} />} label="CHRONOLOGY" />
            <TabButton active={activeTab === 'timetable'} onClick={() => setActiveTab('timetable')} icon={<FileText size={18} />} label="SCHEDULER" />
            
            <div className="pt-10">
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <Activity size={20} className="text-slate-400 mb-4" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">Access to this terminal is strictly limited to authorized personnel.</p>
               </div>
            </div>
         </div>

         <motion.div
           key={activeTab}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="lg:col-span-9 bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm"
         >
           {activeTab === 'notice' && (
             <form onSubmit={handleAddNotice} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Header</label>
                    <input
                      type="text"
                      required
                      value={noticeTitle}
                      onChange={(e) => setNoticeTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-900 transition-all"
                      placeholder="Transmission Title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Protocol Tier</label>
                    <select
                      value={noticeCategory}
                      onChange={(e) => setNoticeCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-900 appearance-none"
                    >
                      {["Exams", "Seminars", "Workshops", "Fests", "Circulars", "Holidays"].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Body</label>
                 <textarea
                   required
                   rows={6}
                   value={noticeContent}
                   onChange={(e) => setNoticeContent(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-indigo-50 outline-none resize-none font-bold text-slate-900 transition-all"
                   placeholder="Enter official communication..."
                 ></textarea>
               </div>
               <button
                 type="submit"
                 disabled={loading}
                 className="w-full bg-[#0A0A0A] text-white rounded-2xl py-6 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-2xl"
               >
                 {loading ? 'Transmitting...' : <><Send size={16} /> BROADCAST PROTOCOL</>}
               </button>
             </form>
           )}

           {activeTab === 'event' && (
             <form onSubmit={handleAddEvent} className="space-y-8">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Designation</label>
                 <input
                   type="text"
                   required
                   value={eventTitle}
                   onChange={(e) => setEventTitle(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-900 transition-all"
                   placeholder="e.g. TECH SUMMIT 2026"
                 />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Timestamp</label>
                   <input
                     type="datetime-local"
                     required
                     value={eventDate}
                     onChange={(e) => setEventDate(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-900 transition-all"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Coordinates</label>
                   <input
                     type="text"
                     required
                     value={eventLocation}
                     onChange={(e) => setEventLocation(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-900 transition-all"
                     placeholder="Designated sector"
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Execution Brief</label>
                 <textarea
                   required
                   rows={4}
                   value={eventDesc}
                   onChange={(e) => setEventDesc(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-indigo-50 outline-none resize-none font-bold text-slate-900 transition-all"
                   placeholder="Event parameters..."
                 ></textarea>
               </div>
               <button
                 type="submit"
                 disabled={loading}
                 className="w-full bg-[#0A0A0A] text-white rounded-2xl py-6 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-2xl"
               >
                 {loading ? 'Synchronizing...' : <><CalendarIcon size={16} /> INITIALIZE TIMELINE</>}
               </button>
             </form>
           )}

           {activeTab === 'timetable' && (
             <div className="py-20 text-center space-y-4">
               <div className="inline-block p-6 bg-slate-50 rounded-full text-slate-200">
                  <ClipboardList size={64} />
               </div>
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Protocol Encrypted</h3>
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest max-w-sm mx-auto">Temporal scheduler is currently undergoing deep-cycle maintenance.</p>
             </div>
           )}
         </motion.div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em]",
        active 
          ? "bg-[#0A0A0A] text-white shadow-xl translate-x-2" 
          : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
      )}
    >
      <span className={cn(active ? "text-indigo-400" : "text-slate-300")}>{icon}</span>
      {label}
    </button>
  );
}
