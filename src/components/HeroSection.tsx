"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Play,
  Shield,
  Zap,
  Sword,
  ScrollText,
  Users,
  Trophy,
  ArrowRight,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { soundManager } from "@/utils/audio";

interface HeroSectionProps {
  onStartQuest: () => void;
  onExploreDemo: () => void;
}

export function HeroSection({ onStartQuest, onExploreDemo }: HeroSectionProps) {
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);

  const words = ["Turn", "Your", "Goals", "Into", "an", "Adventure."];

  const handleStartQuest = () => {
    soundManager.playLevelUpSound();
    onStartQuest();
  };

  const handleExploreDemo = () => {
    soundManager.playCheckSound();
    onExploreDemo();
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 lg:pt-40 lg:pb-24 flex flex-col justify-center items-center overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[400px] sm:h-[500px] bg-gradient-to-br from-purple-700/25 via-indigo-600/20 to-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-purple-600/15 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-amber-500/15 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Star Particles Texture */}
      <div className="absolute inset-0 cosmic-stars opacity-40 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Version / Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-purple-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.2)] mb-6 sm:mb-8 group cursor-pointer transition-all"
          onClick={handleExploreDemo}
        >
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-semibold text-purple-200 tracking-wide">
            Habitica 2.0 • The Open-Source RPG Productivity System
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        {/* Staggered Word Reveal Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] max-w-4xl text-white font-['Plus_Jakarta_Sans']">
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block mr-[0.28em] ${
                word === "Adventure."
                  ? "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-wavy underline-offset-8"
                  : word === "Goals"
                  ? "bg-gradient-to-r from-purple-300 via-indigo-200 to-white bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Honest, Compelling Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Transform habits, daily routines, and to-do lists into an RPG quest.
          Earn <span className="text-amber-400 font-semibold">XP</span>, loot{" "}
          <span className="text-purple-300 font-semibold">mythic equipment</span>,
          hatch pets, and defeat procrastination with real party members.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          {/* Primary CTA with Magnetic Lighting */}
          <button
            onClick={handleStartQuest}
            onMouseEnter={() => setIsHoveredPrimary(true)}
            onMouseLeave={() => setIsHoveredPrimary(false)}
            className="w-full sm:w-auto relative group px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black text-base tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.35)] hover:shadow-[0_0_55px_rgba(245,158,11,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
          >
            {/* Shimmer Sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform ease-out" />
            
            <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform duration-300" />
            <span>Start Your Quest — It&apos;s Free</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleExploreDemo}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-purple-500/40 backdrop-blur-xl text-white font-bold text-base tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
            <span>Explore Live Demo</span>
          </button>
        </motion.div>

        {/* Honest Trust Metrics & Pillars (No fake numbers/logos) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl"
        >
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm sm:text-base">
              <Shield className="w-4 h-4" />
              <span>100% Free Core</span>
            </div>
            <span className="text-xs text-slate-400 mt-0.5">Open-Source productivity</span>
          </div>

          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-purple-400 font-bold text-sm sm:text-base">
              <Zap className="w-4 h-4" />
              <span>No Pay-to-Win</span>
            </div>
            <span className="text-xs text-slate-400 mt-0.5">Progress earned by real effort</span>
          </div>

          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm sm:text-base">
              <Users className="w-4 h-4" />
              <span>Party Raids</span>
            </div>
            <span className="text-xs text-slate-400 mt-0.5">Shared accountability with friends</span>
          </div>

          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-sm sm:text-base">
              <Trophy className="w-4 h-4" />
              <span>Custom Rewards</span>
            </div>
            <span className="text-xs text-slate-400 mt-0.5">Spend gold on real pleasures</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
