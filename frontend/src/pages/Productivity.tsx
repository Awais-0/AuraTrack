import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Clock, 
  Target, 
  Calendar, 
  BarChart3, 
  Monitor, 
  Code2, 
  Briefcase,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { BentoCard } from '@/src/components/BentoCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const productivityData = [
  { day: 'Mon', focus: 85, output: 65 },
  { day: 'Tue', focus: 72, output: 82 },
  { day: 'Wed', focus: 98, output: 91 },
  { day: 'Thu', focus: 65, output: 54 },
  { day: 'Fri', focus: 88, output: 78 },
  { day: 'Sat', focus: 45, output: 32 },
  { day: 'Sun', focus: 32, output: 21 },
];

export function Productivity() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions'>('overview');

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Work Productivity</h1>
          <p className="text-white/40 font-medium">Measuring your digital output and deep focus velocity</p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === 'overview' ? "bg-indigo-500 text-white shadow-lg" : "text-white/40 hover:text-white"
            )}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('sessions')}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === 'sessions' ? "bg-indigo-500 text-white shadow-lg" : "text-white/40 hover:text-white"
            )}
          >
            Live Sessions
          </button>
        </div>
      </header>

      {activeTab === 'overview' ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard className="rainbow-border">
              <div className="flex items-center gap-3 text-indigo-400 mb-4">
                <Zap className="w-5 h-5 fill-indigo-500/20" />
                <span className="font-bold uppercase tracking-widest text-[10px]">Productivity Score</span>
              </div>
              <div className="text-4xl font-black">84%</div>
              <div className="text-xs text-emerald-400 font-bold mt-2">+5% from last week</div>
            </BentoCard>

            <BentoCard>
              <div className="flex items-center gap-3 text-purple-400 mb-4">
                <Clock className="w-5 h-5" />
                <span className="font-bold uppercase tracking-widest text-[10px]">Deep Work Hours</span>
              </div>
              <div className="text-4xl font-black">32h 15m</div>
              <div className="text-xs text-white/30 font-bold mt-2">Target: 40h / week</div>
            </BentoCard>

            <BentoCard>
              <div className="flex items-center gap-3 text-yellow-500 mb-4">
                <Target className="w-5 h-5" />
                <span className="font-bold uppercase tracking-widest text-[10px]">Focus Quality</span>
              </div>
              <div className="text-4xl font-black">92 / 100</div>
              <div className="text-xs text-white/30 font-bold mt-2">Optimal range</div>
            </BentoCard>
          </div>

          <BentoCard className="h-80">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-lg">Output Velocity</span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-bold text-white/40">FOCUS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-white/40">OUTPUT</span>
                </div>
              </div>
            </div>
            <div className="h-full pb-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productivityData}>
                  <defs>
                    <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(5,5,5,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '16px',
                      fontSize: '12px'
                    }} 
                  />
                  <Area type="monotone" dataKey="focus" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorFocus)" />
                  <Area type="monotone" dataKey="output" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorOutput)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>
      ) : (
        <div className="space-y-4">
          {[
            { title: 'System Architecture', app: 'VS Code', time: '2h 15m', score: 94, category: 'coding' },
            { title: 'Stakeholder Sync', app: 'Zoom', time: '45m', score: 62, category: 'work' },
            { title: 'API Documentation', app: 'Notion', time: '1h 30m', score: 88, category: 'writing' },
          ].map((session, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all border border-white/5 hover:border-white/10"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-white/30 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{session.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-white/40 mt-1 font-medium">
                    <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> {session.app}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Focus</div>
                  <div className="text-2xl font-black text-indigo-400">{session.score}%</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                   <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
