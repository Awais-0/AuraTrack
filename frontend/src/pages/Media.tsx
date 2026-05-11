import React from 'react';
import { BentoCard } from '@/src/components/BentoCard';
import { Film, PlayCircle, Tv, BookOpen, Layers } from 'lucide-react';

export function Media() {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Media Tracker</h1>
        <p className="text-white/40 font-medium">Tracking your progress in movies, anime, manga, and TV shows</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BentoCard className="rainbow-border">
          <div className="flex items-center gap-4 text-indigo-400 mb-4">
            <Film className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Movies</span>
          </div>
          <div className="text-4xl font-black">14</div>
          <div className="text-xs text-white/30 font-bold mt-2">Watched this year</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-purple-400 mb-4">
            <PlayCircle className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Anime</span>
          </div>
          <div className="text-4xl font-black">240</div>
          <div className="text-xs text-white/30 font-bold mt-2">Episodes completed</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-emerald-400 mb-4">
            <BookOpen className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Manga</span>
          </div>
          <div className="text-4xl font-black">1,420</div>
          <div className="text-xs text-white/30 font-bold mt-2">Chapters read</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-rose-400 mb-4">
            <Tv className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-[10px]">TV Shows</span>
          </div>
          <div className="text-4xl font-black">12</div>
          <div className="text-xs text-white/30 font-bold mt-2">Series in progress</div>
        </BentoCard>
      </div>

      <BentoCard className="h-64 flex items-center justify-center border-dashed border-white/10 bg-transparent">
        <div className="text-center">
          <Layers className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Media Library & Progress Bars Coming Soon</p>
        </div>
      </BentoCard>
    </div>
  );
}
