import * as React from "react";
import { TreePine, Car, Smartphone, Wind, Leaf } from "lucide-react";
import { motion } from "motion/react";

interface SustainabilityImpactProps {
  annualKwhSaved: number;
}

export function SustainabilityImpact({ annualKwhSaved }: SustainabilityImpactProps) {
  const co2Saved = annualKwhSaved * 0.82; // kg CO2
  
  const impacts = [
    {
      label: "Trees Planted",
      value: Math.round(co2Saved / 20), // 1 tree absorbes ~20kg/year
      icon: TreePine,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      description: "Equivalent CO₂ absorption of mature trees per year"
    },
    {
      label: "Cars Removed",
      value: (co2Saved / 4600).toFixed(1), // 1 car emits ~4600kg/year
      icon: Car,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      description: "Average passenger vehicles off the road for one year"
    },
    {
      label: "Phone Charges",
      value: (annualKwhSaved / 0.005).toLocaleString(), // 1 charge is ~0.005 kWh
      icon: Smartphone,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      description: "Number of smartphones that could be powered for a year"
    },
    {
      label: "Clean Energy",
      value: `${(annualKwhSaved / 2000).toFixed(1)} homes`, // 1 home uses ~2000kWh clean potential
      icon: Wind,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      description: "Approximate residential energy offset potential"
    }
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Leaf className="h-6 w-6 text-emerald-500" />
          <div>
            <h2 className="text-2xl font-bold">Sustainability Impact</h2>
            <p className="text-sm text-zinc-500">Visualizing the real-world effect of 52.5k kWh annual savings</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {impacts.map((impact, i) => (
          <motion.div
            key={impact.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex flex-col items-center text-center p-6 rounded-xl bg-zinc-950/50 border border-zinc-800 hover:border-emerald-500/30 transition-all"
          >
            <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${impact.bg} group-hover:scale-110 transition-transform`}>
              <impact.icon className={`h-8 w-8 ${impact.color}`} />
            </div>
            <h3 className="text-3xl font-black text-white mb-2">{impact.value}</h3>
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">{impact.label}</p>
            <p className="text-[10px] text-zinc-600 leading-tight">{impact.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
