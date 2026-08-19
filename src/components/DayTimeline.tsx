"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Sunset,
  Moon,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Flame,
  ArrowRight,
} from "lucide-react";
import { soundManager } from "@/utils/audio";

export function DayTimeline() {
  const [activePeriod, setActivePeriod] = useState<"morning" | "afternoon" | "evening">("morning");

  const timelineData = {
    morning: {
      time: "07:30 AM – 09:00 AM",
      icon: Sun,
      iconColor: "text-amber-400",
      accentBg: "from-amber-500/20 to-orange-500/5",
      title: "Awakening & Mindful Discipline",
      badge: "☀️ Morning Rituals",
      xpEarned: "+85 XP",
      goldEarned: "+22 Gold",
      bossDmg: "68 DMG",
      cumulativeXp: 85,
      tasks: [
        { title: "Hydrate: 500ml Water + Electrolytes", reward: "+15 XP", done: true },
        { title: "15-Min Sunlight Walk & Mobility Stretch", reward: "+35 XP", done: true },
        { title: "Review Top 3 Focus Priorities for the Day", reward: "+35 XP", done: true },
      ],
      lootDrop: "Golden Potion of Clarity (+10% Focus Duration)",
      story: "You wake up, hydrate, and log your morning ritual. Before your morning coffee even finishes brewing, you've earned 85 XP and dealt 68 damage to the Dread Dragon of Procrastination.",
    },
    afternoon: {
      time: "01:30 PM – 04:30 PM",
      icon: Sunset,
      iconColor: "text-purple-400",
      accentBg: "from-purple-500/20 to-indigo-500/5",
      title: "Deep Work Sprint & Guild Raids",
      badge: "⚡ Peak Flow State",
      xpEarned: "+180 XP",
      goldEarned: "+55 Gold",
      bossDmg: "145 DMG",
      cumulativeXp: 265,
      tasks: [
        { title: "90-Min Undisturbed Deep Work Block", reward: "+80 XP", done: true },
        { title: "Review & Merge Critical Engineering PRs", reward: "+50 XP", done: true },
        { title: "Clean Inbox: Zero Unread Slack Distractions", reward: "+50 XP", done: true },
      ],
      lootDrop: "Mythic Scroll of Swift Intellect (+18 INT)",
      story: "While normal colleagues struggle through the 2 PM slump, your party buffs trigger. You clear your high-impact sprint to collect 180 XP and unlock a rare loot drop.",
    },
    evening: {
      time: "08:30 PM – 10:30 PM",
      icon: Moon,
      iconColor: "text-indigo-400",
      accentBg: "from-indigo-500/20 to-cyan-500/5",
      title: "Evening Wind-Down & Reward Redemption",
      badge: "🌙 Guild Victory",
      xpEarned: "+140 XP",
      goldEarned: "+45 Gold",
      bossDmg: "112 DMG",
      cumulativeXp: 405,
      tasks: [
        { title: "45-Min Gym Strength Session", reward: "+60 XP", done: true },
        { title: "Read 20 Pages of Book (No Phone Screen)", reward: "+40 XP", done: true },
        { title: "Daily Habitica Check-In & Streak Lock", reward: "+40 XP", done: true },
      ],
      lootDrop: "Unlocked: 1 Hour Guilt-Free Gaming Time",
      story: "Your daily streak hits 19 days! You spend 75 Gold in your custom reward store for an hour of gaming, completely guilt-free because every single goal was conquered.",
    },
  };

  const current = timelineData[activePeriod];
  const IconComponent = current.icon;

  const handleSwitchPeriod = (period: "morning" | "afternoon" | "evening") => {
    soundManager.playCheckSound();
    setActivePeriod(period);
  };

  return (
    <section id="day-timeline" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Clock className="w-3.5 h-3.5" />
          A Day in the Life
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
          How Habitica Powers Your 24 Hours.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          See how an ordinary day turns into a series of rewarding victories from sunrise to sleep.
        </p>
      </div>

      {/* Interactive Time Period Selector */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#0E1322] border border-white/10 shadow-xl gap-2">
          {(["morning", "afternoon", "evening"] as const).map((period) => {
            const PeriodIcon = timelineData[period].icon;
            const isActive = activePeriod === period;
            return (
              <button
                key={period}
                onClick={() => handleSwitchPeriod(period)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <PeriodIcon className={`w-4 h-4 ${isActive ? "text-amber-300" : ""}`} />
                <span>{period}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dynamic Timeline Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePeriod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-[#0B0F19]/90 border border-white/10 shadow-2xl backdrop-blur-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Column: Timeline Narrative & Stats */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-lg">
                <IconComponent className={`w-6 h-6 ${current.iconColor}`} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block">
                  {current.time}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {current.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {current.story}
            </p>

            {/* Task list for this timeframe */}
            <div className="flex flex-col gap-2.5 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Completed Quests During This Block:
              </span>
              {current.tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">
                      {task.title}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {task.reward}
                  </span>
                </div>
              ))}
            </div>

            {/* Loot Drop Notification */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#131122] to-amber-950/30 border border-purple-500/30 flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                  Bonus Loot Drop
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {current.lootDrop}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Progress Dashboard & XP Graph */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#07090E] border border-white/[0.08] flex flex-col gap-5 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                Daily XP Accumulation
              </span>
              <span className="text-xs font-black text-amber-400 font-mono">
                {current.cumulativeXp} / 500 Daily Goal
              </span>
            </div>

            {/* Simulated Animated Graph */}
            <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2">
              <div className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "45%" }}
                  className={`w-full rounded-t-xl transition-all ${
                    activePeriod === "morning"
                      ? "bg-gradient-to-t from-amber-600 to-yellow-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                      : "bg-white/10"
                  }`}
                />
                <span className="text-[10px] font-bold text-slate-400">08:00 AM</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: activePeriod === "morning" ? "0%" : "80%" }}
                  className={`w-full rounded-t-xl transition-all ${
                    activePeriod === "afternoon"
                      ? "bg-gradient-to-t from-purple-600 to-indigo-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                      : activePeriod === "evening"
                      ? "bg-white/20"
                      : "bg-white/5"
                  }`}
                />
                <span className="text-[10px] font-bold text-slate-400">03:00 PM</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: activePeriod === "evening" ? "100%" : "0%" }}
                  className={`w-full rounded-t-xl transition-all ${
                    activePeriod === "evening"
                      ? "bg-gradient-to-t from-emerald-600 to-teal-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      : "bg-white/5"
                  }`}
                />
                <span className="text-[10px] font-bold text-slate-400">10:00 PM</span>
              </div>
            </div>

            {/* Summary metrics row */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-center">
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <span className="text-[10px] text-slate-400 block">Total XP</span>
                <span className="text-xs sm:text-sm font-black text-amber-400">
                  {current.xpEarned}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <span className="text-[10px] text-slate-400 block">Gold Loot</span>
                <span className="text-xs sm:text-sm font-black text-amber-300">
                  {current.goldEarned}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <span className="text-[10px] text-slate-400 block">Boss DMG</span>
                <span className="text-xs sm:text-sm font-black text-red-400">
                  {current.bossDmg}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
