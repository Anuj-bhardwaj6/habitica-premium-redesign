"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles, Zap, Shield, HeartHandshake, Award } from "lucide-react";

export function ProductComparison() {
  const comparisonRows = [
    {
      feature: "Dopamine & Reward Mechanism",
      traditional: "A gray checkmark disappears into a list",
      habitica: "Instant XP, Gold loot drops, Level Ups & gear unlocks",
      habiticaWins: true,
    },
    {
      feature: "Accountability Structure",
      traditional: "Easy to ignore when motivation drops",
      habitica: "Party Raids: Unfinished tasks deal damage to your party",
      habiticaWins: true,
    },
    {
      feature: "Real-Life Reward Incentive",
      traditional: "None (relies purely on intrinsic willpower)",
      habitica: "Custom Gold Store (spend gold on gaming, movies, treats)",
      habiticaWins: true,
    },
    {
      feature: "Habit Formulation Science",
      traditional: "Basic binary tracking without slip-up management",
      habitica: "Positive & negative habit loops with health depletion",
      habiticaWins: true,
    },
    {
      feature: "Core Software Freedom",
      traditional: "Locked behind $12/mo recurring subscriptions",
      habitica: "100% Free & Open-Source Core with open API",
      habiticaWins: true,
    },
  ];

  return (
    <section id="comparison" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          The Difference
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
          Why Traditional Lists Fail.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Standard productivity tools assume humans are robots.
          Habitica is built for human brains that respond to challenge, community, and reward.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="rounded-3xl bg-[#0B0F1A]/80 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 bg-[#0F1424] border-b border-white/10 text-xs font-black uppercase tracking-wider text-slate-400">
          <div className="md:col-span-4 hidden md:block">Evaluation Pillar</div>
          <div className="md:col-span-4 text-slate-400">Traditional To-Do Lists</div>
          <div className="md:col-span-4 text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Habitica RPG Engine
          </div>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 hover:bg-white/[0.02] transition-colors gap-4 md:gap-0 items-center"
            >
              {/* Feature Name */}
              <div className="md:col-span-4">
                <span className="text-sm font-bold text-white block">
                  {row.feature}
                </span>
              </div>

              {/* Traditional Apps */}
              <div className="md:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{row.traditional}</span>
              </div>

              {/* Habitica */}
              <div className="md:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-amber-200 font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[3]" />
                <span>{row.habitica}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
