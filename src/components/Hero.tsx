"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Text starts invisible
    gsap.set(textRef.current, { opacity: 0 });

    tl
      // Crossfade text in exactly as Intro text fades out (starts at 2.4s)
      .to(textRef.current, { opacity: 1, duration: 0.5, ease: "none" }, 2.4);

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative h-screen w-full px-4 overflow-hidden bg-[#080407]">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-brand/15 rounded-full blur-[180px]" />
      </div>

      {/* Massive anchored text matching the IntroOverlay EXACTLY */}
      <div
        ref={textRef}
        className="absolute bottom-0 left-0 w-full px-4 pb-6 md:px-8 md:pb-10 z-10 flex flex-col justify-end pointer-events-none"
      >
        <h1
          className="font-serif text-white tracking-tighter w-full whitespace-nowrap"
          style={{ fontSize: "17vw", lineHeight: 0.8 }}
        >
          <div className="overflow-hidden pt-[6vw] -mt-[6vw] pb-[3vw] -mb-[3vw] px-[4vw] -mx-[4vw]">
            <span className="block text-left">where cool</span>
          </div>
          <div className="overflow-hidden pt-[6vw] -mt-[6vw] pb-[10vw] -mb-[10vw] px-[4vw] -mx-[4vw]">
            <span className="block text-right italic text-[#D8C8D2]">people meet</span>
          </div>
        </h1>
      </div>
    </section>
  );
}
