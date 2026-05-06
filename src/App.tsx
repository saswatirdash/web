import * as React from "react";
import { Toaster, toast } from "sonner";
import { CAMPUS_DATA, CAMPUS_TOTALS, TARIFF } from "@/src/constants";
import { BuildingCard } from "@/src/components/BuildingCard";
import { EnergyCharts } from "@/src/components/EnergyCharts";
import { GreenPulseAI } from "@/src/components/GreenPulseAI";
import { SustainabilityImpact } from "@/src/components/SustainabilityImpact";
import { SolarSavingsSummary } from "@/src/components/SolarSavingsSummary";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/src/components/AuthProvider";
import { LoginDashboard } from "@/src/components/LoginDashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import {
  LayoutDashboard,
  Building2,
  Sparkles,
  Zap,
  TrendingDown,
  Leaf,
  IndianRupee,
  AlertCircle,
  Menu,
  X,
  LogOut,
  MessageSquare,
  ChevronUp,
  Search,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function DashboardContent() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isAiOpen, setIsAiOpen] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("rank");
  const { user, logout } = useAuth();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setShowScrollTop(target.scrollTop > 300);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    // Scroll behavior effect
  }, []);

  const stats = [
    {
      label: "Daily Consumption",
      value: `${CAMPUS_TOTALS.dailyKwh.toLocaleString()} kWh`,
      icon: Zap,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: "+2.4%",
      trendUp: false,
      data: [
        { value: 4420 }, { value: 4380 }, { value: 4510 }, { value: 4490 }, { value: 4400 }, { value: 4350 }, { value: 4370 }
      ]
    },
    {
      label: "Daily Cost",
      value: `₹${CAMPUS_TOTALS.dailyCost.toLocaleString()}`,
      icon: IndianRupee,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "-1.8%",
      trendUp: false,
      data: [
        { value: 35360 }, { value: 35000 }, { value: 36000 }, { value: 35800 }, { value: 35200 }, { value: 34800 }, { value: 34960 }
      ]
    },
    {
      label: "Carbon Footprint",
      value: `${(CAMPUS_TOTALS.dailyKwh * 0.82).toFixed(1)} kg CO₂`,
      icon: Leaf,
      color: "text-emerald-600",
      bg: "bg-emerald-600/10",
      trend: "+0.5%",
      trendUp: true,
      data: [
        { value: 3624 }, { value: 3591 }, { value: 3698 }, { value: 3681 }, { value: 3608 }, { value: 3567 }, { value: 3583 }
      ]
    },
  ];

  const filteredBuildings = CAMPUS_DATA.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "consumption") return b.avgDailyKwh - a.avgDailyKwh;
    return a.rankByConsumption - b.rankByConsumption;
  });

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="relative flex flex-col border-r border-zinc-800 bg-zinc-950/50"
      >
        <div className="flex h-16 items-center gap-3 px-6 border-b border-zinc-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
            <Zap className="h-5 w-5 text-zinc-950" />
          </div>
          <span className="text-lg font-bold tracking-tight">GreenPulse</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              activeTab === "overview" 
                ? "bg-emerald-500/10 text-emerald-500" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("buildings")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              activeTab === "buildings" 
                ? "bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            }`}
          >
            <Building2 className="h-4 w-4" />
            Buildings
          </button>
          <button 
            onClick={() => setActiveTab("ai")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              activeTab === "ai" 
                ? "bg-emerald-500/10 text-emerald-500" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            AI Assistant
          </button>
          <Separator className="my-4 bg-zinc-800" />
          <button 
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="rounded-xl bg-zinc-900 p-4">
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">NIST University</p>
            <p className="mt-1 text-xs text-zinc-400">Berhampur, Odisha</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-zinc-500">System Online</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950/50 px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-lg p-2 hover:bg-zinc-800"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="text-sm font-medium text-zinc-400">Campus Intelligence Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-zinc-700 bg-zinc-900 text-zinc-400">
              {user?.email}
            </Badge>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="h-8 w-8 rounded-full border border-zinc-700" referrerPolicy="no-referrer" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700" />
            )}
          </div>
        </header>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto"
        >
          <div className="mx-auto max-w-7xl p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`rounded-lg ${stat.bg} p-2`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold ${stat.trendUp ? 'text-red-500' : 'text-emerald-500'}`}>
                        {stat.trend}
                      </span>
                      <TrendingDown className={`h-3 w-3 ${stat.trendUp ? 'rotate-180 text-red-500' : 'text-emerald-500'}`} />
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-zinc-500">{stat.label}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <div className="h-10 w-24 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stat.data}>
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={stat.trendUp ? "#ef4444" : "#10b981"} 
                            strokeWidth={2} 
                            dot={false}
                            isAnimationActive={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsContent value="overview" className="space-y-8">
                <EnergyCharts />
                
                <SustainabilityImpact annualKwhSaved={52500} />

                <SolarSavingsSummary />
                
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-5 w-5 text-emerald-500" />
                    <h2 className="text-xl font-bold">Optimization Insights</h2>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-emerald-400">AC Scheduling</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Implementing strict AC timetables in Galleria and LHC could save up to ₹1,200 daily.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-400">Atrium Audit</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        The Atrium shows 122 kWh/floor efficiency with minimal lighting. Immediate audit recommended for server loads.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-400">Solar Potential</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Hostels account for 29.3% of campus load. Rooftop solar could offset 40% of this demand.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="buildings" className="space-y-8">
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
                      <div className="rounded-lg bg-emerald-600/10 p-4 border border-emerald-500/20 md:col-span-3 lg:col-span-1">
                        <p className="text-[10px] text-emerald-500 uppercase font-bold mb-1">Monthly Potential</p>
                        <p className="text-xl font-bold text-emerald-400">₹35,000 / mo</p>
                      </div>
                    </div>
                  </div>
                </div>

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

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBuildings.map((building) => (
                    <BuildingCard key={building.name} building={building} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ai">
                <div className="max-w-4xl mx-auto">
                  <GreenPulseAI />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <Toaster theme="dark" position="bottom-left" richColors />
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                onClick={scrollToTop}
                size="icon"
                variant="secondary"
                className="h-10 w-10 rounded-full bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-emerald-500 hover:bg-zinc-700 shadow-lg"
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
          {isAiOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-[400px] shadow-2xl shadow-emerald-500/10"
            >
              <GreenPulseAI />
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={() => setIsAiOpen(!isAiOpen)}
          size="icon"
          className={`h-14 w-14 rounded-full shadow-lg transition-all ${
            isAiOpen ? "bg-zinc-800 hover:bg-zinc-700" : "bg-emerald-600 hover:bg-emerald-500"
          }`}
        >
          {isAiOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

function AppRouter() {
  const { user } = useAuth();
  return user ? <DashboardContent /> : <LoginDashboard />;
}
