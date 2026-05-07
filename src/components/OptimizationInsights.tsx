import * as React from "react";
import { Sparkles } from "lucide-react";

export function OptimizationInsights() {
  const insights = [
    {
      title: "AC Scheduling",
      desc: "Implementing strict AC timetables in Galleria and LHC could save up to ₹1,200 daily.",
      color: "text-emerald-400"
    },
    {
      title: "Atrium Audit",
      desc: "The Atrium shows 122 kWh/floor efficiency with minimal lighting. Immediate audit recommended for server loads.",
      color: "text-amber-400"
    },
    {
      title: "Solar Potential",
      desc: "Hostels account for 29.3% of campus load. Rooftop solar could offset 40% of this demand.",
      color: "text-blue-400"
    }
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-5 w-5 text-emerald-500" />
        <h2 className="text-xl font-bold">Optimization Insights</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className={`font-semibold ${insight.color}`}>{insight.title}</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {insight.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
