import * as React from "react";
import { 
  LayoutDashboard, 
  Building2, 
  Sparkles, 
  LogOut,
  Zap,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  logout: () => void;
}

export function Sidebar({ isOpen, activeTab, setActiveTab, user, logout }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "buildings", label: "Buildings", icon: Building2 },
    { id: "solar", label: "Solar Prediction", icon: Sparkles },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="fixed left-0 top-0 z-40 h-screen border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-xl transition-all duration-300"
    >
      <div className="flex h-full flex-col p-4">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-600/20">
            <Zap className="h-6 w-6 text-white" />
          </div>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold tracking-tight text-white"
            >
              Green Pulse
            </motion.span>
          )}
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                activeTab === item.id
                  ? "bg-emerald-600/10 text-emerald-500"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <Separator className="bg-zinc-800" />
          <div className={`flex items-center gap-3 px-2 ${!isOpen && "justify-center"}`}>
            <div className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 font-bold">
              {user?.email?.[0].toUpperCase() || "U"}
            </div>
            {isOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">{user?.email}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Administrator</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className={`w-full justify-start gap-3 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-500 ${
              !isOpen && "px-0 justify-center"
            }`}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}
