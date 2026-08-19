"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Sword, Wand2, User, ArrowRight, Flame } from "lucide-react";
import { soundManager } from "@/utils/audio";

interface FinalCTAProps {
  onStartQuest: (heroName?: string, heroClass?: string) => void;
}

export function FinalCTA({ onStartQuest }: FinalCTAProps) {
  const [heroName, setHeroName] = useState("");
  const [selectedClass, setSelectedClass] = useState("Warrior");
  const [submitted, setSubmitted] = useState(false);

  const classes = [
    { name: "Warrior", icon: "⚔️", desc: "Heavy Armor & Critical Hits" },
    { name: "Mage", icon: "🧙‍♂️", desc: "High XP & Burst Mana" },
    { name: "Rogue", icon: "🥷", desc: "Gold Drops & Stealth" },
    { name: "Healer", icon: "✨", desc: "Team Healing & Revival" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playLevelUpSound();
    setSubmitted(true);
    setTimeout(() => {
      onStartQuest(heroName || "Novice Adventurer", selectedClass);
    }, 400);
  };

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Radiant Portal Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-amber-950/20 pointer-events-none -z-10 rounded-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-purple-600/25 via-indigo-600/20 to-amber-500/25 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />

      <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#090D17]/90 border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center">
        {/* Glow Crest */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-500 p-[1px] shadow-[0_0_40px_rgba(245,158,11,0.4)] mb-6">
          <div className="w-full h-full bg-[#07090E] rounded-[23px] flex items-center justify-center">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 animate-spin" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
          Ready to Begin Your Adventure?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
          Create your character in seconds. No credit card required. Free & open-source forever.
        </p>

        {/* Interactive Character Creation Form */}
        <form onSubmit={handleSubmit} className="mt-10 max-w-lg mx-auto flex flex-col gap-5">
          <div className="flex flex-col text-left gap-1.5">
            <label htmlFor="hero-name" className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Adventurer Name
            </label>
            <div className="relative">
              <input
                id="hero-name"
                type="text"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                placeholder="Enter character name (e.g. Aurelius)..."
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-sm font-medium transition-all"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Pick Class */}
          <div className="flex flex-col text-left gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Select Starting Class
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {classes.map((cls) => (
                <button
                  type="button"
                  key={cls.name}
                  onClick={() => {
                    soundManager.playEquipSound();
                    setSelectedClass(cls.name);
                  }}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 text-center ${
                    selectedClass === cls.name
                      ? "bg-purple-600/30 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.03]"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="text-2xl">{cls.icon}</span>
                  <span className="text-xs font-bold text-white">{cls.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black text-base tracking-wide shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Embark on Quest — Free Forever</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" /> Free & Open-Source (GPL)
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" /> Web, iOS & Android Sync
          </span>
        </div>
      </div>
    </section>
  );
}
