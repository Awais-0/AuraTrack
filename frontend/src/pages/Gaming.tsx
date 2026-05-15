import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Trophy,
  Clock,
  Plus,
  Star,
  Search,
  MoreVertical,
  History,
  Activity,
  Sword,
  Target,
  Flame,
  LayoutGrid,
  Zap,
  Medal,
  Award,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/Button';
import { Modal } from '@/src/components/Modal';
import { Dropdown } from '@/src/components/Dropdown';

type GamePlatform = 'PC' | 'PS5' | 'Xbox' | 'Switch' | 'Mobile';
type GameStatus = 'playing' | 'backlog' | 'completed' | 'abandoned';
type AchievementRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

interface Achievement {
  id: string;
  title: string;
  game: string;
  rarity: AchievementRarity;
  earnedAt: string;
  icon: any;
}

interface GameItem {
  id: string;
  title: string;
  platform: GamePlatform;
  status: GameStatus;
  playtime: number;
  achievements: { completed: number; total: number };
  rating: number;
  coverImage: string;
  lastPlayed: string;
  genre: string;
}

const dummyAchievements: Achievement[] = [
  {
    id: 'a1',
    title: 'Elden Lord',
    game: 'Elden Ring',
    rarity: 'Legendary',
    earnedAt: '2 days ago',
    icon: Trophy,
  },
  {
    id: 'a2',
    title: 'Night City Legend',
    game: 'Cyberpunk 2077',
    rarity: 'Epic',
    earnedAt: '1 week ago',
    icon: Zap,
  },
  {
    id: 'a3',
    title: 'God of Death',
    game: 'Hades II',
    rarity: 'Rare',
    earnedAt: '5 hours ago',
    icon: Sword,
  },
  {
    id: 'a4',
    title: 'Perfect Clear',
    game: 'Valorant',
    rarity: 'Epic',
    earnedAt: 'Yesterday',
    icon: Target,
  },
];

const dummyGames: GameItem[] = [
  {
    id: '1',
    title: 'Elden Ring',
    platform: 'PC',
    status: 'playing',
    playtime: 145,
    achievements: { completed: 35, total: 42 },
    rating: 10.0,
    coverImage: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop',
    lastPlayed: '2 hours ago',
    genre: 'Action RPG'
  },
  {
    id: '2',
    title: 'Cyberpunk 2077',
    platform: 'PC',
    status: 'completed',
    playtime: 85,
    achievements: { completed: 44, total: 44 },
    rating: 9.0,
    coverImage: 'https://images.unsplash.com/photo-1605898835373-02f74446e8ca?q=80&w=800&auto=format&fit=crop',
    lastPlayed: '1 month ago',
    genre: 'Open World RPG'
  },
  {
    id: '3',
    title: 'Hades II',
    platform: 'PC',
    status: 'playing',
    playtime: 24,
    achievements: { completed: 12, total: 55 },
    rating: 9.5,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    lastPlayed: 'Yesterday',
    genre: 'Roguelike'
  },
  {
    id: '4',
    title: 'Ghost of Tsushima',
    platform: 'PS5',
    status: 'backlog',
    playtime: 0,
    achievements: { completed: 0, total: 52 },
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=800&auto=format&fit=crop',
    lastPlayed: 'Planned',
    genre: 'Action-Adventure'
  },
  {
    id: '5',
    title: 'Valorant',
    platform: 'PC',
    status: 'playing',
    playtime: 420,
    achievements: { completed: 0, total: 0 },
    rating: 8.0,
    coverImage: 'https://images.unsplash.com/photo-1552824734-783689408665?q=80&w=800&auto=format&fit=crop',
    lastPlayed: '3 hours ago',
    genre: 'Tactical Shooter'
  }
];

const platformIcons: Record<GamePlatform, any> = {
  PC: Sword,
  PS5: Gamepad2,
  Xbox: Gamepad2,
  Switch: Gamepad2,
  Mobile: Activity
};

const rarityColors = {
  Common: 'text-white/40 bg-white/5 border-white/10',
  Rare: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  Epic: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Legendary: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
};

