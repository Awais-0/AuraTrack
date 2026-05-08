import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Plus, 
  Flag, 
  TrendingUp, 
  Zap, 
  Clock, 
  CheckCircle2,
  Calendar,
  MoreVertical,
  ChevronRight,
  Trophy,
  Flame
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/Button';
import { SearchBar } from '@/src/components/SearchBar';
import { Modal } from '@/src/components/Modal';

interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  deadline: string;
  tasks: { completed: number; total: number };
  priority: 'high' | 'medium' | 'low';
  color: string;
}

const goals: Goal[] = [
  {
    id: '1',
    title: 'Master React 19 Features',
    category: 'Learning',
    progress: 75,
    deadline: 'May 15, 2026',
    tasks: { completed: 12, total: 16 },
    priority: 'high',
    color: 'indigo',
  },
  {
    id: '2',
    title: 'Complete AuraTrack MVP',
    category: 'Project',
    progress: 45,
    deadline: 'May 20, 2026',
    tasks: { completed: 8, total: 18 },
    priority: 'high',
    color: 'purple',
  },
  {
    id: '3',
    title: 'Read "Deep Work"',
    category: 'Growth',
    progress: 20,
    deadline: 'May 30, 2026',
    tasks: { completed: 2, total: 10 },
    priority: 'medium',
    color: 'emerald',
  },
  {
    id: '4',
    title: 'Daily 2h Focus Blocks',
    category: 'Habit',
    progress: 90,
    deadline: 'Recurring',
    tasks: { completed: 27, total: 30 },
    priority: 'medium',
    color: 'orange',
  },
];

const priorityColors = {
  high: 'text-red-400 bg-red-400/10',
  medium: 'text-amber-400 bg-amber-400/10',
  low: 'text-blue-400 bg-blue-400/10',
};

const bgColors = {
  indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/20',
};

const accentColors = {
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  emerald: 'bg-emerald-500',
  orange: 'bg-orange-500',
};

export function Goals() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Target & Milestones</h1>
            <p className="text-white/40 font-medium italic">Architecting your future, one focus block at a time</p>
          </div>
          
          <div className="flex items-center gap-3">
            <SearchBar placeholder="Search goals..." className="w-40" />
            <Button icon={Plus} onClick={() => setIsModalOpen(true)}>
              New Goal
            </Button>
          </div>
        </header>

        {/* New Goal Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Create New Objective"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Goal Title</label>
              <input 
                type="text" 
                placeholder="What do you want to achieve?" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-white/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Category</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer">
                  <option value="learning">Learning</option>
                  <option value="project">Project</option>
                  <option value="growth">Growth</option>
                  <option value="habit">Habit</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Priority</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer">
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Deadline</label>
              <input 
                type="date" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1" icon={Flag}>Establish Goal</Button>
            </div>
          </div>
        </Modal>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Active Goals', value: '4', icon: Target, color: 'text-indigo-400', desc: 'Working towards excellence' },
            { label: 'Completion Rate', value: '82%', icon: Trophy, color: 'text-amber-400', desc: 'Last 30 days performance' },
            { label: 'Current Streak', value: '12 Days', icon: Flame, color: 'text-orange-500', desc: 'Deep work consistency' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-[2.5rem] relative overflow-hidden group"
            >
              <div className="flex gap-5 items-start relative z-10">
                <div className={cn("p-4 rounded-2xl bg-white/5", stat.color)}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black tracking-tight mb-2">{stat.value}</h3>
                  <p className="text-xs text-white/40 font-medium">{stat.desc}</p>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Goals List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/20">Current Objectives</h2>
            <div className="flex items-center gap-4">
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">View Completed</button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass p-6 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group border border-white/5 hover:border-white/10"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-2xl", bgColors[goal.color as keyof typeof bgColors])}>
                      <Flag className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-indigo-400 transition-colors">{goal.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{goal.category}</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md", priorityColors[goal.priority])}>
                          {goal.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/20 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2 text-sm font-bold text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      {goal.tasks.completed}/{goal.tasks.total} Milestones
                    </div>
                    <div className="text-2xl font-black italic">{goal.progress}%</div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1.5, delay: 0.6 + i * 0.1, ease: "circOut" }}
                      className={cn("h-full rounded-full relative", accentColors[goal.color as keyof typeof accentColors])}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-white/30">
                      <Calendar className="w-3.5 h-3.5" />
                      Due {goal.deadline}
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 group/btn">
                      Details
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add Goal Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-12 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-white/20 group-hover:text-white/50 transition-colors" />
              </div>
              <p className="text-sm font-bold text-white/20 group-hover:text-white/40 transition-colors">Create another milestone</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
