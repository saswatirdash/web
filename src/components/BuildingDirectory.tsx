import * as React from "react";
import { motion } from "motion/react";
import { 
  Building2, 
  TrendingDown, 
  Zap, 
  Leaf, 
  AlertCircle,
  Sparkles,
  Search,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BuildingCard } from "@/src/components/BuildingCard";
import { CAMPUS_DATA } from "@/src/constants";

interface BuildingDirectoryProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function BuildingDirectory({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: BuildingDirectoryProps) {
  const filteredBuildings = CAMPUS_DATA.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "consumption") return b.avgDailyKwh - a.avgDailyKwh;
    return a.rankByConsumption - b.rankByConsumption;
  });

  return (
    <div className="space-y-8">
      {/* Optimization Methods Section */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-xl shadow-emerald-500/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingDown className="h-6 w-6 text-emerald-500" />
            <div>
              <h2 className="text-2xl font-bold">Cost-Effective Optimization Methods</h2>
              <p className="text-sm text-zinc-500">Actionable strategies to reduce campus energy expenditure</p>
            </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            Potential Savings: ₹4.2L / Year
          </Badge>
        </div>

        <div className="mb-6 flex items-center justify-end">
          <Button variant="outline" size="sm" className="text-xs border-zinc-700 hover:bg-zinc-800">
            <Sparkles className="mr-2 h-3 w-3 text-emerald-500" />
            Generate AI Report
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-xl bg-zinc-950 p-6 border border-zinc-800 hover:border-emerald-500/30 transition-all"
          >
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 text-emerald-500" />
            </div>
            <h4 className="text-lg font-bold text-zinc-100 mb-2">Smart Scheduling</h4>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">Align AC and lighting operations with real-time class timetables via IoT integration.</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-medium">Savings: 15-20%</span>
              <span className="text-zinc-500">Low Cost</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-xl bg-zinc-950 p-6 border border-zinc-800 hover:border-blue-500/30 transition-all"
          >
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Leaf className="h-5 w-5 text-blue-500" />
            </div>
            <h4 className="text-lg font-bold text-zinc-100 mb-2">LED Retrofitting</h4>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">Replace remaining 40W fluorescent tubes with 18W high-efficiency LED panels.</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-blue-400 font-medium">ROI: 14 Months</span>
              <span className="text-zinc-500">Medium Cost</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-xl bg-zinc-950 p-6 border border-zinc-800 hover:border-amber-500/30 transition-all"
          >
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <h4 className="text-lg font-bold text-zinc-100 mb-2">Occupancy Sensors</h4>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">Install PIR sensors in labs and restrooms to prevent idle energy waste during breaks.</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-400 font-medium">Waste Cut: 30%</span>
              <span className="text-zinc-500">Low Cost</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-xl bg-zinc-950 p-6 border border-zinc-800 hover:border-purple-500/30 transition-all"
          >
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <TrendingDown className="h-5 w-5 text-purple-500" />
            </div>
            <h4 className="text-lg font-bold text-zinc-100 mb-2">Standby Control</h4>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">Use smart power strips for computer labs to eliminate phantom loads at night.</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-400 font-medium">Daily Save: ₹450</span>
              <span className="text-zinc-500">Very Low Cost</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 grid gap-6 md:grid-cols-2">
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <span className="text-emerald-500 font-bold text-xs">01</span>
            </div>
            <div>
              <h5 className="font-bold text-zinc-200 mb-1">Phase 1: Behavioral Change</h5>
              <p className="text-xs text-zinc-500 leading-relaxed">Launch "Green Campus" awareness campaign to encourage students to turn off lights and fans when leaving classrooms.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <span className="text-blue-500 font-bold text-xs">02</span>
            </div>
            <div>
              <h5 className="font-bold text-zinc-200 mb-1">Phase 2: Infrastructure Upgrade</h5>
              <p className="text-xs text-zinc-500 leading-relaxed">Systematic replacement of old AC units with 5-star inverter models in high-usage blocks like Galleria.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800">
          <h5 className="font-bold text-zinc-200 mb-4 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-emerald-500" />
            Projected ROI Analysis (Annual)
          </h5>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-emerald-500/5 p-4 border border-emerald-500/10">
              <p className="text-[10px] text-emerald-500/70 uppercase font-bold mb-1">Total Investment</p>
              <p className="text-xl font-bold text-emerald-400">₹8.5L</p>
            </div>
            <div className="rounded-lg bg-blue-500/5 p-4 border border-blue-500/10">
              <p className="text-[10px] text-blue-500/70 uppercase font-bold mb-1">Annual Savings</p>
              <p className="text-xl font-bold text-blue-400">₹4.2L</p>
            </div>
            <div className="rounded-lg bg-amber-500/5 p-4 border border-amber-500/10">
              <p className="text-[10px] text-amber-500/70 uppercase font-bold mb-1">Payback Period</p>
              <p className="text-xl font-bold text-amber-400">2.0 Years</p>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-emerald-500" />
          <div>
            <h2 className="text-2xl font-bold">Building Directory</h2>
            <p className="text-sm text-zinc-500">Explore and compare individual building profiles</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search buildings..."
              className="pl-10 h-9 bg-zinc-900 border-zinc-800 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-500" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] h-9 bg-zinc-900 border-zinc-800 text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
                <SelectItem value="rank">Consumption Rank</SelectItem>
                <SelectItem value="consumption">Max Consumption</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Building Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBuildings.map((building) => (
          <BuildingCard key={building.name} building={building} />
        ))}
      </div>
    </div>
  );
}
