import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { 
  User, Settings, Bell, Shield, HelpCircle, 
  LogOut, ChevronRight, GraduationCap, Building2, 
  Mail, Calendar, Edit3, Sparkles, ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ProfileScreen() {
  const { profile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const sections = [
    { title: 'Academic Metadata', items: [
      { id: 'dept', label: 'Division', value: profile?.department, icon: <Building2 size={18} /> },
      { id: 'sem', label: 'Academic Cycle', value: `Semester ${profile?.semester}`, icon: <GraduationCap size={18} /> },
      { id: 'email', label: 'Vault ID', value: profile?.email, icon: <Mail size={18} /> },
    ]},
    { title: 'System Configurations', items: [
      { id: 'notif', label: 'Alert Protocols', value: 'High Priority Only', icon: <Bell size={18} /> },
      { id: 'sec', label: 'Security Status', value: 'Verified Resident', icon: <ShieldCheck size={18} /> },
    ]},
  ];

  return (
    <div className="p-6 md:p-10 space-y-12 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
           <div className="w-40 h-40 rounded-[3rem] bg-[#0A0A0A] p-1 rotate-3 shadow-2xl transition-transform group-hover:rotate-0 duration-500">
              <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-white">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.uid}`} 
                  alt="Avatar"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
           </div>
           <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-indigo-600 border border-slate-100 hover:scale-110 transition-transform">
              <Edit3 size={20} />
           </button>
        </div>

        <div className="text-center md:text-left">
           <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              Authorized Resident
           </div>
           <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-2">{profile?.name || 'Resident'}</h2>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Digital Signature: {profile?.uid?.slice(0, 8)}...</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {sections.map((section, idx) => (
          <section key={idx} className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-2">
              {section.title}
            </h3>
            <div className="grid gap-3">
              {section.items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-sm font-black text-slate-900">{item.value || 'N/A'}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
         <button className="flex items-center justify-between p-6 bg-[#0A0A0A] text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-slate-800 transition-all group">
            <div className="flex items-center gap-4">
               <HelpCircle size={18} className="text-slate-400" />
               <span>Technical Assistance</span>
            </div>
            <ChevronRight size={16} />
         </button>

         <button 
           onClick={handleLogout}
           className="flex items-center justify-between p-6 bg-red-50 text-red-600 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-red-100 transition-all group"
         >
            <div className="flex items-center gap-4">
               <LogOut size={18} />
               <span>Terminate Session</span>
            </div>
            <ChevronRight size={16} />
         </button>
      </div>

      <div className="text-center pt-10">
        <div className="flex items-center justify-center gap-2 mb-4">
           <Sparkles className="text-indigo-600" size={16} />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">CAMPUS CORE v2.0</span>
        </div>
        <p className="text-slate-400 max-w-xs mx-auto text-[9px] leading-relaxed font-bold uppercase tracking-widest">
           All telemetry and academic records are synchronized with the central vault.
        </p>
      </div>
    </div>
  );
}
