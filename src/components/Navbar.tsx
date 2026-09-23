"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  onApplyClick: () => void;
}

export default function Navbar({ onApplyClick }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  
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

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 border-b border-transparent bg-transparent">
      {/* Left Links */}
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
        <div ref={logoRef as React.RefObject<HTMLDivElement>} className="relative w-32 h-10 md:w-48 md:h-12 transform origin-center">
          <Image 
            src="/logo-transparent.png" 
            alt="The A List Logo" 
            fill
            className="object-contain scale-[2.8] drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            priority
          />
        </div>
      </div>

      {/* Right Links */}
      <div className="hidden md:flex flex-1 items-center justify-end gap-10 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium text-white/70">
        <AnimatedButton onClick={onApplyClick} variant="secondary" className="px-6 py-2.5">
          Join The A List
        </AnimatedButton>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex-1 flex justify-end">
         <button className="text-white/80 hover:text-white text-xs tracking-widest uppercase">Menú</button>
      </div>
    </nav>
  );
}
