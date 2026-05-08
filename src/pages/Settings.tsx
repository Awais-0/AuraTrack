import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Shield, 
  Monitor, 
  Globe, 
  Database, 
  Github, 
  Cloud,
  Mail,
  Lock,
  Eye,
  Trash2,
  ChevronRight,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/Button';

export function Settings() {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-2">System Settings</h1>
          <p className="text-white/40 font-medium italic">Configure your digital environment and preferences</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Profile & Main Settings */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Account Profile Card */}
            <section className="glass p-8 rounded-[2.5rem] relative overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                <div className="relative group/avatar">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-black shadow-xl shadow-indigo-500/20">
                    AR
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white text-black rounded-xl shadow-lg opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold tracking-tight mb-1">Awais Raza</h3>
                  <p className="text-white/40 text-sm mb-4">Productivity Architect • Pro Member</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="sm">Edit Profile</Button>
                    <Button variant="glass" size="sm">Upgrade Plan</Button>
                  </div>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />
            </section>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'Notifications', 
                  desc: 'Configure session alerts & goal reminders', 
                  icon: Bell, 
                  color: 'text-amber-400',
                  bg: 'bg-amber-400/10'
                },
                { 
                  title: 'Privacy & Security', 
                  desc: 'Manage your data and encryption keys', 
                  icon: Shield, 
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-400/10'
                },
                { 
                  title: 'App Experience', 
                  desc: 'Theme, layout and visual preferences', 
                  icon: Monitor, 
                  color: 'text-indigo-400',
                  bg: 'bg-indigo-400/10'
                },
                { 
                  title: 'Data Export', 
                  desc: 'Download your focus history in JSON/CSV', 
                  icon: Database, 
                  color: 'text-purple-400',
                  bg: 'bg-purple-400/10'
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass p-6 rounded-[2rem] hover:bg-white/[0.05] transition-all cursor-pointer group flex items-start gap-5"
                >
                  <div className={cn("p-3.5 rounded-2xl shrink-0 group-hover:scale-110 transition-transform", item.bg, item.color)}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg tracking-tight mb-1">{item.title}</h4>
                    <p className="text-xs text-white/30 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/10 ml-auto group-hover:text-white/30 transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* Quick Actions / Danger Zone */}
            <div className="glass p-8 rounded-[2.5rem] border-red-500/10">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-6 px-2">Account Actions</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <Lock className="w-5 h-5 text-white/30" />
                    <span className="font-bold text-white/80">Change Access Password</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 text-red-400/80">
                    <Trash2 className="w-5 h-5" />
                    <span className="font-bold">Deactivate AuraTrack Account</span>
                  </div>
                  <div className="text-[10px] font-bold text-red-500/40 uppercase tracking-widest px-2 py-1 rounded-md border border-red-500/20">Danger Zone</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Integrations & Status */}
          <div className="space-y-8">
            <section className="glass p-8 rounded-[2.5rem]">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8">Live Integrations</h4>
              <div className="space-y-6">
                {[
                  { name: 'VS Code Extension', icon: Github, status: 'Connected', date: 'v1.4.2' },
                  { name: 'Chrome Monitor', icon: Globe, status: 'Active', date: 'v2.1.0' },
                  { name: 'Desktop Agent', icon: Smartphone, status: 'Legacy', date: 'Outdated' },
                ].map((sync) => (
                  <div key={sync.name} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      <sync.icon className="w-6 h-6 text-white/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold truncate">{sync.name}</div>
                      <div className="text-[10px] text-white/30 font-medium">{sync.date}</div>
                    </div>
                    <div className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg",
                      sync.status === 'Connected' || sync.status === 'Active' ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"
                    )}>
                      {sync.status}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-8 border-white/5">Connect New Service</Button>
            </section>

            {/* System Health */}
            <section className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.02] to-white/[0.05]">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-6">Cloud Sync</h4>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-bold">Cloud Backup</span>
                </div>
                <div className="w-12 h-6 bg-indigo-500 rounded-full relative p-1 cursor-pointer">
                  <div className="absolute right-1 top-1 bottom-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Last Synchronized</div>
                <div className="text-sm font-bold flex items-center gap-2">
                   Today, 04:12 PM
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