const statusColors = {
  playing: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  completed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  backlog: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  abandoned: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export function Gaming() {
  const [activeTab, setActiveTab] = useState<GameStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [simPlatform, setSimPlatform] = useState('PC');
  const [simStatus, setSimStatus] = useState('backlog');

  const tabs: { id: GameStatus | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Games', icon: LayoutGrid },
    { id: 'playing', label: 'In-Game', icon: Flame },
    { id: 'completed', label: 'Legacy', icon: Trophy },
    { id: 'backlog', label: 'Protocol', icon: Target },
  ];

  const filteredGames = dummyGames
    .filter(game => activeTab === 'all' || game.status === activeTab)
    .filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
              <span className="px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[9px] font-black text-rose-400 uppercase tracking-widest">Dimension Gaming</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white/90">Pulse Engine</h1>
            <p className="text-white/40 text-sm font-medium">Syncing execution states across your digital simulations</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-rose-400 transition-colors" />
              <input
                type="text"
                placeholder="Search simulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold w-40 focus:w-60 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all placeholder:text-white/10"
              />
            </div>
            <Button icon={Plus} size="sm" variant="primary" onClick={() => setIsModalOpen(true)} className="bg-rose-600 hover:bg-rose-500">
              New Init
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
            <MiniStat label="Library" value={dummyGames.length} color="text-indigo-400" />
            <MiniStat label="Runtime" value={dummyGames.filter(g => g.status === 'playing').length} color="text-rose-400" />
            <MiniStat label="Achieved" value={dummyGames.filter(g => g.status === 'completed').length} color="text-emerald-400" />
          </div>
        </div>

        {/* Recent Achievements Row */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-rose-400" />
              Recent Accomplishments
            </h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors flex items-center gap-1">
              Hall of Fame <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {dummyAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ y: -2 }}
                className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 group"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 shadow-lg backdrop-blur-md",
                  rarityColors[achievement.rarity]
                )}>
                  <achievement.icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black tracking-tight truncate group-hover:text-white transition-colors">{achievement.title}</div>
                  <div className="text-[9px] font-bold text-white/30 uppercase tracking-wider truncate mb-1">{achievement.game}</div>
                  <div className={cn(
                    "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border-0 w-fit",
                    rarityColors[achievement.rarity]
                  )}>
                    {achievement.rarity}
                  </div>
                </div>
                <div className="ml-auto text-[8px] font-bold text-white/10 uppercase tracking-widest whitespace-nowrap hidden group-hover:block transition-all italic">
                  {achievement.earnedAt}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Games Grid Heading */}
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Active Simulations</h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, i) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group flex flex-col"
              >
                <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex flex-col h-full shadow-xl">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                    <div className="absolute top-2 right-2">
                      <div className="glass px-2 py-1 rounded-lg flex items-center gap-1 border-white/10 backdrop-blur-md">
                        <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] font-black">{game.rating || 'N/A'}</span>
                      </div>
                    </div>

                    <div className={cn(
                      "absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border backdrop-blur-md",
                      statusColors[game.status]
                    )}>
                      {game.status}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="mb-3">
                      <h3 className="text-sm font-bold tracking-tight line-clamp-1 group-hover:text-rose-400 transition-colors mb-1">
                        {game.title}
                      </h3>
                      <div className="flex items-center gap-1.5 opacity-30">
                        {React.createElement(platformIcons[game.platform], { className: "w-2.5 h-2.5" })}
                        <span className="text-[9px] font-bold uppercase tracking-wider">{game.platform} • {game.genre}</span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex justify-between items-end text-[9px] font-black uppercase tracking-wider">
                        <div className="text-white/40">
                          <span className="text-white/80">{game.playtime}</span>
                          <span className="ml-1">HRS</span>
                        </div>
                        {game.achievements.total > 0 && (
                          <div className="text-rose-400/80">
                            {Math.round((game.achievements.completed / game.achievements.total) * 100)}% CP
                          </div>
                        )}
                      </div>

                      {game.achievements.total > 0 && (
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(game.achievements.completed / game.achievements.total) * 100}%` }}
                            className="h-full bg-gradient-to-r from-rose-600 to-orange-500 rounded-full"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="text-[8px] font-bold flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {game.lastPlayed}
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
              className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer group min-h-[300px]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-rose-500/10 transition-all">
                <Plus className="w-5 h-5 text-white/20 group-hover:text-rose-400" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40">Initialize</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Simulation Protocol"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Title</label>
              <input
                type="text"
                placeholder="Ex: Sekiro, Doom Eternal..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-rose-500/50 outline-none transition-all placeholder:text-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Dropdown
                label="Platform"
                value={simPlatform}
                onChange={setSimPlatform}
                options={[
                  { label: 'PC', value: 'PC', icon: Sword },
                  { label: 'PS5', value: 'PS5', icon: Gamepad2 },
                  { label: 'Xbox', value: 'Xbox', icon: Gamepad2 },
                  { label: 'Switch', value: 'Switch', icon: Gamepad2 },
                ]}
              />
              <Dropdown
                label="Status"
                value={simStatus}
                onChange={setSimStatus}
                options={[
                  { label: 'Protocol (Backlog)', value: 'backlog', icon: Target },
                  { label: 'Execution (Active)', value: 'playing', icon: Flame },
                  { label: 'Archive (Finished)', value: 'completed', icon: Trophy },
                ]}
              />
            </div>

            <div className="pt-4 flex gap-2">
              <Button variant="ghost" className="flex-1 h-11 rounded-xl font-bold" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1 h-11 rounded-xl font-black uppercase tracking-widest text-[10px] bg-rose-600">Sync Simulation</Button>
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
