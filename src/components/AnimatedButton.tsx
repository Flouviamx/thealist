"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

interface AnimatedButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}: AnimatedButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textDefaultRef = useRef<HTMLSpanElement>(null);
  const textHoverRef = useRef<HTMLSpanElement>(null);

  const isPrimary = variant === 'primary';

  useEffect(() => {
    const btn = btnRef.current;
    const fill = fillRef.current;
    const textDefault = textDefaultRef.current;
    const textHover = textHoverRef.current;

    if (!btn || !fill || !textDefault || !textHover) return;

    // Initial states
    gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(textHover, { y: '110%', opacity: 1 });

    const handleEnter = () => {
      // Fill slides in from left
      gsap.to(fill, { scaleX: 1, duration: 0.55, ease: 'expo.out' });
      // Default text slides up and out
      gsap.to(textDefault, { y: '-110%', duration: 0.38, ease: 'expo.in' });
      // Hover text slides in from below
      gsap.to(textHover, { y: '0%', duration: 0.45, ease: 'expo.out', delay: 0.05 });
    };

    const handleLeave = () => {
      // Fill retreats to the right
      gsap.set(fill, { transformOrigin: 'right center' });
      gsap.to(fill, { scaleX: 0, duration: 0.45, ease: 'expo.in', onComplete: () => {
        gsap.set(fill, { transformOrigin: 'left center' });
      }});
      // Texts reset
      gsap.to(textDefault, { y: '0%', duration: 0.45, ease: 'expo.out', delay: 0.05 });
      gsap.to(textHover, { y: '110%', duration: 0.38, ease: 'expo.in' });
      // Magnetic snap back
      gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    };

    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
      gsap.to(btn, { x, y, duration: 0.5, ease: 'power2.out' });
    };

    btn.addEventListener('mouseenter', handleEnter);
    btn.addEventListener('mouseleave', handleLeave);
    btn.addEventListener('mousemove', handleMove);

    return () => {
      btn.removeEventListener('mouseenter', handleEnter);
      btn.removeEventListener('mouseleave', handleLeave);
      btn.removeEventListener('mousemove', handleMove);
    };
  }, []);

  const fillBg = isPrimary ? 'bg-white' : 'bg-[#080407]';
  const defaultText = isPrimary ? 'text-white' : 'text-[#080407]';
  const hoverText = isPrimary ? 'text-[#080407]' : 'text-white';
  const baseBg = isPrimary ? 'bg-transparent border border-white/25' : 'bg-white border border-transparent';

  const Component = props.href ? 'a' : 'button';

  return (
    <Component
      ref={btnRef as any}
      className={`relative inline-flex items-center justify-center overflow-hidden ${baseBg} tracking-[0.25em] text-xs font-medium uppercase cursor-pointer rounded-sm ${className}`}
      style={{ willChange: 'transform' }}
      {...(props as any)}
    >
      {/* Animated fill layer */}
      <span ref={fillRef} className={`absolute inset-0 ${fillBg}`} />

      {/* Default state text */}
      <span ref={textDefaultRef} className={`relative z-10 flex items-center gap-3 ${defaultText} whitespace-nowrap`}>
        {children}
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
      </span>

      {/* Hover state text (enters from below) */}
      <span ref={textHoverRef} className={`absolute inset-0 z-10 flex items-center justify-center gap-3 ${hoverText} whitespace-nowrap`}>
        {children}
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
      </span>
    </Component>
  );
}
