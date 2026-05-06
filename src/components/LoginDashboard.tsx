import * as React from "react";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, LogIn } from "lucide-react";
import { motion } from "motion/react";

export function LoginDashboard() {
  const { login } = useAuth();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <Zap className="h-6 w-6 text-zinc-950" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">Welcome to GreenPulse</CardTitle>
            <CardDescription className="text-zinc-400">
              NIST University Campus Energy Intelligence Platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-emerald-500/5 p-4 text-center text-sm text-emerald-400/80">
              Sign in with your university Gmail account to access the dashboard and AI assistant.
            </div>
            <Button
              onClick={login}
              className="w-full bg-emerald-600 py-6 text-lg font-semibold hover:bg-emerald-500"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Login with Google
            </Button>
            <p className="text-center text-[10px] text-zinc-500 uppercase tracking-widest">
              Powered by Google Gemini
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
