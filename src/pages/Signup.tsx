import React from 'react';
import { motion } from 'motion/react';
import { Zap, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 mesh-gradient relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-subtle" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass p-10 rounded-[40px] relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl shadow-purple-500/20 mb-6 group cursor-pointer">
            <Zap className="text-white w-8 h-8 group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-2">Join Aura</h2>
          <p className="text-white/40 font-medium">Start tracking your digital velocity</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Ark"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
              <input 
                type="email" 
                placeholder="ark@aura.co"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-white/20"
              />
            </div>
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-4">
            Create Free Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-white/40 font-medium">
          Already a member? <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-bold">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
