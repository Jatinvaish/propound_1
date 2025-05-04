'use client';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import Preloader from "@/components/ui/preloader";
import { useEffect, useState } from "react";
import CalculatorSection from "@/components/sections/CalculatorSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";
import { TrustSectionMarquee } from "@/components/sections/trustsectionmarquee";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);  // Control visibility of content

  // Introduction animation timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);  // Hide preloader
      setShowContent(true); // Show content after preloader finishes
    }, 2000); // Ensure the preloader shows for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {showIntro && <Preloader />} {/* Preloader visible while loading */}
      {showContent && (
        <>
          <Header />
          <main>
            <HeroSection />
            <CalculatorSection />
            <CTASection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
