"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Swords,
  Crown,
  Sparkles,
  Zap,
  ShieldAlert,
  Coins,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export function WhyItWorks() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      title: "Build Lasting Habits",
      subtitle: "Dopamine-driven positive & negative feedback",
      icon: Flame,
      tag: "Habit Loop",
      tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      glowColor: "from-amber-500/20 via-orange-500/10 to-transparent",
      borderColor: "group-hover:border-amber-500/40",
      description:
        "Human brains crave immediate feedback. Habitica bridges the gap between delayed real-life results and instant micro-rewards with XP multipliers and streak bonuses.",
      bullets: [
        "Positive habits grant XP, Gold & Mana",
        "Negative slip-ups deal character damage",
        "Streaks multiply rare equipment drop chances",
      ],
      demoSnippet: {
        title: "Morning Routine",
        stat: "+45 XP • +12 Gold",
        badge: "🔥 18-Day Streak Active",
      },
    },
    {
      id: 2,
      title: "Complete Party Quests",
      subtitle: "Real accountability with friends & guildmates",
      icon: Swords,
      tag: "Social Accountability",
      tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      glowColor: "from-purple-500/20 via-indigo-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/40",
      description:
        "Form parties with friends, coworkers, or family. When you complete your daily chores, your party damages the boss. If you neglect your dailies, the boss damages your entire team.",
      bullets: [
        "Shared boss battles against Procrastination",
        "Guild taverns for shared focus sprints",
        "No one wants to let their party down",
      ],
      demoSnippet: {
        title: "Dragon of Burnout",
        stat: "Party dealt 340 DMG",
        badge: "⚔️ Raid in Progress",
      },
    },
    {
      id: 3,
      title: "Level Up Your Real Life",
      subtitle: "Convert virtual gold into real-world rewards",
      icon: Crown,
      tag: "Reward Shop",
      tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      glowColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
      borderColor: "group-hover:border-emerald-500/40",
      description:
        "Define custom real-life rewards inside your gold store. Earn the right to watch an episode of your favorite show, buy a video game, or enjoy a guilt-free cheat meal.",
      bullets: [
        "100 Gold = 1 Hour of Video Games",
        "250 Gold = Saturday Night Sushi Treat",
        "Eliminate procrastination guilt forever",
      ],
      demoSnippet: {
        title: "Guilt-Free Gaming Time",
        stat: "Unlocked for 75 Gold",
        badge: "🏆 Reward Claimed",
      },
    },
  ];

  return (
    <section id="why-it-works" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          The Science of Gamified Motivation
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
          Why Habitica Works.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Standard to-do lists rely on pure willpower, which depletes by 3 PM.
          Habitica pairs behavioral psychology with RPG progression to make consistency inevitable.
        </p>
      </div>

      {/* Three 3D Tilt Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0.9, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(pillar.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative rounded-3xl bg-[#0C101A]/80 border border-white/[0.08] ${pillar.borderColor} p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-2`}
            >
              {/* Dynamic Gradient Spotlight on hover */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${pillar.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                {/* Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" />
                  </div>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${pillar.tagColor}`}
                  >
                    {pillar.tag}
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4">
                  {pillar.description}
                </p>

                {/* Bullet Points */}
                <div className="mt-6 flex flex-col gap-2.5">
                  {pillar.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Snippet Preview */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <div className="p-3.5 rounded-2xl bg-[#07090E]/80 border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {pillar.demoSnippet.title}
                    </span>
                    <span className="text-[11px] text-amber-400 font-semibold">
                      {pillar.demoSnippet.stat}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-purple-300 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    {pillar.demoSnippet.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
