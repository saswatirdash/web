import * as React from "react";
import { GoogleGenAI } from "@google/genai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Bot, User, Sparkles, Loader2, Copy, Check, RefreshCw, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CAMPUS_CONTEXT = {
  buildings: [
    { name: "Galleria", floors: 5, classrooms: 18, labs: 6, acUnits: 35, lightsFans: 220, computers: 120, projectors: 20, avgDailyKwh: 520, efficiency: 104, rank: 4 },
    { name: "LHC", floors: 4, classrooms: 12, labs: 4, acUnits: 28, lightsFans: 180, computers: 90, projectors: 14, avgDailyKwh: 430, efficiency: 107.5, rank: 6 },
    { name: "Octagon", floors: 4, classrooms: 5, labs: 2, acUnits: 18, lightsFans: 120, computers: 80, projectors: 8, avgDailyKwh: 280, efficiency: 70, rank: 8 },
    { name: "Atrium", floors: 5, classrooms: 25, labs: 1, acUnits: 14, lightsFans: 26, computers: 150, projectors: 25, avgDailyKwh: 410, efficiency: 82, rank: 7 },
    { name: "TIFAC Building", floors: 4, classrooms: 4, labs: 7, acUnits: 22, lightsFans: 140, computers: 130, projectors: 6, avgDailyKwh: 390, efficiency: 97.5, rank: 8 },
    { name: "Research Block", floors: 5, classrooms: 6, labs: 10, acUnits: 30, lightsFans: 160, computers: 200, projectors: 8, avgDailyKwh: 450, efficiency: 90, rank: 5 },
    { name: "Library Block", floors: 3, classrooms: 3, labs: 1, acUnits: 16, lightsFans: 100, computers: 60, projectors: 4, avgDailyKwh: 210, efficiency: 70, rank: 10 },
    { name: "Boys Hostel", floors: 5, classrooms: 0, labs: 0, acUnits: 45, lightsFans: 320, computers: 180, projectors: 0, avgDailyKwh: 720, efficiency: 144, rank: 1 },
    { name: "Girls Hostel", floors: 5, classrooms: 0, labs: 0, acUnits: 35, lightsFans: 260, computers: 150, projectors: 0, avgDailyKwh: 620, efficiency: 124, rank: 2 },
    { name: "Workshop/Lab", floors: 2, classrooms: 2, labs: 6, acUnits: 10, lightsFans: 110, computers: 50, projectors: 2, avgDailyKwh: 240, efficiency: 120, rank: 9 },
    { name: "Indoor Sports", floors: 1, classrooms: 1, labs: 0, acUnits: 0, lightsFans: 4, computers: 1, projectors: 1, avgDailyKwh: 110, efficiency: 110, rank: 11 },
  ],
  totals: {
    dailyKwh: 4570,
    monthlyKwh: 137100,
    annualKwh: 1667550,
    tariff: 8,
    carbonFactor: 0.82
  }
};

