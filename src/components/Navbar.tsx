"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Flame,
  Shield,
  Menu,
  X,
  ChevronRight,
  Gamepad2,
} from "lucide-react";
import { soundManager } from "@/utils/audio";

interface NavbarProps {
  onStartQuestClick?: () => void;
  onExploreDemoClick?: () => void;
}

export function Navbar({ onStartQuestClick, onExploreDemoClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundEnabled(soundManager.isEnabled());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { name: "Live Demo", href: "#live-demo", onClick: onExploreDemoClick },
    { name: "Why RPG?", href: "#why-it-works" },
    { name: "Day Timeline", href: "#day-timeline" },
    { name: "Habitica vs. Apps", href: "#comparison" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0F19]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-3 px-4 sm:px-6"
            : "bg-white/[0.02] backdrop-blur-md border border-white/[0.06] py-4 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-1"
            aria-label="Habitica Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <div className="w-full h-full bg-[#07090E] rounded-[11px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
                HABITICA
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  2.0
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                The RPG Productivity Engine
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="text-xs lg:text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Utilities */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Streak Pill */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold"
              title="Current Community Quest Streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>18-Day Streak</span>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label={soundEnabled ? "Mute game sound effects" : "Enable game sound effects"}
              title={soundEnabled ? "Sound Effects: ON (Click to mute)" : "Sound Effects: OFF (Click to turn on)"}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-purple-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Primary CTA */}
            <button
              onClick={onStartQuestClick}
              className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-4 py-2 bg-[#0E121B] rounded-[11px] flex items-center gap-2 group-hover:bg-[#0E121B]/80 transition-colors">
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span className="text-xs lg:text-sm font-bold text-white tracking-wide">
                  Start Your Quest
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-lg bg-white/[0.04] text-slate-300"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.06] text-slate-200 hover:text-white"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden pt-4 pb-2 border-t border-white/10 mt-3 flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                  }}
                  className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartQuestClick?.();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Start Your Quest
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
