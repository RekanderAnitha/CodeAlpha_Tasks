import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Book, User, Monitor, ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function TimetableScreen() {
  const { profile } = useAuth();
  const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay() - 1] || DAYS[0]);

  const schedule = [
    { time: "09:00", duration: "1h", subject: "Quantum Computing", faculty: "Dr. Heisenberg", type: "Core", room: "LT-402" },
    { time: "10:00", duration: "1h", subject: "Artificial Intelligence", faculty: "Prof. Turing", type: "Elective", room: "LT-305" },
    { time: "11:15", duration: "1h", subject: "Advanced Mathematics", faculty: "Dr. Euler", type: "Core", room: "LT-102" },
    { time: "13:30", duration: "2h", subject: "Distributed Systems Lab", faculty: "Mr. Cerf", type: "Practical", room: "Lab Delta" },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              Temporal Schedule
           </div>
           <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Weekly <br /> Lifecycle</h2>
        </div>
        <div className="text-right">
           <p className="text-sm font-black text-slate-900 uppercase italic mb-1 tracking-widest">{profile?.department || 'CSE'} Archive</p>
           <p className="text-xs font-bold text-slate-400">Current Phase: Semester {profile?.semester || '4'}</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar border-b border-slate-100">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={cn(
              "px-1 py-4 text-sm font-black uppercase tracking-widest transition-all relative min-w-[80px]",
              selectedDay === day 
                ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {schedule.map((slot, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col md:flex-row items-start md:items-center p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 transition-all gap-8"
          >
             <div className="flex items-center gap-6 md:w-32">
                <div className="w-1.5 h-10 bg-slate-100 group-hover:bg-blue-600 transition-colors rounded-full" />
                <div className="flex flex-col">
                   <span className="text-xl font-black text-slate-900 tracking-tighter">{slot.time}</span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{slot.duration}</span>
                </div>
             </div>

             <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{slot.type}</span>
                   <div className="w-1 h-1 bg-slate-200 rounded-full" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{slot.room}</span>
                </div>
                <h4 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{slot.subject}</h4>
                <div className="flex items-center gap-2 mt-4">
                   <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${slot.faculty}`} className="w-5 h-5 rounded-md" alt="F" />
                   <span className="text-xs font-bold text-slate-500">{slot.faculty}</span>
                </div>
             </div>

             <div className="hidden md:block">
                <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                   <Hash size={20} />
                </button>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
