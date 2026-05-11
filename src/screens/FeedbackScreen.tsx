import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Star, Send, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function FeedbackScreen() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6 md:p-12 space-y-12 pb-32 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
           <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Atmospheric Perception Protocol</span>
           </div>
           <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase italic">
              Vault <br /> 
              <span className="text-indigo-600">Resonance.</span>
           </h2>
        </div>
      </div>

      <div className="max-w-3xl">
         {!submitted ? (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden"
           >
              <div className="relative z-10">
                 <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-8">Share your frequency.</h3>
                 
                 <div className="space-y-10">
                    <div className="group">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 group-focus-within:text-indigo-600 transition-colors">Experience Rating</label>
                       <div className="flex items-center gap-4">
                          {[1, 2, 3, 4, 5].map((i) => (
                             <button
                                key={i}
                                onClick={() => setRating(i)}
                                className={cn(
                                   "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                                   rating >= i 
                                     ? "bg-amber-500 text-white shadow-lg shadow-amber-100" 
                                     : "bg-slate-50 text-slate-300 hover:bg-slate-100"
                                )}
                             >
                                <Star size={24} fill={rating >= i ? "currentColor" : "none"} />
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="group">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 group-focus-within:text-indigo-600 transition-colors">Analytic Feedback</label>
                       <textarea 
                          rows={6}
                          placeholder="Describe your session highlights or protocol failures..."
                          className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-sans"
                       />
                    </div>

                    <button 
                       onClick={() => setSubmitted(true)}
                       className="w-full bg-black text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                    >
                       <Send size={18} />
                       Transmit Feedback
                    </button>
                 </div>
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-50 rounded-full blur-[80px]" />
           </motion.div>
         ) : (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-emerald-50 p-16 rounded-[4rem] border border-emerald-100 text-center"
           >
              <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center text-emerald-600 shadow-xl mb-8 rotate-12">
                 <ShieldCheck size={40} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-4">Transmission Success.</h3>
              <p className="text-slate-500 text-sm font-medium">Your data has been integrated into the Vault perception core. Thank you for refining the experience.</p>
              <button 
                onClick={() => setSubmitted(false)} 
                className="mt-8 px-10 py-4 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                 New Transmission
              </button>
           </motion.div>
         )}
      </div>
    </div>
  );
}
