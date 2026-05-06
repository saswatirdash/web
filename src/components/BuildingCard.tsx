import * as React from "react";
import { BuildingData, TARIFF } from "@/src/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Building2, AlertTriangle, Sun, TrendingDown } from "lucide-react";

interface BuildingCardProps {
  building: BuildingData;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building }) => {
  const dailyCost = building.avgDailyKwh * TARIFF;
  const carbonImpact = building.avgDailyKwh * 0.82;

  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-900/50 text-zinc-100 transition-all hover:border-emerald-500/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-emerald-500" />
            {building.name}
          </div>
        </CardTitle>
        <div className="flex gap-1">
          {building.anomaly && (
            <Badge variant="destructive" className="h-5 px-1.5 text-[10px] uppercase tracking-wider">
              <AlertTriangle className="mr-1 h-3 w-3" />
              Anomaly
            </Badge>
          )}
          {building.solarCandidate && (
            <Badge variant="secondary" className="h-5 bg-amber-500/20 px-1.5 text-[10px] text-amber-500 uppercase tracking-wider">
              <Sun className="mr-1 h-3 w-3" />
              Solar
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-emerald-400">
              {building.avgDailyKwh} <span className="text-xs font-normal text-zinc-500">kWh/day</span>
            </div>
            <div className="text-xs text-zinc-500">
              Rank #{building.rankByConsumption}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-4">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Efficiency</p>
              <p className="text-sm font-semibold">{building.efficiency} <span className="text-[10px] font-normal text-zinc-500">kWh/floor</span></p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Daily Cost</p>
              <p className="text-sm font-semibold">₹{dailyCost.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Carbon Impact</p>
              <p className="text-sm font-semibold">{carbonImpact.toFixed(1)} <span className="text-[10px] font-normal text-zinc-500">kg CO₂</span></p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Assets</p>
              <p className="text-sm font-semibold">{building.acUnits} ACs | {building.computers} PCs</p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-500/5 p-2 text-[11px] text-emerald-400">
            <TrendingDown className="h-3 w-3" />
            <span>Potential savings: 12-18% through AC scheduling</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
