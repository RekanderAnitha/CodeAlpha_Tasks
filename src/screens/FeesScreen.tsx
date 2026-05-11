import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, CheckCircle2, History, AlertCircle, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export default function FeesScreen() {
  const portalStatus = "SECURE";
  
  const dues = [
    { id: '1', title: 'Semester Tuition Fee', term: 'Spring 2026', amount: '$4,250.00', status: 'PAID', date: '2026-01-15' },
    { id: '2', title: 'Laboratory Equipment Fee', term: 'Spring 2026', amount: '$150.00', status: 'PAID', date: '2026-01-20' },
    { id: '3', title: 'Library Access Annual', term: 'Annual', amount: '$75.00', status: 'PENDING', date: '---' },
    { id: '4', title: 'Hostel Maintenance', term: 'Quarterly', amount: '$600.00', status: 'PENDING', date: '---' },
  ];

  return (
    <div className="p-6 md:p-12 space-y-12 pb-32 max-w-7xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
           <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Financial Ledger {portalStatus}</span>
           </div>
           <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase italic">
              Economic <br /> 
              <span className="text-indigo-600">Protocol.</span>
           </h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <CreditCard size={24} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Outstanding</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">$675.00</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8">Transaction Hub.</h3>
            <div className="space-y-4">
               {dues.map((item, idx) => (
                 <motion.div 
                   key={item.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="group p-6 bg-slate-50 rounded-[2rem] border border-slate-50 hover:bg-white hover:border-slate-100 transition-all flex items-center justify-between"
                 >
                    <div className="flex items-center gap-4">
                       <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          item.status === 'PAID' ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"
                       )}>
                          {item.status === 'PAID' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">{item.term}</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-slate-900 leading-none mb-1">{item.amount}</p>
                       <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest",
                          item.status === 'PAID' ? "text-emerald-500" : "text-orange-500"
                       )}>{item.status}</span>
                    </div>
                 </motion.div>
               ))}
            </div>
         </section>

         <section className="flex flex-col gap-8">
             <div className="bg-[#0A0A0A] p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden flex-1">
                <div className="relative z-10">
                   <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-8">Initiate Transfer.</h3>
                   <div className="space-y-6">
                      <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                         <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <CreditCard size={18} />
                         </div>
                         <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Selected Method</p>
                            <h4 className="text-sm font-bold tracking-tight italic">Vault Secure Card (**** 4429)</h4>
                         </div>
                      </div>
                      <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-400 transition-colors">
                         Authorize $675.00 Payment
                      </button>
                      <p className="text-center text-[9px] font-black uppercase tracking-widest text-slate-600">
                         Encrypted via 256-Bit SSL Protcols
                      </p>
                   </div>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none" />
             </div>
             
             <div className="bg-slate-50 p-10 rounded-[3.5rem] border border-slate-100 flex items-center gap-6 group hover:bg-white transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                   <History size={24} />
                </div>
                <div>
                   <h4 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Legacy Ledger.</h4>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Audit Financial History</p>
                </div>
             </div>
         </section>
      </div>
    </div>
  );
}
