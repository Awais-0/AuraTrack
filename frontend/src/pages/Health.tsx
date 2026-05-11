import React from 'react';
import { BentoCard } from '@/src/components/BentoCard';
import { HeartPulse, Activity, Zap, Utensils, Moon } from 'lucide-react';

export function Health() {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Physical Health</h1>
        <p className="text-white/40 font-medium">Monitoring your vitals, nutrition, and exercise</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BentoCard className="rainbow-border">
          <div className="flex items-center gap-4 text-rose-500 mb-4">
            <HeartPulse className="w-6 h-6 animate-pulse-subtle" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Heart Rate</span>
          </div>
          <div className="text-4xl font-black">72 BPM</div>
          <div className="text-xs text-white/30 font-bold mt-2">Resting state</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-indigo-400 mb-4">
            <Activity className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Steps</span>
          </div>
          <div className="text-4xl font-black">8,420</div>
          <div className="text-xs text-white/30 font-bold mt-2">Goal: 10,000</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-orange-400 mb-4">
            <Utensils className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Calories</span>
          </div>
          <div className="text-4xl font-black">1,850</div>
          <div className="text-xs text-white/30 font-bold mt-2">Kcal consumed</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-purple-400 mb-4">
            <Moon className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Sleep</span>
          </div>
          <div className="text-4xl font-black">7h 12m</div>
          <div className="text-xs text-white/30 font-bold mt-2">Quality: 84%</div>
        </BentoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BentoCard className="h-48 flex items-center justify-center border-dashed border-white/10 bg-transparent">
          <p className="text-white/20 font-bold uppercase tracking-widest text-xs text-center">Gym & Workout Logs Coming Soon</p>
        </BentoCard>
        <BentoCard className="h-48 flex items-center justify-center border-dashed border-white/10 bg-transparent">
          <p className="text-white/20 font-bold uppercase tracking-widest text-xs text-center">Illness & Medical History Coming Soon</p>
        </BentoCard>
      </div>
    </div>
  );
}
