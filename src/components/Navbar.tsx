"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";
import { X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  onApplyClick: () => void;
}

export default function Navbar({ onApplyClick }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        onEnter: () => {
          if (navRef.current) {
            navRef.current.classList.add("bg-brand/80", "backdrop-blur-lg", "border-white/10", "shadow-[0_4px_30px_rgba(66,34,58,0.5)]");
            gsap.to(navRef.current, { paddingTop: "0.5rem", paddingBottom: "0.5rem", duration: 0.4, ease: "power2.out" });
          }
          if (logoRef.current) {
            gsap.to(logoRef.current, { scale: 0.85, duration: 0.4, ease: "power2.out" });
          }
        },
        onLeaveBack: () => {
          if (navRef.current) {
            navRef.current.classList.remove("bg-brand/80", "backdrop-blur-lg", "border-white/10", "shadow-[0_4px_30px_rgba(66,34,58,0.5)]");
            gsap.to(navRef.current, { paddingTop: "1.25rem", paddingBottom: "1.25rem", duration: 0.4, ease: "power2.out" });
          }
          if (logoRef.current) {
            gsap.to(logoRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(mobileMenuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.8, ease: "expo.out" }
      );
    } else {
      document.body.style.overflow = "auto";
      gsap.to(mobileMenuRef.current, {
        x: "100%", duration: 0.6, ease: "expo.in"
      });
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-5 transition-all duration-300 border-b border-transparent bg-transparent">
        {/* Left Links (Desktop) */}
        <div className="hidden md:flex flex-1 items-center gap-10 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium text-white/70">
          <a href="#comunidad" className="group relative hover:text-white transition-colors py-2">
            Comunidad
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#business" className="group relative hover:text-white transition-colors py-2">
            Business
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Center Logo */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div ref={logoRef as React.RefObject<HTMLDivElement>} className="relative w-28 h-8 sm:w-32 sm:h-10 md:w-48 md:h-12 transform origin-center">
            <Image 
              src="/logo-transparent.png" 
              alt="The A List Logo" 
              fill
              className="object-contain scale-[2.8] drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              priority
            />
          </div>
        </div>

        {/* Right CTA (Desktop) */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-10 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium text-white/70">
          <AnimatedButton onClick={onApplyClick} variant="secondary" className="px-6 py-2.5">
            Join The A List
          </AnimatedButton>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex-1 flex justify-end">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-white/80 hover:text-white p-2"
          >
            <div className="flex flex-col gap-1.5">
              <span className="w-6 h-px bg-current"></span>
              <span className="w-4 h-px bg-current ml-auto"></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-[9998] bg-[#080407] flex flex-col md:hidden"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-6">
          <div className="font-serif italic text-xl text-white">The <span className="text-brand-light">A</span> List</div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex-1 flex flex-col justify-center px-8 gap-2">
          <a 
            href="#comunidad" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-5xl text-white/70 hover:text-white py-4 transition-colors tracking-tight"
          >
            Comunidad
          </a>
          <a 
            href="#business" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-5xl text-white/70 hover:text-white py-4 transition-colors tracking-tight"
          >
            Business
          </a>
          <a 
            href="#careers" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-5xl text-white/70 hover:text-white py-4 transition-colors tracking-tight"
          >
            Vacantes
          </a>
        </div>

        {/* Mobile Menu CTA */}
        <div className="px-8 pb-12">
          <button
            onClick={() => { setMobileMenuOpen(false); onApplyClick(); }}
            className="w-full py-5 bg-white text-black uppercase tracking-[0.25em] text-xs font-medium rounded-sm hover:bg-gray-200 transition-colors"
          >
            Join The A List
          </button>
          <div className="mt-8 flex gap-6 text-white/40 text-xs">
            <a href="https://instagram.com/thealist.mexicocity" target="_blank" className="hover:text-white transition-colors">Instagram</a>
            <a href="mailto:thealist.mexicocity@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </div>
    </>
  );
}
