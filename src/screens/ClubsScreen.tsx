import React from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles, MessageSquare, Plus, ChevronRight, Globe, Code, Music, Palette } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ClubsScreen() {
  const clubs = [
    { id: '1', name: 'NeuroCode AI', members: 450, icon: <Code />, color: 'bg-indigo-50 text-indigo-600', category: 'Tech' },
    { id: '2', name: 'Digital Harmonics', members: 120, icon: <Music />, color: 'bg-pink-50 text-pink-600', category: 'Arts' },
    { id: '3', name: 'Global Ethics Forum', members: 320, icon: <Globe />, color: 'bg-emerald-50 text-emerald-600', category: 'Social' },
    { id: '4', name: 'Canvas Theory', members: 85, icon: <Palette />, color: 'bg-orange-50 text-orange-600', category: 'Design' },
  ];

  return (
    <div className="p-6 md:p-12 space-y-12 pb-32 max-w-7xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
           <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Social Infrastructure active</span>
           </div>
           <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase italic">
              Campus <br /> 
              <span className="text-indigo-600">Guilds.</span>
           </h2>
        </div>
        <button className="bg-[#0A0A0A] text-white px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl">
           <Plus size={20} />
           Initialize Guild
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {clubs.map((club, idx) => (
           <motion.div
             key={club.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             className="group bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-black transition-all cursor-pointer flex items-center justify-between shadow-sm hover:shadow-2xl"
           >
              <div className="flex items-center gap-8">
                 <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center transition-transform group-hover:rotate-12", club.color)}>
                    {React.cloneElement(club.icon as React.ReactElement, { size: 36 })}
                 </div>
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">{club.category}</span>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{club.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{club.members} Researches</span>
                    </div>
                 </div>
              </div>
              <div className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-black group-hover:border-black transition-all">
                 <ChevronRight size={24} />
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
