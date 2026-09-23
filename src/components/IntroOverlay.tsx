"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Desktop lines
  const dLine1Ref = useRef<HTMLSpanElement>(null);
  const dLine2Ref = useRef<HTMLSpanElement>(null);
  
  // Mobile lines
  const mLine1Ref = useRef<HTMLSpanElement>(null);
  const mLine2Ref = useRef<HTMLSpanElement>(null);
  const mLine3Ref = useRef<HTMLSpanElement>(null);
  const mLine4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set([
      dLine1Ref.current, dLine2Ref.current,
      mLine1Ref.current, mLine2Ref.current, mLine3Ref.current, mLine4Ref.current
    ], { y: "110%" });

    tl
      // Desktop animation
      .to(dLine1Ref.current, { y: "0%", duration: 1.1, ease: "expo.out" }, 0.1)
      .to(dLine2Ref.current, { y: "0%", duration: 1.1, ease: "expo.out" }, 0.25)
      
      // Mobile animation (staggered 4 lines)
      .to(mLine1Ref.current, { y: "0%", duration: 1.1, ease: "expo.out" }, 0.1)
      .to(mLine2Ref.current, { y: "0%", duration: 1.1, ease: "expo.out" }, 0.15)
      .to(mLine3Ref.current, { y: "0%", duration: 1.1, ease: "expo.out" }, 0.2)
      .to(mLine4Ref.current, { y: "0%", duration: 1.1, ease: "expo.out" }, 0.25)

      // Curtains wipe
      .to(topRef.current, { x: "100%", duration: 1.3, ease: "expo.inOut" }, 2.0)
      .to(bottomRef.current, { x: "100%", duration: 1.3, ease: "expo.inOut" }, 2.05)

      // Crossfade
      .to(textContainerRef.current, { opacity: 0, duration: 0.5, ease: "none" }, 2.4)

      .call(onComplete, [], 3.5);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none">
      <div ref={topRef} className="absolute top-0 left-0 w-full h-1/2 bg-[#42223A]" />
      <div ref={bottomRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-[#42223A]" />

      <div
        ref={textContainerRef}
        className="absolute bottom-0 left-0 w-full px-4 pb-12 md:px-8 md:pb-10 z-[1000] flex flex-col justify-end"
      >
        <h1 className="font-serif text-white tracking-tighter w-full">
          
          {/* DESKTOP LAYOUT */}
          <div className="hidden md:block whitespace-nowrap" style={{ fontSize: "17vw", lineHeight: 0.8 }}>
            <div className="overflow-hidden pt-[6vw] -mt-[6vw] pb-[3vw] -mb-[3vw] px-[4vw] -mx-[4vw]">
              <span ref={dLine1Ref} className="block text-left">where cool</span>
            </div>
            <div className="overflow-hidden pt-[6vw] -mt-[6vw] pb-[10vw] -mb-[10vw] px-[4vw] -mx-[4vw]">
              <span ref={dLine2Ref} className="block text-right italic text-[#D8C8D2]">people meet</span>
            </div>
          </div>

          {/* MOBILE LAYOUT (4 Lines, Massive Brutalism) */}
          <div className="block md:hidden whitespace-nowrap" style={{ fontSize: "31vw", lineHeight: 0.85 }}>
            <div className="overflow-hidden pt-[6vw] -mt-[6vw] pb-[2vw] -mb-[2vw] px-[4vw] -mx-[4vw]">
              <span ref={mLine1Ref} className="block text-left">where</span>
            </div>
            <div className="overflow-hidden pt-[4vw] -mt-[4vw] pb-[2vw] -mb-[2vw] px-[4vw] -mx-[4vw]">
              <span ref={mLine2Ref} className="block text-right">cool</span>
            </div>
            <div className="overflow-hidden pt-[4vw] -mt-[4vw] pb-[2vw] -mb-[2vw] px-[4vw] -mx-[4vw]">
              <span ref={mLine3Ref} className="block text-left italic text-[#D8C8D2]">people</span>
            </div>
            <div className="overflow-hidden pt-[4vw] -mt-[4vw] pb-[12vw] -mb-[12vw] px-[4vw] -mx-[4vw]">
              <span ref={mLine4Ref} className="block text-right italic text-[#D8C8D2]">meet</span>
            </div>
          </div>

        </h1>
      </div>
    </div>
  );
}
