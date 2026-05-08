import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  User,
  Zap,
  Target,
  ChevronLeft,
  ChevronRight
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
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);

  return (
    <aside
      className={cn(
        "h-full glass border-r border-white/5 flex flex-col z-50 transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo & Toggle */}
      <div className={cn(
        "p-6 flex items-center transition-all",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center w-full"
        )}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
            <Zap className="text-white w-6 h-6" />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight text-white/90 whitespace-nowrap">
              AuraTrack
            </span>
          )}
        </div>
        <button
          onClick={toggleCollapse}
          className={cn(
            "text-white/50 hover:text-white transition-all hover:bg-white/10 rounded-lg p-1",
            collapsed && "absolute -right-4 bg-white/10 top-8 shadow-md"
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {/* Main Menu label */}
        {!collapsed && (
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-4 mb-4">
            Main Menu
          </div>
        )}

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                "overflow-hidden",
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-300",
                isActive ? "scale-110" : "group-hover:scale-110"
              )} />
              {!collapsed && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && collapsed && (
                <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full" />
              )}
            </Link>
          );
        })}

        {/* Personal label */}
        {!collapsed && (
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-4 mb-4 mt-8">
            Personal
          </div>
        )}

        {secondaryItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className={cn("p-6", collapsed && "p-4")}>
        <button
          className={cn(
            "flex items-center gap-4 w-full rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-300",
            collapsed ? "justify-center px-2 py-3" : "px-4 py-3"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}