import React from 'react';
import { BentoCard } from '@/src/components/BentoCard';
import { Gamepad2, Trophy, Clock, Sword, Target } from 'lucide-react';

export function Gaming() {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Gaming Tracker</h1>
        <p className="text-white/40 font-medium">Monitoring your performance and progress in all games</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <BentoCard className="rainbow-border">
          <div className="flex items-center gap-4 text-purple-400 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <span className="font-bold uppercase tracking-widest text-[10px]">Active Game</span>
          </div>
          <div className="text-2xl font-black mb-1">Elden Ring</div>
          <div className="text-xs text-purple-400 font-bold">Shadow of the Erdtree</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-yellow-400 mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="font-bold uppercase tracking-widest text-[10px]">Achievements</span>
          </div>
          <div className="text-4xl font-black">42 / 50</div>
          <div className="text-xs text-white/30 font-bold mt-2">84% Completion</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-indigo-400 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <span className="font-bold uppercase tracking-widest text-[10px]">Session Time</span>
          </div>
          <div className="text-4xl font-black">2h 15m</div>
          <div className="text-xs text-indigo-400 font-bold mt-2">Current session</div>
        </BentoCard>
      </div>

      <div className="space-y-6">
        <h2 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Recent Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Valorant', genre: 'Competitive FPS', status: 'Online' },
            { name: 'Chess', genre: 'Physical/Online', status: 'In Progress' },
          ].map((game) => (
            <BentoCard key={game.name} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                  <Sword className="w-6 h-6 text-white/20" />
                </div>
                <div>
                  <div className="font-bold">{game.name}</div>
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{game.genre}</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                {game.status}
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </div>
  );
}
