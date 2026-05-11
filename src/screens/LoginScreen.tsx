import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Mail, Lock, ChevronRight, AlertCircle, Sparkles, Shield, Fingerprint, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAsGuest } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 md:p-12 font-sans selection:bg-indigo-100 italic selection:text-indigo-900 relative overflow-hidden">
      {/* Background Animated Tech Grid */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white relative z-10">
        
        {/* Visual Panel */}
        <div className="hidden lg:flex bg-[#0A0A0A] p-16 flex-col justify-between relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-20 group">
                 <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-100 transition-opacity animate-pulse" />
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black shadow-2xl relative z-10 rotate-3 group-hover:rotate-12 transition-transform">
                       <GraduationCap size={36} className="text-indigo-600" />
                    </div>
                 </div>
                 <div className="flex flex-col -space-y-1">
                    <span className="font-black tracking-[0.2em] text-white uppercase text-2xl">VAULT</span>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.6em] mt-1 italic">Intelligence</span>
                 </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                 <h1 className="text-[5.5rem] font-serif font-black italic text-white leading-[0.8] tracking-tighter mb-8">
                    Knowledge <br />
                    <span className="text-indigo-500">Secured.</span>
                 </h1>
                 <p className="text-slate-400 font-medium max-w-sm leading-relaxed text-sm">
                   Access the institutional core for real-time academic analytics, resource management, and digital infrastructure.
                 </p>
              </motion.div>
           </div>

           <div className="relative z-10 flex items-center gap-8">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-[#0A0A0A] bg-slate-800 flex items-center justify-center">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" className="w-full h-full rounded-full" />
                    </div>
                 ))}
              </div>
              <p className="text-xs font-mono text-slate-500 tracking-tighter">
                 12,402+ Researchers Active
              </p>
           </div>

           {/* Gradients */}
           <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Form Panel */}
        <div className="p-10 md:p-20 flex flex-col justify-center">
           <div className="max-w-md w-full mx-auto">
              <div className="mb-12">
                 <div className="flex items-center gap-2 mb-4">
                    <Fingerprint size={16} className="text-indigo-600" />
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em]">Authentication Protocol</span>
                 </div>
                 <h2 className="text-4xl font-serif font-black text-slate-900 tracking-tighter italic">Entry Point.</h2>
              </div>

              <form onSubmit={handleLogin} className="space-y-8">
                 {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
                    >
                       <AlertCircle size={18} />
                       Access Denied. Check Credentials.
                    </motion.div>
                 )}

                 <div className="space-y-6">
                    <div className="group">
                       <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 group-focus-within:text-indigo-600 transition-colors italic">Credential ID</label>
                       <div className="relative">
                          <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                          <input
                             type="email"
                             required
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             className="w-full bg-transparent border-b border-slate-200 py-4 pl-8 pr-4 text-slate-900 font-medium focus:outline-none focus:border-indigo-600 transition-all font-mono"
                             placeholder="researcher@vault.io"
                          />
                       </div>
                    </div>

                    <div className="group">
                       <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 group-focus-within:text-indigo-600 transition-colors italic">Access Code</label>
                       <div className="relative">
                          <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                          <input
                             type="password"
                             required
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             className="w-full bg-transparent border-b border-slate-200 py-4 pl-8 pr-4 text-slate-900 font-medium focus:outline-none focus:border-indigo-600 transition-all font-mono"
                             placeholder="••••••••"
                          />
                       </div>
                    </div>
                 </div>

                 <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "w-full py-5 rounded-2xl font-mono font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98]",
                      loading 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                        : "bg-[#0A0A0A] text-white hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200"
                    )}
                 >
                    {loading ? "Decrypting..." : "Initialize Session"}
                    {!loading && <ChevronRight size={18} />}
                 </button>
              </form>

              <div className="mt-12 space-y-6">
                 <button
                    onClick={handleGuestLogin}
                    className="w-full py-5 rounded-2xl border border-slate-100 flex items-center justify-center gap-3 font-mono font-bold uppercase tracking-[0.2em] text-[10px] text-slate-500 hover:border-black hover:text-black transition-all group"
                 >
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                    Bypass Authentication (Guest)
                 </button>

                 <div className="text-center">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                       New Researcher? 
                       <Link to="/signup" className="text-indigo-600 ml-2 hover:underline">Register Identity</Link>
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
