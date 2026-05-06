import * as React from "react";
import { CAMPUS_DATA } from "@/src/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

export function EnergyCharts() {
  const sortedByConsumption = [...CAMPUS_DATA].sort((a, b) => b.avgDailyKwh - a.avgDailyKwh);
  const sortedByEfficiency = [...CAMPUS_DATA].sort((a, b) => b.efficiency - a.efficiency);

  const COLORS = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5", "#ecfdf5"];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="mb-6 text-sm font-medium text-zinc-400 uppercase tracking-wider">Daily Consumption (kWh)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedByConsumption} layout="vertical" margin={{ left: 40, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
              <XAxis type="number" stroke="#71717a" fontSize={12} />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#71717a"
                fontSize={10}
                width={80}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46" }}
                itemStyle={{ color: "#10b981" }}
              />
              <Bar dataKey="avgDailyKwh" radius={[0, 4, 4, 0]}>
                {sortedByConsumption.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.anomaly ? "#ef4444" : "#10b981"}
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="mb-6 text-sm font-medium text-zinc-400 uppercase tracking-wider">Efficiency (kWh/Floor)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedByEfficiency} margin={{ bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#71717a"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke="#71717a" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46" }}
                itemStyle={{ color: "#34d399" }}
              />
              <Bar dataKey="efficiency" radius={[4, 4, 0, 0]}>
                {sortedByEfficiency.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.efficiency > 120 ? "#f59e0b" : "#34d399"}
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