const SYSTEM_PROMPT = `You are GreenPulse AI — the intelligent sustainability brain of NIST University's campus energy management system.
Your goal is to provide fast, accurate, and data-driven sustainability intelligence based on the provided campus dataset.

CAMPUS DATA CONTEXT (JSON):
${JSON.stringify(CAMPUS_CONTEXT, null, 2)}

CORE DIRECTIVES:
1. ACCURACY: Use the exact numbers from the JSON context. Campus average consumption is ~397.3 kWh/day (4,370 total / 11 buildings).
2. COMPARISON: When asked about a specific building, ALWAYS compare its consumption to the campus average (397.3 kWh). State if it is above or below average.
3. SPECIFIC OPTIMIZATION: For building queries, suggest ONE specific optimization strategy based on its profile (e.g., Galleria: AC scheduling, Hostels: Solar water heating).
4. SPEED & CONCISENESS: Lead with the most important finding. Use bullet points for details.
5. FINANCIAL IMPACT: Always provide ₹ INR savings and % potential for every recommendation.
6. CARBON IMPACT: Mention CO2 impact (0.82 kg/kWh) for consumption discussions.
7. TONE: Expert sustainability analyst. Professional, data-driven, and proactive.

RESPONSE STRUCTURE:
- Headline (Bold)
- Building Consumption vs. Campus Avg (397.3 kWh)
- Data Evidence (Brief)
- Actionable Recommendation (Suggest ONE specific strategy with ₹ and % impact)
- Carbon Impact (Brief)

NEVER:
- Fabricate data.
- Claim real-time monitoring (clarify it's static dataset analysis).
- Give vague advice without numbers.`;

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function GreenPulseAI() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am GreenPulse AI. I've analyzed NIST University's energy data. How can I help you optimize campus efficiency today?",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedBuilding, setSelectedBuilding] = React.useState<string>("");
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSend = async (customPrompt?: string) => {
    const messageText = customPrompt || input;
    if (!messageText.trim() || isLoading) return;

    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: messageText },
        { 
          role: "assistant", 
          content: "I'm sorry, but look's like the Gemini API key is missing. Please check your environment variables." 
        }
      ]);
      if (!customPrompt) setInput("");
      return;
    }

    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!customPrompt) setInput("");
    setIsLoading(true);

    // Add placeholder for streaming assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "", isStreaming: true }]);

    try {
      // Create a fresh instance for every request to avoid stale config
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      // Format history for the API - Mapping 'assistant' to 'model' as required by Gemini
      const history = messages
        .filter(m => m.content && !m.isStreaming)
        .map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        }));

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
        history: history,
      });

      const result = await chat.sendMessageStream({
        message: messageText,
      });

      let fullContent = "";
      for await (const chunk of result) {
        const text = chunk.text || "";
        fullContent += text;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "assistant") {
            last.content = fullContent;
          }
          return updated;
        });
      }

      // Mark streaming as finished
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === "assistant") {
          lastMessage.isStreaming = false;
        }
        return newMessages;
      });

    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      setMessages((prev) => {
        // Remove the empty streaming message if it exists
        const cleanedMessages = prev.filter(m => !m.isStreaming || m.content !== "");
        return [
          ...cleanedMessages,
          { 
            role: "assistant", 
            content: `I encountered an technical issue: ${errorMessage}. Please ensure the environment is correctly configured.` 
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuildingSelect = (name: string) => {
    setSelectedBuilding(name);
    const prompt = `Provide a detailed energy optimization report for ${name}, comparing it to campus averages and suggesting specific high-impact strategies tailored to its characteristics.`;
    handleSend(prompt);
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <Card className="flex h-full w-full flex-col border-zinc-800 bg-zinc-900 overflow-hidden">
      <CardHeader className="border-b border-zinc-800 bg-zinc-900 py-4 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-emerald-400">
          <Sparkles className="h-4 w-4" />
          GreenPulse AI Assistant
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select value={selectedBuilding} onValueChange={handleBuildingSelect}>
            <SelectTrigger className="w-[180px] h-8 text-xs bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Select Building" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
              {CAMPUS_CONTEXT.buildings.map((b) => (
                <SelectItem key={b.name} value={b.name} className="text-xs">
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-0 overflow-hidden">
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-4 custom-scrollbar"
        >
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="group relative flex max-w-[85%] flex-col gap-2">
                    <div
                      className={`flex gap-3 rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-800 text-zinc-100 border border-zinc-700/50"
                      }`}
                    >
                      <div className="mt-1 shrink-0">
                        {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-emerald-400" />}
                      </div>
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                        {msg.isStreaming && (
                          <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-emerald-400" />
                        )}
                      </div>
                    </div>
                    
                    {msg.role === "assistant" && msg.content && !msg.isStreaming && (
                      <div className="flex items-center gap-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => copyToClipboard(msg.content, i)}
                          className="text-[10px] text-zinc-500 hover:text-emerald-400 flex items-center gap-1"
                        >
                          {copiedIndex === i ? (
                            <>
                              <Check className="h-3 w-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && !messages[messages.length - 1]?.isStreaming && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="flex items-center gap-3 rounded-2xl bg-zinc-800 border border-zinc-700/30 px-4 py-3 text-sm text-zinc-400">
                  <RefreshCw className="h-3 w-3 animate-spin text-emerald-500" />
                  <span className="text-xs font-medium tracking-wide uppercase">Consulting Intelligence Core...</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="border-t border-zinc-800 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about building efficiency, solar potential, or anomalies..."
              className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-500"
            />
            <Button type="submit" size="icon" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-500">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
