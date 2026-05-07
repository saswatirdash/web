import * as React from "react";
import { Menu, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function DashboardHeader({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-zinc-400 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold capitalize text-white">
            {activeTab.replace("-", " ")}
          </h1>
        </div>

        {activeTab === "buildings" && (
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search buildings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 border-zinc-800 bg-zinc-900/50 pl-9 text-sm focus:ring-emerald-500/20"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 w-36 border-zinc-800 bg-zinc-900/50 text-xs">
                <div className="flex items-center gap-2">
                  <Filter className="h-3 w-3" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent className="border-zinc-800 bg-zinc-900 text-zinc-300">
                <SelectItem value="rank">Rank</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="consumption">Consumption</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </header>
  );
}
