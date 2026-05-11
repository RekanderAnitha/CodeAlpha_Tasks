import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Folder, FileText, Download, Filter, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export default function NotesScreen() {
  const { profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock notes data for demonstration
  const notes = [
    { title: "Operating Systems Lecture 1-4", type: "PDF", size: "2.4 MB", date: "2 days ago", dept: "CSE", sem: "4" },
    { title: "Data Structures - Graph Theory", type: "PDF", size: "1.8 MB", date: "5 days ago", dept: "CSE", sem: "4" },
    { title: "Computer Networks Midterm Prep", type: "DocX", size: "800 KB", date: "1 week ago", dept: "CSE", sem: "5" },
    { title: "Digital Electronics Lab Manual", type: "PDF", size: "4.2 MB", date: "2 weeks ago", dept: "ECE", sem: "3" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-sans tracking-tight">E-Library</h2>
          <p className="text-slate-500 text-sm">Notes and study materials</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
          <BookOpen size={24} />
        </div>
      </div>

      {/* Search & Search Pills */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search notes, subjects..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {["All", "PDFs", "Exams", "Labs", "Lectures"].map(chip => (
            <button key={chip} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all shrink-0">
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Folders (Mock) */}
      <div className="grid grid-cols-2 gap-4">
        <FolderCard title="My Courses" count={12} color="bg-blue-500" />
        <FolderCard title="Previous Year" count={45} color="bg-orange-500" />
      </div>

      {/* Recent Uploads */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800">Recent Uploads</h3>
        <div className="space-y-3">
          {notes.map((note, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:border-orange-200 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                {note.type === 'PDF' ? <FileText size={24} /> : <BookOpen size={24} />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-sm truncate">{note.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-slate-400">{note.size}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{note.dept} • Sem {note.sem}</span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-orange-600 hover:text-white transition-all">
                <Download size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Suggested Reading */}
      <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl p-6 text-white overflow-hidden relative shadow-lg shadow-orange-200">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-80 decoration-white underline underline-offset-4">Handpicked for you</span>
          <h3 className="text-xl font-bold mt-2 mb-1">Final Exam Guide</h3>
          <p className="text-xs text-white/70 mb-4 font-medium">A curated set of 50 questions most likely to appear in your upcoming exams.</p>
          <button className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-xl text-xs font-black shadow-lg">
            VIEW GUIDE <ChevronRight size={14} />
          </button>
        </div>
        <BookOpen className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
      </div>
    </div>
  );
}

function FolderCard({ title, count, color }: { title: string; count: number; color: string }) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 flex flex-col gap-4 hover:shadow-lg hover:shadow-slate-200/50 transition-all cursor-pointer group">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", color)}>
        <Folder size={24} />
      </div>
      <div>
        <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{title}</h4>
        <p className="text-xs text-slate-400">{count} Files</p>
      </div>
    </div>
  );
}
