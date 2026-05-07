import * as React from "react";
import { motion } from "motion/react";
import { TrendingDown } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  icon: any;
  color: string;
  bg: string;
  trend: string;
  trendUp: boolean;
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
            <div className={`rounded-xl ${stat.bg} p-3`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${stat.trendUp ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
              <TrendingDown className={`h-3 w-3 ${stat.trendUp ? 'rotate-180' : ''}`} />
              {stat.trend}
            </div>
            <span className="text-[10px] text-zinc-500">vs last week</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
