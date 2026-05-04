import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Clock, 
  BarChart3, 
  Settings, 
  LogOut, 
  User,
  Zap,
  Target
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'sessions', label: 'Sessions', icon: Clock, path: '/sessions' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
  { id: 'goals', label: 'Goals', icon: Target, path: '/goals' },
];

const secondaryItems = [
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-full glass border-r border-white/5 flex flex-col z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Zap className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white/90">AuraTrack</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-4 mb-4">
          Main Menu
        </div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-300",
                isActive ? "scale-110" : "group-hover:scale-110"
              )} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}

        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-4 mb-4 mt-8">
          Personal
        </div>
        {secondaryItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <button className="flex items-center gap-4 px-4 py-3 w-full rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-300">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
