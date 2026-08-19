"use client";

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "@/utils/audio";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export interface KonamiState {
  isActivated: boolean;
  isGoldenHero: boolean;
  showSecretQuest: boolean;
  triggerCount: number;
}

export function useKonamiCode() {
  const [state, setState] = useState<KonamiState>({
    isActivated: false,
    isGoldenHero: false,
    showSecretQuest: false,
    triggerCount: 0,
  });

  const [inputIndex, setInputIndex] = useState<number>(0);

  const triggerConfetti = useCallback(() => {
    // Premium multi-stage confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#F59E0B", "#FBBF24", "#7C3AED", "#10B981"],
    });
    fire(0.2, {
      spread: 60,
      colors: ["#FFFFFF", "#F59E0B", "#6366F1"],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ["#FBBF24", "#EC4899", "#8B5CF6"],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ["#F59E0B", "#10B981", "#3B82F6"],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#FDE68A", "#DDD6FE"],
    });
  }, []);

  const activateEasterEgg = useCallback(() => {
    // Log required message to console
    console.log("%c👋 Nice! You found the hidden developer mode.", "color: #F59E0B; font-size: 16px; font-weight: bold; background: #07090E; padding: 6px 12px; border-radius: 6px; border: 1px solid #F59E0B;");
    
    // Play fanfare
    soundManager.playEasterEggSound();

    // Trigger canvas confetti
    triggerConfetti();

    // Set active state
    setState((prev) => ({
      isActivated: true,
      isGoldenHero: true,
      showSecretQuest: true,
      triggerCount: prev.triggerCount + 1,
    }));

    // Golden hero lasts 3 seconds as specified
    const goldenTimer = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isGoldenHero: false,
      }));
    }, 3000);

    return () => clearTimeout(goldenTimer);
  }, [triggerConfetti]);

  const closeSecretQuest = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showSecretQuest: false,
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState({
      isActivated: false,
      isGoldenHero: false,
      showSecretQuest: false,
      triggerCount: 0,
    });
    setInputIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid capturing when typing inside inputs
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      const expectedCode = KONAMI_SEQUENCE[inputIndex];
      const matched = e.code === expectedCode || e.key.toUpperCase() === expectedCode.replace("Key", "").toUpperCase() || (e.code === "KeyB" && (e.key === "b" || e.key === "B")) || (e.code === "KeyA" && (e.key === "a" || e.key === "A"));

      if (matched) {
        const nextIndex = inputIndex + 1;
        if (nextIndex === KONAMI_SEQUENCE.length) {
          activateEasterEgg();
          setInputIndex(0);
        } else {
          setInputIndex(nextIndex);
        }
      } else {
        // Reset if key doesn't match
        const isFirst = e.code === KONAMI_SEQUENCE[0];
        setInputIndex(isFirst ? 1 : 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputIndex, activateEasterEgg]);

  return {
    ...state,
    inputIndex,
    sequenceLength: KONAMI_SEQUENCE.length,
    activateEasterEgg,
    closeSecretQuest,
    resetAll,
  };
}
