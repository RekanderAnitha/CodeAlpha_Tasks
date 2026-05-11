import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock, Search, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'asc'));
      const snap = await getDocs(q);
      setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="p-8 space-y-8">
      <div className="h-12 w-64 bg-slate-100 animate-pulse rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1,2,3,4].map(i => <div key={i} className="aspect-[4/5] bg-slate-50 animate-pulse rounded-[3rem]" />)}
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-14 space-y-16 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Cultural Matrix
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.8] uppercase italic">
            Chronology <br /> 
            <span className="text-emerald-500">Events.</span>
          </h2>
        </div>
        <div className="hidden lg:block text-right">
           <div className="w-32 h-32 rounded-full border-4 border-slate-100 flex flex-col items-center justify-center p-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Sync Rate</span>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">99%</span>
           </div>
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
        {events.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="break-inside-avoid"
          >
             <div className="group relative rounded-[3rem] overflow-hidden bg-slate-900 border-4 border-white shadow-2xl transition-all duration-700 hover:border-black">
                <div className="relative aspect-[4/5] overflow-hidden">
                   <img 
                     src={event.imageUrl || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800`} 
                     className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" 
                     alt={event.title}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
                   
                   {/* Date Float */}
                   <div className="absolute top-6 right-6">
                      <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                         <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{format(new Date(event.date), 'MMM')}</span>
                         <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">{format(new Date(event.date), 'dd')}</span>
                      </div>
                   </div>

                   <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                      <span className="inline-block px-2 py-0.5 border border-indigo-400 text-indigo-400 rounded text-[9px] font-black uppercase tracking-widest mb-4 self-start">
                        {event.category}
                      </span>
                      <h4 className="text-3xl font-black leading-none mb-3 tracking-tighter uppercase italic group-hover:text-indigo-400 transition-colors">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <div className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-indigo-400" />
                            {event.location}
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="bg-white p-8 space-y-4">
                   <p className="text-slate-500 text-sm font-medium line-clamp-2">
                     {event.description || "Experimental campus experience protocol initiated. Presence strictly authorized for validated identities."}
                   </p>
                   <button className="w-full bg-[#0A0A0A] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                      Initialize RSVP <ChevronRight size={14} />
                   </button>
                </div>
             </div>
          </motion.div>
        ))}

        {events.length === 0 && (
          <div className="col-span-full py-40 text-center flex flex-col items-center">
             <div className="w-32 h-32 rounded-full border-2 border-slate-100 flex items-center justify-center mb-10 text-slate-100">
                <Sparkles size={64} />
             </div>
             <h4 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 mb-2">Chronology Null.</h4>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active events in current timeline.</p>
          </div>
        )}
      </div>
    </div>
  );
}
