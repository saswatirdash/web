import * as React from "react";
import { Sun, ArrowRight, Zap, IndianRupee, Leaf } from "lucide-react";
import { CAMPUS_DATA, TARIFF } from "@/src/constants";
import { motion } from "motion/react";

export function SolarSavingsSummary() {
  const solarBuildings = CAMPUS_DATA.filter(b => b.solarCandidate);
  const totalDailyCandidateKwh = solarBuildings.reduce((sum, b) => sum + b.avgDailyKwh, 0);
  
  // Assume 50% offset from solar installation for these buildings
  const solarOffsetPercentage = 0.5;
  const annualKwhSaved = totalDailyCandidateKwh * solarOffsetPercentage * 365;
  const annualRupeeSaved = annualKwhSaved * TARIFF;
  const carbonOffset = annualKwhSaved * 0.82;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
            <Sun className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100">Solar Potential Analysis</h2>
            <p className="text-zinc-400 mt-1">Harnessing solar energy for high-capacity buildings (Galleria & Hostels)</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-amber-500/70 font-bold uppercase">Estimated Solar Offset</p>
            <p className="text-2xl font-black text-amber-500">50% Capacity</p>
          </div>
          <div className="h-10 w-[1px] bg-zinc-800 hidden sm:block" />
          <div className="flex -space-x-2">
            {solarBuildings.map((b, i) => (
              <div 
                key={b.name}
                title={b.name}
                className="h-8 w-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400"
                style={{ zIndex: 10 - i }}
              >
                {b.name[0]}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 mt-8 sm:grid-cols-3">
        <div className="rounded-xl bg-zinc-950/50 p-6 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-zinc-400">Annual Savings</span>
          </div>
          <p className="text-3xl font-bold text-white">₹{(annualRupeeSaved / 100000).toFixed(1)}L</p>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Projected cost reduction</p>
        </div>

        <div className="rounded-xl bg-zinc-950/50 p-6 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-zinc-400">Energy Generation</span>
          </div>
          <p className="text-3xl font-bold text-white">{Math.round(annualKwhSaved / 1000).toLocaleString()}k</p>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">kWh clean energy annually</p>
        </div>

        <div className="rounded-xl bg-zinc-950/50 p-6 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-zinc-400">Carbon Offset</span>
          </div>
          <p className="text-3xl font-bold text-white">{Math.round(carbonOffset / 1000).toLocaleString()}t</p>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Tons CO₂ equivalent avoided</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <p className="text-xs text-amber-200/80 font-medium">ROI expected in 3.4 years with current government subsidies.</p>
        </div>
        <button className="text-xs font-bold text-amber-500 flex items-center gap-1 hover:gap-2 transition-all">
          VIEW SOLAR BLUEPRINT <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}
