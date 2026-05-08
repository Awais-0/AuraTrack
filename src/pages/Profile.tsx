import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Trophy,
  Zap,
  Flame,
  Github,
  Twitter,
  Linkedin,
  Clock,
  Target,
  Mail,
  Edit2,
  Camera,
  ChevronRight,
  Star
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/Button';

export function Profile() {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Banner Section */}
        <div className="h-48 md:h-64 w-full relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
          <Button variant="glass" size="sm" className="absolute top-6 right-8 gap-2 border-white/10">
            <Camera className="w-4 h-4" />
            Edit Banner
          </Button>
        </div>

        {/* Profile Info Overlay */}
        <div className="px-8 -mt-20 relative z-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 border-[6px] border-[#050505] shadow-2xl flex items-center justify-center text-4xl md:text-5xl font-black text-white">
                AR
              </div>
              <div className="absolute inset-0 rounded-[2.5rem] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-4xl font-black tracking-tighter">Awais Raza</h1>
                    <div className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/10">
                      PRO Member
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-white/40 italic">
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Islamabad, PK</div>
                    <div className="flex items-center gap-1.5 text-indigo-400"><LinkIcon className="w-4 h-4" /> awais.dev</div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined April 2024</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="primary" icon={Edit2}>Edit Profile</Button>
                  <Button variant="glass" className="p-3"><Mail className="w-5 h-5" /></Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">

          {/* Left Column: Stats & About */}
          <div className="space-y-8">
            <section className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-6">About Me</h3>
              <p className="text-sm font-medium leading-relaxed text-white/60 mb-6 italic">
                Full-stack developer focused on creating high-performance digital tools. I thrive in deep work sessions and am constantly optimizing my workflow.
              </p>
              <div className="flex gap-4">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <button key={i} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 hover:text-indigo-400 transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </section>

            <section className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/5 to-purple-600/5 border-indigo-500/10">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-6">Focus Skills</h3>
              <div className="space-y-4">
                {[
                  { label: 'Frontend Dev', level: 92, color: 'bg-indigo-500' },
                  { label: 'UI Design', level: 85, color: 'bg-purple-500' },
                  { label: 'Core Algorithms', level: 78, color: 'bg-emerald-500' },
                  { label: 'Research', level: 65, color: 'bg-amber-500' },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-white/60">{skill.label}</span>
                      <span className="text-indigo-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={cn("h-full rounded-full", skill.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Achievements & Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'All-Time Focus', value: '482h', icon: Clock, color: 'text-indigo-400' },
                { label: 'Total Sessions', value: '156', icon: Target, color: 'text-purple-400' },
                { label: 'Max Streak', value: '24 Days', icon: Flame, color: 'text-orange-500' },
              ].map((stat, i) => (
                <div key={stat.label} className="glass p-6 rounded-[2rem] flex flex-col items-center text-center">
                  <div className={cn("p-3 rounded-2xl bg-white/5 mb-4", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">{stat.label}</div>
                </div>
              ))}
            </div>

            <section className="glass p-8 rounded-[2.5rem]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20">Unlocked Achievements</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Flow State', desc: '4h Deep Work', icon: Zap, color: 'bg-indigo-500/20 text-indigo-400' },
                  { name: 'Night Owl', desc: 'Focus @ 2 AM', icon: Star, color: 'bg-purple-500/20 text-purple-400' },
                  { name: 'Unstoppable', desc: '14 Day Streak', icon: Flame, color: 'bg-orange-500/20 text-orange-500' },
                  { name: 'Grandmaster', desc: '100 Sessions', icon: Trophy, color: 'bg-emerald-500/20 text-emerald-400' },
                ].map((badge) => (
                  <div key={badge.name} className="flex flex-col items-center text-center group">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner", badge.color)}>
                      <badge.icon className="w-8 h-8" />
                    </div>
                    <div className="text-xs font-bold text-white/80">{badge.name}</div>
                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">{badge.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8">Recent Milestones</h3>
              <div className="space-y-6">
                {[
                  { title: 'Completed React 19 Integration', time: '2 hours ago', icon: Zap },
                  { title: 'Reached 10h focus goal this week', time: 'Yesterday', icon: Target },
                  { title: 'Unlocked "Flow State" badge', time: '2 days ago', icon: Trophy },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                      <item.icon className="w-5 h-5 text-white/30 group-hover:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white/80 truncate">{item.title}</div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.time}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
