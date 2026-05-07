import * as React from "react";
import { Toaster, toast } from "sonner";
import { CAMPUS_DATA, CAMPUS_TOTALS, TARIFF } from "@/src/constants";
import { BuildingCard } from "@/src/components/BuildingCard";
import { EnergyCharts } from "@/src/components/EnergyCharts";
import { GreenPulseAI } from "@/src/components/GreenPulseAI";
import { SustainabilityImpact } from "@/src/components/SustainabilityImpact";
import { SolarSavingsSummary } from "@/src/components/SolarSavingsSummary";
import { Sidebar } from "@/src/components/Sidebar";
import { DashboardHeader } from "@/src/components/DashboardHeader";
import { StatsGrid } from "@/src/components/StatsGrid";
import { OptimizationInsights } from "@/src/components/OptimizationInsights";
import { BuildingDirectory } from "@/src/components/BuildingDirectory";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthProvider, useAuth } from "@/src/components/AuthProvider";
import { LoginDashboard } from "@/src/components/LoginDashboard";
import {
  Zap,
  Leaf,
  IndianRupee,
  ChevronUp,
  MessageSquare,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

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

  const stats = [
    {
      label: "Daily Consumption",
      value: `${CAMPUS_TOTALS.dailyKwh.toLocaleString()} kWh`,
      icon: Zap,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: "+2.4%",
      trendUp: false,
    },
    {
      label: "Daily Cost",
      value: `₹${CAMPUS_TOTALS.dailyCost.toLocaleString()}`,
      icon: IndianRupee,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "-1.8%",
      trendUp: false,
    },
    {
      label: "Carbon Footprint",
      value: `${(CAMPUS_TOTALS.dailyKwh * 0.82).toFixed(1)} kg CO₂`,
      icon: Leaf,
      color: "text-emerald-600",
      bg: "bg-emerald-600/10",
      trend: "+0.5%",
      trendUp: true,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        logout={logout} 
      />

      <main 
        className="flex-1 flex flex-col transition-all duration-300 overflow-hidden"
        style={{ marginLeft: isSidebarOpen ? 260 : 80 }}
      >
        <DashboardHeader 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeTab={activeTab === 'ai' ? 'AI Assistant' : activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto"
        >
          <div className="mx-auto max-w-7xl p-8">
            {activeTab !== 'ai' && <StatsGrid stats={stats} />}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsContent value="overview" className="space-y-8">
                <EnergyCharts />
                <SustainabilityImpact annualKwhSaved={52500} />
                <SolarSavingsSummary />
                <OptimizationInsights />
              </TabsContent>

              <TabsContent value="buildings" className="space-y-8">
                <BuildingDirectory 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </TabsContent>

              <TabsContent value="ai" className="mt-0 h-full">
                <div className="max-w-5xl mx-auto h-[calc(100vh-200px)] pt-4 pb-8">
                  <GreenPulseAI />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Floating Buttons - Only show if not on AI tab */}
      {activeTab !== 'ai' && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
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
                <div className="h-[500px]">
                  <GreenPulseAI />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            onClick={() => setIsAiOpen(!isAiOpen)}
            size="icon"
            className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ring-2 ring-offset-2 ring-offset-[#09090b] ${
              isAiOpen 
                ? "bg-zinc-800 hover:bg-zinc-700 ring-zinc-700" 
                : "bg-emerald-600 hover:bg-emerald-500 ring-emerald-500/50"
            }`}
          >
            {isAiOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster theme="dark" position="top-right" richColors />
      <AppRouter />
    </AuthProvider>
  );
}

function AppRouter() {
  const { user } = useAuth();
  return user ? <DashboardContent /> : <LoginDashboard />;
}
