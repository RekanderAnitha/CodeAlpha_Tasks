import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Plus, Minus, ClipboardCheck, BarChart3, TrendingUp, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AttendanceScreen() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    fetchAttendance();
  }, [user]);

  const fetchAttendance = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(collection(db, `/users/${user.uid}/attendance`));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      if (data.length === 0) {
        setSubjects([
          { id: '1', subject: 'Computational Theory', presentCount: 18, totalCount: 20 },
          { id: '2', subject: 'Digital Systems', presentCount: 14, totalCount: 20 },
          { id: '3', subject: 'Quantum Mechanics', presentCount: 8, totalCount: 12 },
        ]);
      } else {
        setSubjects(data);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !user) return;
    
    try {
      const newDoc = doc(collection(db, `/users/${user.uid}/attendance`));
      await setDoc(newDoc, {
        subject: newSubject,
        presentCount: 0,
        totalCount: 0,
        updatedAt: new Date().toISOString()
      });
      setNewSubject('');
      fetchAttendance();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'attendance');
    }
  };

  const updateCount = async (subjectId: string, type: 'present' | 'absent') => {
    if (!user) return;
    try {
      const docRef = doc(db, `/users/${user.uid}/attendance`, subjectId);
      await updateDoc(docRef, {
        presentCount: type === 'present' ? increment(1) : increment(0),
        totalCount: increment(1),
        updatedAt: new Date().toISOString()
      });
      fetchAttendance();
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'attendance');
    }
  };

  const calculatePercentage = (present: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((present / total) * 100);
  };

  const avg = subjects.length > 0 
    ? Math.round(subjects.reduce((acc, sub) => acc + calculatePercentage(sub.presentCount, sub.totalCount), 0) / subjects.length)
    : 0;

  if (loading) return (
    <div className="p-8 space-y-8 animate-pulse">
       <div className="h-10 w-48 bg-slate-100 rounded-xl" />
       <div className="h-48 bg-slate-50 rounded-[3rem]" />
    </div>
  );

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              Academic Compliance
           </div>
           <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Attendance <br /> Registry</h2>
        </div>
        <div className="text-right">
           <p className="text-sm font-black text-slate-900 uppercase italic mb-1 tracking-widest">Target: 75.00%</p>
           <p className="text-xs font-bold text-slate-400">Global Average: {avg}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="md:col-span-4 bg-[#0A0A0A] p-10 rounded-[3rem] text-white flex flex-col justify-between shadow-2xl shadow-indigo-100"
         >
            <div>
               <TrendingUp className="text-emerald-500 mb-6" size={32} />
               <h3 className="text-4xl font-black tracking-tighter mb-2">{avg}%</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">Real-time aggregate <br /> metric across all sectors.</p>
            </div>
            <div className="mt-12 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: `${avg}%` }} className="h-full bg-emerald-500" />
            </div>
         </motion.div>

         <div className="md:col-span-8 flex flex-col gap-4">
            <form onSubmit={handleAddSubject} className="relative group">
               <input
                 type="text"
                 value={newSubject}
                 onChange={(e) => setNewSubject(e.target.value)}
                 placeholder="Initialize new subject registry..."
                 className="w-full bg-white border border-slate-100 rounded-[1.5rem] py-5 px-6 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all shadow-sm"
               />
               <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0A0A0A] text-white rounded-2xl flex items-center justify-center">
                  <Plus size={24} />
               </button>
            </form>

            <div className="space-y-3">
               {subjects.map((sub, idx) => {
                 const percent = calculatePercentage(sub.presentCount, sub.totalCount);
                 return (
                   <motion.div
                     key={sub.id}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.05 }}
                     className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between group"
                   >
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <span className={cn("text-[9px] font-black uppercase tracking-widest", percent >= 75 ? "text-emerald-500" : "text-orange-500")}>
                             {percent >= 75 ? 'Optimal COMPLIANCE' : 'Action REQUIRED'}
                           </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 tracking-tight">{sub.subject}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{sub.presentCount} of {sub.totalCount} sessions verified</p>
                     </div>
                     
                     <div className="flex items-center gap-2">
                        <button onClick={() => updateCount(sub.id, 'absent')} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-200 flex items-center justify-center transition-all">
                           <Minus size={20} />
                        </button>
                        <button onClick={() => updateCount(sub.id, 'present')} className="w-12 h-12 rounded-2xl bg-indigo-600 text-white hover:scale-105 flex items-center justify-center transition-all shadow-xl shadow-indigo-100">
                           <Plus size={24} />
                        </button>
                     </div>
                   </motion.div>
                 );
               })}
            </div>
         </div>
      </div>
    </div>
  );
}
