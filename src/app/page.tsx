'use client';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { useEffect, useState } from "react";
import { scrollToElement, setupSmoothScrolling } from "../lib/scrollUtils";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";
import CTASection from "@/components/sections/CTASection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {

  const [showIntro, setShowIntro] = useState(true);

  // Introduction animation timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
      );

      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 70) && (elementBottom > 0);

        if (isVisible) {
          element.classList.add('active');
        }
      });
    };

    // Initial check on load
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up smooth scrolling
  useEffect(() => {
    // Set up smooth scrolling
    setupSmoothScrolling();

    // Handle anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const href = target.getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        const targetId = href.substring(1);
        scrollToElement(targetId);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Set reduced spacings throughout the site
  useEffect(() => {
    document.documentElement.style.setProperty('--section-padding', '4rem');
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.removeProperty('--section-padding');
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);


  return (
    <div className="flex min-h-screen flex-col">
      {showIntro && (
        <motion.div
          className="intro-animation"
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          <motion.div
            className="intro-logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.1, 1],
              opacity: 1
            }}
            transition={{
              duration: 1.8,
              times: [0, 0.6, 1]
            }}
          >
            <Logo className="h-20 md:h-28" />
          </motion.div>
        </motion.div>
      )}
      <Header />
      <main>
        <HeroSection />
        {/* <AboutSection />
        <ServicesSection />
        <SpecialtiesSection />
        <PricingSection />
        <GallerySection /> */}
        <CalculatorSection/>
        <CTASection />
        <ContactSection/>
      </main>
      <Footer />
    </div>
  );
}
