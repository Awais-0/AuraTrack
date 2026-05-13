import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Film,
  PlayCircle,
  Tv,
  BookOpen,
  Plus,
  Star,
  Clock,
  CheckCircle2,
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  History
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/Button';
import { Modal } from '@/src/components/Modal';

type MediaType = 'movie' | 'anime' | 'manga' | 'tv_show';
type MediaStatus = 'planning' | 'active' | 'completed' | 'paused';

interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  status: MediaStatus;
  currentProgress: number;
  totalUnits: number;
  rating: number;
  coverImage: string;
  genres: string[];
  lastUpdated: string;
}

const dummyMedia: MediaItem[] = [
  {
    id: '1',
    title: 'Inception',
    type: 'movie',
    status: 'completed',
    currentProgress: 1,
    totalUnits: 1,
    rating: 9.2,
    coverImage: 'https://image.tmdb.org/t/p/w500/edv5CZvfkjSfm9kfCSTCc0mEhiW.jpg',
    genres: ['Action', 'Sci-Fi'],
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    title: 'Cyberpunk Edgerunners',
    type: 'anime',
    status: 'completed',
    currentProgress: 10,
    totalUnits: 10,
    rating: 9.5,
    coverImage: 'https://image.tmdb.org/t/p/w500/799ByvS6I269O79XW7A9C967XlY.jpg',
    genres: ['Sci-Fi', 'Action'],
    lastUpdated: '1 week ago'
  },
  {
    id: '3',
    title: 'Vinland Saga',
    type: 'manga',
    status: 'active',
    currentProgress: 145,
    totalUnits: 210,
    rating: 10.0,
    coverImage: 'https://image.tmdb.org/t/p/w500/6v0K6qZ9yBw19G7vUvW1PZ2W3Y6.jpg',
    genres: ['Action', 'Drama', 'Historical'],
    lastUpdated: 'Today'
  },
  {
    id: '4',
    title: 'The Boys',
    type: 'tv_show',
    status: 'active',
    currentProgress: 4,
    totalUnits: 8,
    rating: 8.8,
    coverImage: 'https://image.tmdb.org/t/p/w500/7Ns9987mLIp9v63dyRf6ogXp93v.jpg',
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    lastUpdated: '3 days ago'
  },
  {
    id: '5',
    title: 'Jujutsu Kaisen',
    type: 'anime',
    status: 'active',
    currentProgress: 12,
    totalUnits: 24,
    rating: 8.5,
    coverImage: 'https://image.tmdb.org/t/p/w500/h9rKxlpk9784S6Yk6Xz7hYqWn.jpg',
    genres: ['Action', 'Supernatural'],
    lastUpdated: '12 hours ago'
  }
];

const typeIcons = {
  movie: Film,
  anime: PlayCircle,
  manga: BookOpen,
  tv_show: Tv
};

const statusColors = {
  active: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  completed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  planning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  paused: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export function Media() {
  const [activeTab, setActiveTab] = useState<MediaType | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: { id: MediaType | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All', icon: History },
    { id: 'movie', label: 'Movies', icon: Film },
    { id: 'anime', label: 'Anime', icon: PlayCircle },
    { id: 'manga', label: 'Manga', icon: BookOpen },
    { id: 'tv_show', label: 'TV Shows', icon: Tv },
  ];

  const filteredMedia = dummyMedia
    .filter(item => activeTab === 'all' || item.type === activeTab)
    .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto"
      >
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] font-black text-purple-400 uppercase tracking-widest">Dimension Media</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white/90">Pulse Library</h1>
            <p className="text-white/40 text-sm font-medium">Track your immersion across digital entertainment dimensions</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Quick search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold w-40 focus:w-60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/10"
              />
            </div>
            <Button icon={Plus} size="sm" variant="primary" onClick={() => setIsModalOpen(true)}>
              Track
            </Button>
          </div>
        </header>

        {/* Categories & Stats Row */}
        <div className="flex flex-col xl:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-1.5 p-1 glass rounded-xl w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-white/30 hover:text-white/60"
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
            <MiniStat label="Total" value={dummyMedia.length} color="text-indigo-400" />
            <MiniStat label="Active" value={dummyMedia.filter(m => m.status === 'active').length} color="text-emerald-400" />
            <MiniStat label="Done" value={dummyMedia.filter(m => m.status === 'completed').length} color="text-purple-400" />
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((media, i) => (
              <motion.div
                key={media.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group flex flex-col"
              >
                <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex flex-col h-full shadow-xl">
                  <div className="relative aspect-[3/3] overflow-hidden">
                    <img
                      src={media.coverImage}
                      alt={media.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute top-2 right-2">
                      <div className="glass px-2 py-1 rounded-lg flex items-center gap-1 border-white/10 backdrop-blur-md">
                        <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] font-black">{media.rating}</span>
                      </div>
                    </div>

                    <div className={cn(
                      "absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border backdrop-blur-md",
                      statusColors[media.status]
                    )}>
                      {media.status}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="mb-3">
                      <h3 className="text-sm font-bold tracking-tight line-clamp-1 group-hover:text-purple-400 transition-colors mb-1">
                        {media.title}
                      </h3>
                      <div className="flex items-center gap-1.5 opacity-30">
                        {React.createElement(typeIcons[media.type], { className: "w-2.5 h-2.5" })}
                        <span className="text-[9px] font-bold uppercase tracking-wider">{media.type.replace('_', ' ')}</span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex justify-between items-end text-[9px] font-black uppercase tracking-wider">
                        <div className="text-white/40">
                          <span className="text-white/80">{media.currentProgress}</span>
                          <span className="mx-1 text-white/10">/</span>
                          <span>{media.totalUnits}</span>
                        </div>
                        <div className="text-purple-400/80">{Math.round((media.currentProgress / media.totalUnits) * 100)}%</div>
                      </div>

                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(media.currentProgress / media.totalUnits) * 100}%` }}
                          className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="text-[8px] font-bold flex items-center gap-1">
                          <History className="w-2.5 h-2.5" />
                          {media.lastUpdated}
                        </div>
                        <button className="p-1 hover:bg-white/10 rounded-md transition-colors">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              layout
              onClick={() => setIsModalOpen(true)}
              className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer group min-h-[280px]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-purple-500/10 transition-all">
                <Plus className="w-5 h-5 text-white/20 group-hover:text-purple-400" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40">Add New</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Leisure Sync"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Title</label>
              <input
                type="text"
                placeholder="Ex: Berserk, Inception..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Type</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-purple-500/50 outline-none transition-all appearance-none cursor-pointer">
                  <option value="movie">Movie</option>
                  <option value="anime">Anime</option>
                  <option value="manga">Manga</option>
                  <option value="tv_show">TV Show</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Status</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-purple-500/50 outline-none transition-all appearance-none cursor-pointer">
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Button variant="ghost" className="flex-1 h-11 rounded-xl font-bold" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1 h-11 rounded-xl font-black uppercase tracking-widest text-[10px] bg-purple-600">Establish Sync</Button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </div>
  );
}

function MiniStat({ label, value, color }: any) {
  return (
    <div className="glass px-4 py-2 rounded-xl flex flex-col min-w-[80px]">
      <span className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">{label}</span>
      <span className={cn("text-lg font-black tracking-tight", color)}>{value}</span>
    </div>
  );
}
