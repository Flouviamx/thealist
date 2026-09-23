"use client";
import { useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CareersSection from "@/components/CareersSection";
import Footer from "@/components/Footer";
import IntroOverlay from "@/components/IntroOverlay";
import ApplicationForm from "@/components/ApplicationForm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    if (!introComplete) return;

    const ctx = gsap.context(() => {
      // Luxury Scroll Reveal
      gsap.utils.toArray('.fade-up').forEach((el: any) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.6, 
            ease: "expo.out", 
            scrollTrigger: { 
              trigger: el, 
              start: "top 85%",
              toggleActions: "play none none none"
            } 
          }
        );
      });
    });

    return () => ctx.revert();
  }, [introComplete]);

  return (
    <main className="min-h-screen selection:bg-brand-light/50 selection:text-white overflow-x-hidden">
      <IntroOverlay onComplete={handleIntroComplete} />
      <Navbar onApplyClick={() => setIsFormOpen(true)} />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <CareersSection />
      <Footer />
      <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </main>
  );
}
