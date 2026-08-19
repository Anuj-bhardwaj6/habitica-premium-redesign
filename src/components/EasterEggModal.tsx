"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Crown, Terminal, Check, X, Shield, Code2 } from "lucide-react";
import { soundManager } from "@/utils/audio";

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerCount: number;
}

export function EasterEggModal({ isOpen, onClose, triggerCount }: EasterEggModalProps) {
  const handleClaim = () => {
    soundManager.playLevelUpSound();
    onClose();
  };

  return (
    <>
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white font-bold text-sm shadow-[0_10px_40px_rgba(245,158,11,0.5)] border border-amber-300 flex items-center gap-3 backdrop-blur-xl"
          >
            <span className="text-xl">🎉</span>
            <div>
              <span className="block font-black text-amber-200">
                Secret Quest Unlocked!
              </span>
              <span className="text-xs text-white/90 font-medium">
                Developer Mode & Konami Sequence Verified
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Quest Card Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full p-6 sm:p-8 rounded-3xl bg-[#0B0F19] border-2 border-amber-400/80 shadow-[0_0_90px_rgba(245,158,11,0.45)] text-center overflow-hidden"
            >
              {/* Shimmer sweep */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/20 blur-[60px] rounded-full pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-200 p-[1px] shadow-lg shadow-amber-500/40">
                <div className="w-full h-full bg-[#07090E] rounded-[15px] flex items-center justify-center">
                  <Terminal className="w-8 h-8 text-amber-400" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Crown className="w-3.5 h-3.5" />
                Secret Developer Quest
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Congratulations!
              </h3>
              <p className="text-sm font-semibold text-amber-400 mt-1">
                You discovered the hidden quest.
              </p>

              <div className="mt-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left flex flex-col gap-2.5 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" /> REWARDS GRANTED:
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">READY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>💰 Gold Treasure:</span>
                  <strong className="text-amber-300 font-black">+9,999 Gold</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>⚡ Experience Surge:</span>
                  <strong className="text-purple-300 font-black">MAX XP (100%)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>👑 Legendary Title:</span>
                  <strong className="text-amber-400 font-black">&quot;Master of the Code&quot;</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>🌟 Hero Transformation:</span>
                  <strong className="text-yellow-300 font-black">Golden Deity Active</strong>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                Console message logged: <code className="text-amber-300 bg-white/5 px-1.5 py-0.5 rounded">👋 Nice! You found the hidden developer mode.</code>
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleClaim}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Claim Quest Reward & Ascend</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
