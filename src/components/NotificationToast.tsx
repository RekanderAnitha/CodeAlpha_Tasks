import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Info, AlertTriangle, Calendar, BookOpen, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  type: 'seminar' | 'exam' | 'fest' | 'notice';
}

export default function NotificationToast() {
  const [activeAlert, setActiveAlert] = useState<AlertNotification | null>(null);
  const [lastProcessedId, setLastProcessedId] = useState<string | null>(null);

  useEffect(() => {
    // Listen for the most recent notices
    const q = query(
      collection(db, 'notices'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Check for document changes
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          const docId = change.doc.id;
          
          // Avoid showing the same notification multiple times
          if (docId === lastProcessedId) return;

          // Check if this is "recent" enough to show as a toast
          let createdAtMs = 0;
          if (data.createdAt instanceof Timestamp) {
            createdAtMs = data.createdAt.toMillis();
          } else if (data.createdAt?.seconds) {
             createdAtMs = data.createdAt.seconds * 1000;
          } else {
             // Fallback for local latency compensation
             createdAtMs = Date.now();
          }

          // Show if it happened within the last 15 seconds
          if (Date.now() - createdAtMs < 15000) {
            setLastProcessedId(docId);
            setActiveAlert({
              id: docId,
              title: data.title || 'Campus Broadcast',
              message: data.content || 'A new update is available in the portal.',
              type: (data.category?.toLowerCase() || 'notice') as any
            });

            // Auto hide after 8 seconds
            const timer = setTimeout(() => {
              setActiveAlert(null);
            }, 8000);
            return () => clearTimeout(timer);
          }
        }
      });
    }, (error) => {
      console.warn("Notification listener error:", error);
    });

    return () => unsubscribe();
  }, [lastProcessedId]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'exams':
      case 'exam': return <AlertTriangle size={20} className="text-orange-600" />;
      case 'fest': return <SparklesIcon size={20} className="text-pink-600" />;
      case 'seminars':
      case 'seminar': return <BookOpen size={20} className="text-indigo-600" />;
      case 'circulars':
      case 'notice': return <Bell size={20} className="text-blue-600" />;
      default: return <Clock size={20} className="text-slate-600" />;
    }
  };

  return (
    <AnimatePresence>
      {activeAlert && (
        <motion.div
           initial={{ y: -100, opacity: 0, x: '-50%' }}
           animate={{ y: 20, opacity: 1, x: '-50%' }}
           exit={{ y: -100, opacity: 0, x: '-50%' }}
           className="fixed top-0 left-1/2 z-[100] w-[92%] max-w-sm pointer-events-none"
        >
          <div className="bg-[#0A0A0A] text-white border border-white/10 rounded-[2rem] p-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex items-center gap-4 pointer-events-auto">
             <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                {getIcon(activeAlert.type)}
             </div>
             <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                   <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Security Broadcast</h4>
                </div>
                <h4 className="text-sm font-bold leading-tight truncate">{activeAlert.title}</h4>
                <p className="text-[10px] font-medium text-slate-400 mt-1 line-clamp-1 italic">{activeAlert.message}</p>
             </div>
             <button 
                onClick={() => setActiveAlert(null)}
                className="p-1.5 hover:bg-white/5 rounded-xl transition-colors"
             >
                <X size={16} className="text-slate-500" />
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SparklesIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
