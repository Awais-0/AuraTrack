import React from 'react';
import { BentoCard } from '@/src/components/BentoCard';
import { Wallet, TrendingUp, TrendingDown, CreditCard, PieChart } from 'lucide-react';

export function Finance() {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Financial Manager</h1>
        <p className="text-white/40 font-medium">Tracking your wealth, expenses, and digital assets</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BentoCard className="rainbow-border">
          <div className="flex items-center gap-4 text-emerald-400 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="font-bold uppercase tracking-widest text-[10px]">Total Balance</span>
          </div>
          <div className="text-4xl font-black">$12,450.00</div>
          <div className="text-xs text-emerald-400 font-bold mt-2">+2.4% this month</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-rose-400 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
            <span className="font-bold uppercase tracking-widest text-[10px]">Expenses</span>
          </div>
          <div className="text-4xl font-black">$3,120.50</div>
          <div className="text-xs text-rose-400 font-bold mt-2">15% of budget used</div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-4 text-indigo-400 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="font-bold uppercase tracking-widest text-[10px]">Active Debts</span>
          </div>
          <div className="text-4xl font-black">$1,200.00</div>
          <div className="text-xs text-indigo-400 font-bold mt-2">2 payments pending</div>
        </BentoCard>
      </div>

      <BentoCard className="h-64 flex items-center justify-center border-dashed border-white/10 bg-transparent">
        <div className="text-center">
          <PieChart className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Transaction History Module Coming Soon</p>
        </div>
      </BentoCard>
    </div>
  );
}
