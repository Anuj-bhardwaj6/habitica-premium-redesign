"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Sword,
  Wand2,
  Sparkles,
  Flame,
  Heart,
  Zap,
  Coins,
  Gem,
  CheckCircle,
  Circle,
  Plus,
  Minus,
  Trophy,
  Crown,
  Backpack,
  Skull,
  RotateCcw,
  Star,
  Layers,
  ChevronRight,
  Info,
  Check,
  Award,
} from "lucide-react";
import { soundManager } from "@/utils/audio";

interface FloatingReward {
  id: number;
  x: number;
  y: number;
  text: string;
  type: "xp" | "gold" | "damage";
}

interface ItemGear {
  id: string;
  name: string;
  type: "weapon" | "armor" | "shield" | "pet";
  rarity: "uncommon" | "rare" | "epic" | "legendary";
  stats: string;
  description: string;
  icon: string;
  equipped: boolean;
}

interface ProductShowcaseProps {
  isGoldenHero?: boolean;
}

export function ProductShowcase({ isGoldenHero = false }: ProductShowcaseProps) {
  // Character Stats State
  const [level, setLevel] = useState(42);
  const [xp, setXp] = useState(740);
  const maxXp = 1000;
  const [hp, setHp] = useState(48);
  const maxHp = 50;
  const [mana, setMana] = useState(85);
  const maxMana = 100;
  const [gold, setGold] = useState(1420);
  const [gems, setGems] = useState(25);
  const [activeClass, setActiveClass] = useState<"warrior" | "mage" | "rogue" | "healer">("warrior");
  const [streak, setStreak] = useState(18);

  // Boss State
  const [bossHp, setBossHp] = useState(1240);
  const maxBossHp = 3000;
  const [bossHit, setBossHit] = useState(false);

  // Floating XP/Gold animations
  const [floatingRewards, setFloatingRewards] = useState<FloatingReward[]>([]);
  const rewardCounter = useRef(0);

  // Level Up Modal State
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Active Tab inside Dashboard
  const [activeTab, setActiveTab] = useState<"tasks" | "inventory" | "party" | "achievements">("tasks");

  // Selected Gear Modal
  const [selectedGear, setSelectedGear] = useState<ItemGear | null>(null);

  // Habits State
  const [habits, setHabits] = useState([
    { id: "h1", text: "Hydrate: Drink 2.5L Water", count: 3, positive: true, streak: 12, xp: 20, gold: 5 },
    { id: "h2", text: "Deep Focus Coding (45m)", count: 2, positive: true, streak: 8, xp: 50, gold: 15 },
    { id: "h3", text: "Avoid Late Night Social Media", count: 0, positive: false, streak: 5, xp: 35, gold: 10 },
  ]);

  // Dailies State
  const [dailies, setDailies] = useState([
    { id: "d1", text: "Morning Mobility & Posture Routine", completed: true, streak: 18, xp: 45, gold: 12, priority: "Medium" },
    { id: "d2", text: "Review Team Pull Requests & Tasks", completed: false, streak: 14, xp: 60, gold: 18, priority: "Hard" },
    { id: "d3", text: "Read 20 Pages of Tech / Philosophy", completed: false, streak: 9, xp: 40, gold: 10, priority: "Easy" },
  ]);

  // To-Dos State
  const [todos, setTodos] = useState([
    { id: "t1", text: "Ship v2.0 Landing Page redesign", completed: false, xp: 120, gold: 45, tag: "Project Alpha" },
    { id: "t2", text: "Meal prep healthy lunch for tomorrow", completed: false, xp: 50, gold: 15, tag: "Wellness" },
  ]);

  // Inventory items
  const [inventory, setInventory] = useState<ItemGear[]>([
    {
      id: "g1",
      name: "Sunfire Bastion Greatsword",
      type: "weapon",
      rarity: "legendary",
      stats: "+24 STR, +15% Critical XP",
      description: "Forged in the heart of early morning disciplined workouts.",
      icon: "⚔️",
      equipped: true,
    },
    {
      id: "g2",
      name: "Aegis of Willpower",
      type: "shield",
      rarity: "epic",
      stats: "+18 DEF, -20% Procrastination Damage",
      description: "Blocks distractions with impenetrable focus.",
      icon: "🛡️",
      equipped: true,
    },
    {
      id: "g3",
      name: "Robes of Deep Cognition",
      type: "armor",
      rarity: "rare",
      stats: "+14 INT, +25 Max Mana",
      description: "Woven from threads of undisturbed flow states.",
      icon: "🥋",
      equipped: false,
    },
    {
      id: "g4",
      name: "Golden Gryphon Hatchling",
      type: "pet",
      rarity: "legendary",
      stats: "+10% Gold from completed Dailies",
      description: "Hatched from an egg after maintaining a 14-day streak.",
      icon: "🦅",
      equipped: true,
    },
  ]);

  // Class configurations
  const classConfigs = {
    warrior: {
      name: "Warrior",
      title: "Vanguard of Discipline",
      badge: "⚔️ High Physical Defense & Critical Strikes",
      primaryStat: "Strength",
      avatarGlow: "from-amber-500/30 to-red-500/20",
      color: "text-amber-400",
      ability: "Brutal Strike (Extra Boss DMG)",
    },
    mage: {
      name: "Mage",
      title: "Archmage of Flow",
      badge: "🔮 Massive XP Multipliers & Mana Surge",
      primaryStat: "Intelligence",
      avatarGlow: "from-purple-500/30 to-indigo-500/20",
      color: "text-purple-400",
      ability: "Burst of Flames (+75 XP on Dailies)",
    },
    rogue: {
      name: "Rogue",
      title: "Shadow Assassin of Distractions",
      badge: "🗡️ Double Gold Drops & Rare Item Finds",
      primaryStat: "Agility",
      avatarGlow: "from-emerald-500/30 to-teal-500/20",
      color: "text-emerald-400",
      ability: "Stealth (Dodge Missed Daily Penalties)",
    },
    healer: {
      name: "Healer",
      title: "Saint of Mental Restoration",
      badge: "✨ Party Health Regeneration & Buffs",
      primaryStat: "Constitution",
      avatarGlow: "from-cyan-500/30 to-blue-500/20",
      color: "text-cyan-400",
      ability: "Healing Light (Restores Party HP)",
    },
  };

  // Trigger floating reward
  const triggerReward = (text: string, type: "xp" | "gold" | "damage", event?: React.MouseEvent) => {
    rewardCounter.current += 1;
    const rect = event?.currentTarget.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top : window.innerHeight / 2;

    const newReward: FloatingReward = {
      id: rewardCounter.current,
      x,
      y,
      text,
      type,
    };

    setFloatingRewards((prev) => [...prev, newReward]);
    setTimeout(() => {
      setFloatingRewards((prev) => prev.filter((r) => r.id !== newReward.id));
    }, 1200);
  };

  // Add XP and handle Level Up
  const addProgress = (earnedXp: number, earnedGold: number, e?: React.MouseEvent) => {
    soundManager.playCheckSound();
    soundManager.playGoldSound();

    triggerReward(`+${earnedXp} XP`, "xp", e);
    setTimeout(() => {
      triggerReward(`+${earnedGold} G`, "gold", e);
    }, 150);

    // Damage boss
    const damage = Math.floor(earnedXp * 0.8);
    setBossHp((prev) => Math.max(0, prev - damage));
    setBossHit(true);
    soundManager.playBossHitSound();
    setTimeout(() => setBossHit(false), 300);

    // Gold update
    setGold((prev) => prev + earnedGold);

    // XP calculation
    setXp((prev) => {
      const nextXp = prev + earnedXp;
      if (nextXp >= maxXp) {
        // Level up!
        setLevel((lvl) => lvl + 1);
        setShowLevelUp(true);
        soundManager.playLevelUpSound();
        return nextXp - maxXp;
      }
      return nextXp;
    });
  };

  // Toggle Daily
  const handleToggleDaily = (id: string, e: React.MouseEvent) => {
    setDailies((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextCompleted = !d.completed;
          if (nextCompleted) {
            addProgress(d.xp, d.gold, e);
          }
          return { ...d, completed: nextCompleted };
        }
        return d;
      })
    );
  };

  // Toggle To-Do
  const handleToggleTodo = (id: string, e: React.MouseEvent) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            addProgress(t.xp, t.gold, e);
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  // Increment Habit
  const handleHabitIncrement = (id: string, e: React.MouseEvent) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          addProgress(h.xp, h.gold, e);
          return { ...h, count: h.count + 1 };
        }
        return h;
      })
    );
  };

  // Decrement Habit (penalty)
  const handleHabitDecrement = (id: string) => {
    soundManager.playBossHitSound();
    setHp((prev) => Math.max(1, prev - 4));
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          return { ...h, count: Math.max(0, h.count - 1) };
        }
        return h;
      })
    );
  };

  // Equip / Unequip gear
  const handleEquipGear = (gear: ItemGear) => {
    soundManager.playEquipSound();
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === gear.id) {
          return { ...item, equipped: !item.equipped };
        }
        if (item.type === gear.type && item.id !== gear.id && !gear.equipped) {
          return { ...item, equipped: false };
        }
        return item;
      })
    );
    setSelectedGear(null);
  };

  // Reset interactive dashboard
  const handleResetDemo = () => {
    soundManager.playCheckSound();
    setXp(740);
    setLevel(42);
    setHp(48);
    setGold(1420);
    setBossHp(1240);
    setDailies([
      { id: "d1", text: "Morning Mobility & Posture Routine", completed: false, streak: 18, xp: 45, gold: 12, priority: "Medium" },
      { id: "d2", text: "Review Team Pull Requests & Tasks", completed: false, streak: 14, xp: 60, gold: 18, priority: "Hard" },
      { id: "d3", text: "Read 20 Pages of Tech / Philosophy", completed: false, streak: 9, xp: 40, gold: 10, priority: "Easy" },
    ]);
    setTodos([
      { id: "t1", text: "Ship v2.0 Landing Page redesign", completed: false, xp: 120, gold: 45, tag: "Project Alpha" },
      { id: "t2", text: "Meal prep healthy lunch for tomorrow", completed: false, xp: 50, gold: 15, tag: "Wellness" },
    ]);
  };

  return (
    <section id="live-demo" className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Floating Reward Toast Numbers */}
      <AnimatePresence>
        {floatingRewards.map((reward) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -45, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: `${reward.x}px`,
              top: `${reward.y}px`,
              pointerEvents: "none",
              zIndex: 9999,
            }}
            className={`font-black text-sm sm:text-base px-2.5 py-1 rounded-full shadow-lg border backdrop-blur-md ${
              reward.type === "xp"
                ? "bg-purple-950/90 text-purple-300 border-purple-500/50"
                : reward.type === "gold"
                ? "bg-amber-950/90 text-amber-300 border-amber-500/50"
                : "bg-red-950/90 text-red-300 border-red-500/50"
            }`}
          >
            {reward.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Level Up Celebration Modal */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <div className="relative max-w-md w-full p-6 sm:p-8 rounded-3xl bg-[#0F1420] border-2 border-amber-400/60 shadow-[0_0_80px_rgba(245,158,11,0.4)] text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-bounce">
                <Crown className="w-10 h-10 text-slate-950" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Ascension Achieved
              </span>
              <h3 className="text-3xl font-black text-white mt-1">LEVEL UP!</h3>
              <p className="text-lg font-bold text-amber-300 mt-1">
                You reached Level {level}!
              </p>
              <p className="text-sm text-slate-300 mt-3">
                All stats restored! +5 Max HP, +10 Max Mana, and +150 Gold bonus awarded.
              </p>
              <button
                onClick={() => setShowLevelUp(false)}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 font-bold text-slate-950 text-base shadow-lg shadow-amber-500/30 hover:scale-[1.02] transition-transform"
              >
                Claim Rewards & Continue Quest
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Interactive Product Showcase
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
          Experience the Game Loop.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Test real interactions below. Click tasks to earn XP and Gold, damage the raid boss,
          and watch your hero level up in real-time.
        </p>
      </div>

      {/* Master Interactive Dashboard Shell */}
      <div className="relative rounded-3xl bg-[#0A0E17]/90 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden">
        {/* Top App Control Bar */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#0E1322]/80 flex flex-wrap items-center justify-between gap-4">
          {/* Dashboard Title & Class Selector */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-slate-200">
              Habitica Command Sanctum
            </span>
            <div className="hidden sm:flex items-center gap-1.5 ml-3 pl-3 border-l border-white/10">
              {(["warrior", "mage", "rogue", "healer"] as const).map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    soundManager.playEquipSound();
                    setActiveClass(cls);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeClass === cls
                      ? "bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Tabs inside Product */}
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { id: "tasks", label: "Quests & Tasks", icon: Shield },
              { id: "inventory", label: "Equipment", icon: Backpack },
              { id: "party", label: "Party Raid", icon: Skull },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playCheckSound();
                    setActiveTab(tab.id as "tasks" | "inventory" | "party" | "achievements");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTab === tab.id
                      ? "bg-white/[0.1] text-white border border-white/15 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}

            {/* Reset Demo Button */}
            <button
              onClick={handleResetDemo}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/[0.05] transition-colors ml-2"
              title="Reset Live Simulator"
              aria-label="Reset Live Simulator"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Character Header Row */}
        <div className="p-5 sm:p-6 lg:p-8 bg-gradient-to-r from-[#111625] via-[#0E121E] to-[#121829] border-b border-white/[0.06] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Avatar & Class Preview */}
          <div className="lg:col-span-4 flex items-center gap-4">
            <div className="relative group">
              {/* Dynamic Aura Glow */}
              <div
                className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${
                  isGoldenHero
                    ? "from-amber-400 to-yellow-200 animate-pulse"
                    : classConfigs[activeClass].avatarGlow
                } blur-lg transition-all`}
              />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#090D15] border border-white/20 flex items-center justify-center overflow-hidden shadow-2xl animate-breathe">
                {isGoldenHero ? (
                  <span className="text-3xl sm:text-4xl animate-spin">🌟</span>
                ) : activeClass === "warrior" ? (
                  <span className="text-3xl sm:text-4xl">⚔️</span>
                ) : activeClass === "mage" ? (
                  <span className="text-3xl sm:text-4xl">🧙‍♂️</span>
                ) : activeClass === "rogue" ? (
                  <span className="text-3xl sm:text-4xl">🥷</span>
                ) : (
                  <span className="text-3xl sm:text-4xl">✨</span>
                )}
                {/* Level badge */}
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px]">
                  Lv.{level}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-base sm:text-lg text-white">
                  {isGoldenHero ? "Golden Deity (Dev Mode)" : "Aurelius the Steadfast"}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {classConfigs[activeClass].name}
                </span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5">
                {classConfigs[activeClass].title}
              </span>
              <span className="text-[11px] text-amber-400 font-medium mt-1">
                {classConfigs[activeClass].ability}
              </span>
            </div>
          </div>

          {/* Vitals Progress Bars (HP, Mana, XP) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {/* Health Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1 text-red-400">
                  <Heart className="w-3.5 h-3.5 fill-red-400" /> Health (HP)
                </span>
                <span className="text-slate-300">
                  {hp} / {maxHp}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-red-950/40 border border-red-900/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-rose-400"
                  animate={{ width: `${(hp / maxHp) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </div>

            {/* Mana Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Zap className="w-3.5 h-3.5 fill-cyan-400" /> Mana (MP)
                </span>
                <span className="text-slate-300">
                  {mana} / {maxMana}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-cyan-950/40 border border-cyan-900/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-600 to-blue-400"
                  animate={{ width: `${(mana / maxMana) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </div>

            {/* Experience (XP) Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1 text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" /> Experience (XP)
                </span>
                <span className="text-amber-300 font-bold">
                  {isGoldenHero ? "1000 / 1000 MAX" : `${xp} / ${maxXp} XP`}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-amber-950/40 border border-amber-900/40 overflow-hidden p-[1px]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                  animate={{ width: `${isGoldenHero ? 100 : (xp / maxXp) * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                />
              </div>
            </div>
          </div>

          {/* Currencies & Streaks */}
          <div className="lg:col-span-3 flex lg:flex-col justify-between sm:justify-start gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Coins className="w-5 h-5 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-xs text-amber-400 font-bold">Gold Loot</span>
                <span className="text-base font-black text-white">{gold.toLocaleString()} G</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Flame className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-xs text-emerald-400 font-bold">Quest Streak</span>
                <span className="text-base font-black text-white">{streak} Days Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Task Columns (Habits, Dailies, To-Dos) */}
        {activeTab === "tasks" && (
          <div className="p-5 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Habits (+ / - triggers) */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <h4 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider">
                    Habits
                  </h4>
                </div>
                <span className="text-xs text-slate-400 font-medium">Anytime Loop</span>
              </div>

              <div className="flex flex-col gap-3">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all flex flex-col gap-2 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">
                        {habit.text}
                      </span>
                      <span className="text-[11px] font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                        +{habit.xp} XP
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-slate-400">
                        Today: <strong className="text-white">{habit.count}x</strong>
                      </span>

                      <div className="flex items-center gap-1.5">
                        {habit.positive && (
                          <button
                            onClick={(e) => handleHabitIncrement(habit.id, e)}
                            className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/30 transition-all active:scale-90"
                            title="Log positive habit completion"
                            aria-label={`Log positive ${habit.text}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleHabitDecrement(habit.id)}
                          className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 transition-all active:scale-90"
                          title="Log slip-up (HP penalty)"
                          aria-label={`Log slip-up on ${habit.text}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Dailies (Repeatable Checklists) */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <h4 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider">
                    Dailies
                  </h4>
                </div>
                <span className="text-xs text-slate-400 font-medium">Reset Midnight</span>
              </div>

              <div className="flex flex-col gap-3">
                {dailies.map((daily) => (
                  <div
                    key={daily.id}
                    onClick={(e) => handleToggleDaily(daily.id, e)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                      daily.completed
                        ? "bg-purple-950/20 border-purple-500/30 opacity-75"
                        : "bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                          daily.completed
                            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30"
                            : "border border-white/30 group-hover:border-purple-400"
                        }`}
                        aria-label={`Check daily ${daily.text}`}
                      >
                        {daily.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>
                      <div className="flex flex-col">
                        <span
                          className={`text-xs sm:text-sm font-semibold transition-all ${
                            daily.completed ? "line-through text-slate-400" : "text-slate-200"
                          }`}
                        >
                          {daily.text}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400" /> {daily.streak} day streak
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 whitespace-nowrap">
                      +{daily.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: To-Dos (Single Quests) */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h4 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider">
                    To-Dos
                  </h4>
                </div>
                <span className="text-xs text-slate-400 font-medium">Bounty Board</span>
              </div>

              <div className="flex flex-col gap-3">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    onClick={(e) => handleToggleTodo(todo.id, e)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                      todo.completed
                        ? "bg-purple-950/20 border-purple-500/30 opacity-75"
                        : "bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                          todo.completed
                            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30"
                            : "border border-white/30 group-hover:border-emerald-400"
                        }`}
                        aria-label={`Check todo ${todo.text}`}
                      >
                        {todo.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>
                      <div className="flex flex-col">
                        <span
                          className={`text-xs sm:text-sm font-semibold transition-all ${
                            todo.completed ? "line-through text-slate-400" : "text-slate-200"
                          }`}
                        >
                          {todo.text}
                        </span>
                        <span className="text-[10px] text-purple-300 mt-0.5">
                          🏷️ {todo.tag}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 whitespace-nowrap">
                      +{todo.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inventory & Equipment */}
        {activeTab === "inventory" && (
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Backpack className="w-5 h-5 text-amber-400" />
                  Hero Armory & Mythic Inventory
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any item to inspect RPG attributes, stats, and equip status.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedGear(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    item.equipped
                      ? "bg-purple-950/30 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                      : "bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl p-2 rounded-xl bg-white/[0.05] border border-white/10">
                      {item.icon}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.rarity === "legendary"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : item.rarity === "epic"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h5 className="font-bold text-sm text-white">{item.name}</h5>
                    <p className="text-xs text-amber-400 font-medium mt-1">{item.stats}</p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-xs text-slate-400 capitalize">{item.type}</span>
                    <span
                      className={`text-xs font-bold ${
                        item.equipped ? "text-emerald-400" : "text-slate-400"
                      }`}
                    >
                      {item.equipped ? "✓ Equipped" : "In Stash"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Party Boss Raid */}
        {activeTab === "party" && (
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-red-950/30 via-[#100D16] to-[#120B1A] border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Boss Sprite & Damage Effect */}
              <div className="relative">
                <div
                  className={`w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-[#1A0A0E] border-2 border-red-500/40 flex items-center justify-center text-6xl shadow-2xl transition-transform ${
                    bossHit ? "scale-90 rotate-6 bg-red-900/60" : "animate-breathe"
                  }`}
                >
                  🐲
                </div>
                {bossHit && (
                  <span className="absolute -top-3 -right-3 px-2.5 py-1 rounded-full bg-red-600 font-black text-xs text-white animate-ping">
                    CRITICAL HIT!
                  </span>
                )}
              </div>

              {/* Boss Stats */}
              <div className="flex-1 w-full flex flex-col">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                      Active Party Quest Raid
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white">
                      The Dread Dragon of Procrastination
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">
                    Tier III Raid Boss
                  </span>
                </div>

                {/* Boss HP Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-300">Boss Vitality</span>
                    <span className="text-red-400 font-mono">
                      {bossHp} / {maxBossHp} HP
                    </span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-red-950/60 border border-red-900/50 overflow-hidden p-0.5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500"
                      animate={{ width: `${(bossHp / maxBossHp) * 100}%` }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  </div>
                </div>

                {/* Party Battle Feed */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    👥 <strong>Party Members:</strong> Alex (Mage), Sarah (Rogue), Kenji (Healer)
                  </span>
                  <span className="text-amber-400 font-semibold">
                    Complete dailies to deal party damage!
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Gear Modal Detail */}
        <AnimatePresence>
          {selectedGear && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedGear(null)}
            >
              <div
                className="max-w-sm w-full p-6 rounded-3xl bg-[#0F1422] border border-purple-500/40 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                    {selectedGear.icon}
                  </span>
                  <div>
                    <h5 className="text-lg font-black text-white">{selectedGear.name}</h5>
                    <span className="text-xs text-purple-300 font-bold uppercase tracking-wider">
                      {selectedGear.rarity} {selectedGear.type}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs font-semibold text-amber-300">
                  {selectedGear.stats}
                </div>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {selectedGear.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleEquipGear(selectedGear)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-xs text-white shadow-lg shadow-purple-900/30 hover:scale-[1.02] transition-transform"
                  >
                    {selectedGear.equipped ? "Unequip Item" : "Equip to Hero"}
                  </button>
                  <button
                    onClick={() => setSelectedGear(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
