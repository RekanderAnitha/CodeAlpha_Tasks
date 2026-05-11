import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { motion } from 'motion/react';
import { User, Mail, Lock, BookOpen, GraduationCap, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dept, setDept] = useState('');
  const [sem, setSem] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        department: dept,
        semester: sem,
        role: 'student',
        createdAt: new Date().toISOString()
      });
      
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-sans">
      <div className="hidden md:flex md:w-[40%] bg-[#0A0A0A] flex-col justify-between p-12 text-white relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-[20%] left-[-10%] w-[100%] h-[100%] bg-blue-600 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white rounded-2xl rotate-6 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)]">
               <div className="w-6 h-6 border-4 border-black rounded-full border-t-indigo-600 animate-[spin_3s_linear_infinite]" />
            </div>
            <div>
               <span className="font-black tracking-[0.3em] text-xl block leading-none">CAMPUS.</span>
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mt-1 block">Registration</span>
            </div>
          </div>
          
          <h1 className="text-[5vw] font-black leading-[0.9] tracking-tighter uppercase italic text-white/90">
             Start <br /> 
             <span className="text-white">Fresh.</span>
          </h1>
        </div>

        <div className="relative z-10">
          <p className="text-slate-400 max-w-xs text-sm font-medium leading-relaxed">
            Register your unique student identity and unlock the full potential of your campus experience.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-20 bg-slate-50/50 overflow-y-auto">
        <div className="max-w-lg w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Identity Creation</h2>
              <p className="text-slate-500 mt-2 font-medium">Draft your credentials for the campus vault</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Display Name" icon={<User size={18} />} placeholder="Alex Rivera" value={name} onChange={setName} />
                <InputGroup label="ID Email" icon={<Mail size={18} />} placeholder="alex@inst.edu" type="email" value={email} onChange={setEmail} />
                
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-400 group-focus-within:text-indigo-600">Department</label>
                  <select 
                    required 
                    value={dept} 
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-[1.25rem] py-4 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-bold text-slate-900 appearance-none"
                  >
                    <option value="">Select Division</option>
                    <option value="CSE">Engineering (CSE)</option>
                    <option value="ECE">Electronics (ECE)</option>
                    <option value="ARTS">Liberal Arts</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-400 group-focus-within:text-indigo-600">Semester</label>
                  <select 
                    required 
                    value={sem} 
                    onChange={(e) => setSem(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-[1.25rem] py-4 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-bold text-slate-900 appearance-none"
                  >
                    <option value="">Select Stage</option>
                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}th Academic Cycle</option>)}
                  </select>
                </div>

                <div className="md:col-span-2">
                   <InputGroup label="Secure Password" icon={<Lock size={18} />} placeholder="••••••••" type="password" value={password} onChange={setPassword} />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A0A0A] text-white rounded-[1.25rem] py-5 font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-2xl mt-4"
              >
                {loading ? 'Encrypting...' : <>Generate Identity <ChevronRight size={18} /></>}
              </button>
            </form>

            <p className="mt-10 text-center text-slate-400 text-xs font-bold">
              Already have an identity? <Link to="/login" className="text-black underline underline-offset-4 ml-1">RETURN TO AUTH</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, icon, placeholder, value, onChange, type = "text" }: any) {
  return (
    <div className="group">
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-slate-400 group-focus-within:text-indigo-600 transition-colors uppercase">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors">{icon}</div>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-[1.25rem] py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-bold text-slate-900"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
