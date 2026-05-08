import React, { useState, useEffect } from 'react';
import { BentoCard } from '@/src/components/BentoCard';
import { fetchHealth } from '@/src/lib/api';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import {
  Clock,
  TrendingUp,
  Zap,
  Activity,
  MousePointer2,
  Monitor,
  Flame,
  Calendar
} from 'lucide-react';
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

const ResponsiveGridLayout = WidthProvider(Responsive);

const activityData = [
  { time: '08:00', value: 30 },
  { time: '09:00', value: 45 },
  { time: '10:00', value: 85 },
  { time: '11:00', value: 65 },
  { time: '12:00', value: 40 },
  { time: '13:00', value: 35 },
  { time: '14:00', value: 95 },
  { time: '15:00', value: 75 },
  { time: '16:00', value: 60 },
];

const weeklyData = [
  { day: 'Mon', hours: 6.5 },
  { day: 'Tue', hours: 8.2 },
  { day: 'Wed', hours: 7.8 },
  { day: 'Thu', hours: 9.1 },
  { day: 'Fri', hours: 5.4 },
  { day: 'Sat', hours: 3.2 },
  { day: 'Sun', hours: 2.1 },
];

const initialLayouts = {
  lg: [
    { i: 'focus', x: 0, y: 0, w: 2, h: 2 },
    { i: 'velocity', x: 2, y: 0, w: 2, h: 2 },
    { i: 'streak', x: 4, y: 0, w: 1, h: 1 },
    { i: 'productivity', x: 5, y: 0, w: 1, h: 1 },
    { i: 'apps', x: 4, y: 1, w: 2, h: 1 },
    { i: 'deep-work', x: 0, y: 2, w: 4, h: 2 },
  ],
  md: [
    { i: 'focus', x: 0, y: 0, w: 2, h: 2 },
    { i: 'velocity', x: 2, y: 0, w: 2, h: 2 },
    { i: 'streak', x: 0, y: 2, w: 2, h: 1 },
    { i: 'productivity', x: 2, y: 2, w: 2, h: 1 },
    { i: 'apps', x: 0, y: 3, w: 4, h: 1 },
    { i: 'deep-work', x: 0, y: 4, w: 4, h: 2 },
  ],
};

export function Dashboard() {
  const [layouts, setLayouts] = useState(initialLayouts);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await fetchHealth();
        setApiStatus('online');
      } catch (error) {
        setApiStatus('offline');
      }
    };
    checkStatus();
  }, []);

  const onLayoutChange = (currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
      <header className="p-8 pb-0">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Workspace Analytics</h1>
            <p className="text-white/40 font-medium">Tracking your digital flow across all devices</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`glass px-4 py-2 rounded-2xl flex items-center gap-3 cursor-default border ${apiStatus === 'online' ? 'border-emerald-500/50' : 'border-rose-500/50'}`}>
              <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : apiStatus === 'offline' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' : 'bg-white/20 animate-pulse'}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                API: {apiStatus}
              </span>
            </div>
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3 cursor-default">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-semibold">May 4, 2026</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-8 overflow-x-hidden">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 }}
          rowHeight={120}
          draggableHandle=".cursor-grab"
          onLayoutChange={onLayoutChange}
          margin={[16, 16]}
          useCSSTransforms={true}
        >
          {/* Main Focus Stats */}
          <div key="focus">
            <BentoCard delay={0.1} className="rainbow-border">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-indigo-400">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-[10px]">Today's Focus</span>
                </div>
                <div>
                  <div className="text-5xl font-black tracking-tighter truncate">06h 42m</div>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mt-2">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    <span className="truncate">+12.5% vs yest.</span>
                  </div>
                </div>
              </div>
              <div className="h-16 mt-4 opacity-50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </BentoCard>
          </div>

          <div key="velocity">
            <BentoCard delay={0.2}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3 text-purple-400">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-[10px]">Weekly Flow</span>
                </div>
                <div className="glass px-2 py-1 rounded-full text-[8px] font-bold">LIVE</div>
              </div>
              <div className="flex-1 h-full min-h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                      {weeklyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 3 ? '#a855f7' : 'rgba(168, 85, 247, 0.1)'}
                          className="transition-all duration-300"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </BentoCard>
          </div>

          <div key="streak">
            <BentoCard delay={0.3}>
              <div className="flex items-center justify-center h-full flex-col gap-2">
                <Flame className="w-8 h-8 text-orange-500 animate-pulse-subtle" />
                <div className="text-2xl font-bold">12 Days</div>
                <div className="text-[10px] text-white/30 font-bold uppercase">Streak</div>
              </div>
            </BentoCard>
          </div>

          <div key="productivity">
            <BentoCard delay={0.4}>
              <div className="flex items-center justify-center h-full flex-col gap-2">
                <MousePointer2 className="w-8 h-8 text-emerald-400" />
                <div className="text-2xl font-bold">84%</div>
                <div className="text-[10px] text-white/30 font-bold uppercase">Productivity</div>
              </div>
            </BentoCard>
          </div>

          <div key="apps">
            <BentoCard delay={0.5}>
              <div className="flex items-center gap-4 h-full">
                <div className="w-12 h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Monitor className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-bold truncate">Visual Studio Code</div>
                  <div className="text-xs text-white/40 truncate">Active for 3h 12m</div>
                </div>
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Active</div>
            </BentoCard>
          </div>

          <div key="deep-work">
            <BentoCard delay={0.6}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span className="font-bold text-lg">Work Distribution</span>
                </div>
              </div>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(5, 5, 5, 0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        fontSize: '12px'
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#a855f7"
                      strokeWidth={3}
                      fill="url(#colorValueP)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </BentoCard>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
