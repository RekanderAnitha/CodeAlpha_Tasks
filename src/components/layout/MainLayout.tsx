import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Home, Bell, Calendar, Clock, ClipboardList, BookOpen, User, ShieldCheck, Sparkles, ScrollText, MessageSquare, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import AiChatbot from '../AiChatbot';
import NotificationToast from '../NotificationToast';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();
  
  if (!user) return <>{children}</>;

  const navItems = [
    { to: '/', icon: <Home size={22} />, label: 'Feed' },
    { to: '/lms', icon: <BookOpen size={22} />, label: 'Learn' },
    { to: '/timetable', icon: <Clock size={22} />, label: 'Plan' },
    { to: '/attendance', icon: <ClipboardList size={22} />, label: 'Track' },
    { to: '/profile', icon: <User size={22} />, label: 'Identity' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAF8] text-slate-900 font-sans">
      <NotificationToast />
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="w-10 h-10 bg-[#0A0A0A] rounded-xl flex items-center justify-center text-white rotate-3 shadow-xl group-hover:rotate-12 transition-transform relative z-10">
                 <GraduationCap size={22} className="text-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <h1 className="text-xl font-black tracking-tighter uppercase italic text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">Vault</h1>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500 italic">Intelligence</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
             {isAdmin && (
                <NavLink to="/admin" className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 relative">
                  <ShieldCheck size={20} className="text-indigo-600" />
                </NavLink>
             )}
             <button className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-600 rounded-full border border-white" />
             </button>
             <NavLink to="/profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100 transition-transform active:scale-90">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="Profile" />
             </NavLink>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-32 w-full max-w-7xl mx-auto overflow-x-hidden">
        {children}
      </main>

      <AiChatbot />

      {/* Glass Floating Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg">
        <div className="bg-[#0A0A0A]/90 backdrop-blur-2xl px-4 py-3 rounded-[2.5rem] flex items-center justify-between shadow-2xl shadow-indigo-200/40 border border-white/10">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "relative flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all duration-500",
                  isActive ? "text-white flex-[1.5]" : "text-slate-500 hover:text-slate-300 flex-1 shrink-0"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-white/10 rounded-[1.5rem] blur-sm"
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                    />
                  )}
                  <div className={cn(
                    "relative z-10 transition-transform duration-300",
                    isActive ? "scale-110 mb-1" : "hover:scale-110"
                  )}>
                    {item.icon}
                  </div>
                  {isActive && (
                    <motion.span 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative z-10 text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
