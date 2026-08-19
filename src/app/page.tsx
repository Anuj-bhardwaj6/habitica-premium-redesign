"use client";

import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { WhyItWorks } from "@/components/WhyItWorks";
import { DayTimeline } from "@/components/DayTimeline";
import { ProductComparison } from "@/components/ProductComparison";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { EasterEggModal } from "@/components/EasterEggModal";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { soundManager } from "@/utils/audio";

export default function HomePage() {
  const {
    isActivated,
    isGoldenHero,
    showSecretQuest,
    triggerCount,
    activateEasterEgg,
    closeSecretQuest,
  } = useKonamiCode();

  const handleStartQuestScroll = () => {
    const finalCta = document.getElementById("hero-name");
    if (finalCta) {
      finalCta.scrollIntoView({ behavior: "smooth", block: "center" });
      finalCta.focus();
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  const handleExploreDemoScroll = () => {
    const demo = document.getElementById("live-demo");
    if (demo) {
      demo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-1000 ${
        isActivated ? "aurora-bg" : "bg-[#07090E]"
      }`}
    >
      {/* Dynamic Cosmic Background Layer */}
      <div className="fixed inset-0 cosmic-stars opacity-30 pointer-events-none -z-10" />

      {/* Floating Glass Navigation */}
      <Navbar
        onStartQuestClick={handleStartQuestScroll}
        onExploreDemoClick={handleExploreDemoScroll}
      />

      <main className="relative">
        {/* Hero Section */}
        <HeroSection
          onStartQuest={handleStartQuestScroll}
          onExploreDemo={handleExploreDemoScroll}
        />

        {/* Interactive Product Showcase Simulator */}
        <ProductShowcase isGoldenHero={isGoldenHero} />

        {/* Why Habitica Works (3 Pillars) */}
        <WhyItWorks />

        {/* Live Progress Day Timeline */}
        <DayTimeline />

        {/* Habitica vs Traditional Comparison */}
        <ProductComparison />

        {/* Final CTA Character Launch Portal */}
        <FinalCTA onStartQuest={handleStartQuestScroll} />
      </main>

      {/* Footer */}
      <Footer onTriggerEasterEgg={activateEasterEgg} />

      {/* Secret Developer Mode Easter Egg Modal */}
      <EasterEggModal
        isOpen={showSecretQuest}
        onClose={closeSecretQuest}
        triggerCount={triggerCount}
      />
    </div>
  );
}
