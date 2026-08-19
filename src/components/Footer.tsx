"use client";

import { Shield, MessageSquare, Heart, ArrowUp, Sparkles, Terminal, Code2 } from "lucide-react";
import { soundManager } from "@/utils/audio";

interface FooterProps {
  onTriggerEasterEgg?: () => void;
}

export function Footer({ onTriggerEasterEgg }: FooterProps) {
  const scrollToTop = () => {
    soundManager.playCheckSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#05070B] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/[0.06]">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-base text-white tracking-wide font-['Plus_Jakarta_Sans']">
                HABITICA
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gamify your habits, to-dos, and life goals. Open-source, player-driven, and built for real habit transformation.
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open Source (GPL v3)
            </span>
          </div>

          {/* Col 2: System */}
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              The RPG System
            </span>
            <a href="#live-demo" className="hover:text-amber-300 transition-colors">
              Character Classes & Stats
            </a>
            <a href="#live-demo" className="hover:text-amber-300 transition-colors">
              Party Raids & Bosses
            </a>
            <a href="#why-it-works" className="hover:text-amber-300 transition-colors">
              Custom Gold Shop
            </a>
            <a href="#day-timeline" className="hover:text-amber-300 transition-colors">
              Day-in-the-Life Routine
            </a>
          </div>

          {/* Col 3: Community & Guilds */}
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              Guilds & Community
            </span>
            <a
              href="https://github.com/HabitRPG/habitica"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5" /> GitHub Repository
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Community Tavern
            </a>
            <a href="#comparison" className="hover:text-amber-300 transition-colors">
              Open API & Webhooks
            </a>
          </div>

          {/* Col 4: Easter Egg Hint */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              Secret Arcade Mode
            </span>
            <p className="text-xs text-slate-400">
              For keyboard warriors: press the Konami code anytime:
            </p>
            <div
              onClick={onTriggerEasterEgg}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 text-[11px] font-mono text-amber-300 text-center cursor-pointer transition-all hover:scale-[1.02]"
              title="Click or press ↑ ↑ ↓ ↓ ← → ← → B A"
            >
              ↑ ↑ ↓ ↓ ← → ← → B A
            </div>
            <span className="text-[10px] text-slate-500">
              (Click box or use arrow keys)
            </span>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for habit conquerors worldwide.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
