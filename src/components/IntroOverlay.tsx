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
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Push text down so it can slide up from behind the overflow-hidden mask
    gsap.set([line1Ref.current, line2Ref.current], { y: "110%" });

    tl
      // 1. Text slides up smoothly and snappily (expo.out)
      .to(line1Ref.current, { y: "0%", duration: 1.1, ease: "expo.out" }, 0.1)
      .to(line2Ref.current, { y: "0%", duration: 1.1, ease: "expo.out" }, 0.25)

      // 2. Curtains wipe right with a micro-stagger for a more organic, luxury feel
      // (Starts at 2.0s, giving a ~0.65s hold for the user to read the text)
      .to(topRef.current, { x: "100%", duration: 1.3, ease: "expo.inOut" }, 2.0)
      .to(bottomRef.current, { x: "100%", duration: 1.3, ease: "expo.inOut" }, 2.05)

      // 3. Crossfade text perfectly
      .to(textContainerRef.current, { opacity: 0, duration: 0.5, ease: "none" }, 2.4)

      .call(onComplete, [], 3.5);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none">
      {/* Top half curtain */}
      <div
        ref={topRef}
        className="absolute top-0 left-0 w-full h-1/2"
        style={{ background: "#42223A" }}
      />
      {/* Bottom half curtain */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ background: "#42223A" }}
      />

      {/* Massive anchored text container */}
      <div
        ref={textContainerRef}
        className="absolute bottom-0 left-0 w-full px-4 pb-6 md:px-8 md:pb-10 z-[1000] flex flex-col justify-end"
      >
        <h1
          className="font-serif text-white tracking-tighter w-full whitespace-nowrap"
          style={{ fontSize: "17vw", lineHeight: 0.8 }}
        >
          <div className="overflow-hidden pt-[6vw] -mt-[6vw] pb-[3vw] -mb-[3vw] px-[4vw] -mx-[4vw]">
            <span ref={line1Ref} className="block text-left">where cool</span>
          </div>
          <div className="overflow-hidden pt-[6vw] -mt-[6vw] pb-[10vw] -mb-[10vw] px-[4vw] -mx-[4vw]">
            <span ref={line2Ref} className="block text-right italic text-[#D8C8D2]">people meet</span>
          </div>
        </h1>
      </div>
    </div>
  );
}
