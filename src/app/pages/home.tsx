import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { useEffect } from "react";

export default function Home() {
  // Smooth scrolling for the entire page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SpecialtiesSection />
        <PricingSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
