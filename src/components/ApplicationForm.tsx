"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { X, ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUESTIONS = [
  { id: 'name', type: 'text', title: 'Nombre y apellido' },
  { id: 'gender', type: 'choice', title: 'Género', options: ['Masculino', 'Femenino', 'Prefiero no decirlo'] },
  { id: 'age', type: 'number', title: 'Edad' },
  { id: 'instagram', type: 'text', title: 'Instagram', placeholder: '@usuario' },
  { id: 'followers', type: 'number', title: '# Seguidores en Instagram' },
  { id: 'email', type: 'email', title: 'Email' },
  { id: 'livesInCdmx', type: 'choice', title: '¿Actualmente vives en CDMX?', options: ['Sí', 'No', 'Estoy de visita'] },
  { id: 'zone', type: 'text', title: 'Zona en la que vives (CDMX)' },
  { id: 'localOrForeign', type: 'choice', title: '¿Eres local o foráneo en CDMX?', options: ['Local', 'Foráneo'] },
  { id: 'state', type: 'text', title: 'Estado / Ciudad de origen' },
  { id: 'profession', type: 'text', title: '¿A qué te dedicas?', placeholder: 'Profesión' },
  { id: 'whatsapp', type: 'tel', title: 'WhatsApp', placeholder: '+52 123 456 7890' },
  { id: 'referral', type: 'text', title: 'Código de referido', subtitle: 'Por el momento solo estamos aceptando a personas que tienen código de referido. Escribe "aplicar" si no tienes uno.', placeholder: 'Código' },
];

export default function ApplicationForm({ isOpen, onClose }: ApplicationFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showError, setShowError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const questionWrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mount/Unmount
  useEffect(() => {
    if (!containerRef.current) return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(containerRef.current, 
        { y: "100%" }, 
        { y: "0%", duration: 1.2, ease: "expo.inOut" }
      );
      setStep(0);
      setFormData({});
      setShowError(false);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Step Transitions (Staggered In)
  useEffect(() => {
    if (isOpen && questionWrapRef.current) {
      setShowError(false);
      
      const elements = Array.from(questionWrapRef.current.children);
      gsap.fromTo(elements,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }
      );
      
      // Auto-focus text inputs
      const timer = setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [step, isOpen]);

  // Keyboard Shortcuts
  useEffect(() => {
    if (!isOpen || isAnimating) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentQ = QUESTIONS[step];
      
      if (e.key === 'Enter') {
        e.preventDefault();
        if (currentQ.type !== 'choice') handleNext();
      }

      if (currentQ.type === 'choice' && currentQ.options) {
        const keyMap: Record<string, number> = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
        const choiceIndex = keyMap[e.key.toLowerCase()];
        
        if (choiceIndex !== undefined && choiceIndex < currentQ.options.length) {
          handleChoiceSelect(currentQ.options[choiceIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, step, formData, isAnimating]);

  const handleClose = () => {
    gsap.to(containerRef.current, { 
      y: "100%", duration: 1, ease: "expo.inOut", onComplete: onClose
    });
  };

  const navigateTo = (newStep: number) => {
    if (isAnimating || newStep < 0 || newStep >= QUESTIONS.length) return;
    setIsAnimating(true);
    
    const elements = Array.from(questionWrapRef.current!.children);
    const direction = newStep > step ? -60 : 60; // Animate up if going next, down if going prev

    gsap.to(elements, {
      y: direction, opacity: 0, duration: 0.5, ease: "power3.in", stagger: 0.04,
      onComplete: () => {
        setStep(newStep);
        setIsAnimating(false);
      }
    });
  };

  const handleNext = () => {
    const currentQ = QUESTIONS[step];
    if (!formData[currentQ.id]?.trim()) {
      setShowError(true);
      // Shake animation
      gsap.fromTo(inputRef.current, 
        { x: -10 }, 
        { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" }
      );
      return;
    }

    if (step < QUESTIONS.length - 1) {
      navigateTo(step + 1);
    } else {
      alert("¡Formulario enviado! (Conectar backend aquí)");
      handleClose();
    }
  };

  const handleChoiceSelect = (option: string) => {
    if (isAnimating) return;
    setFormData(prev => ({ ...prev, [QUESTIONS[step].id]: option }));
    
    // Simulate Typeform's rapid auto-advance on choice click
    setTimeout(() => {
      navigateTo(step + 1);
    }, 400);
  };

  if (!isOpen && step === 0 && Object.keys(formData).length === 0) return null;

  const q = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-[#080407] text-white flex flex-col justify-between ${isOpen ? 'block' : 'hidden'}`}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[150px] opacity-50 mix-blend-screen" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 md:p-12 flex justify-between items-center opacity-80">
        <div className="font-serif italic text-2xl tracking-tight">The <span className="text-brand-light">A</span> List</div>
        <button onClick={handleClose} className="p-3 hover:bg-white/10 rounded-full transition-colors group">
          <X className="w-6 h-6 text-white/70 group-hover:text-white" />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-24 max-w-5xl w-full mx-auto">
        <div ref={questionWrapRef} className="w-full">
          
          {/* Question Number & Title */}
          <div className="flex items-start gap-4 md:gap-8 mb-4">
            <span className="font-serif italic text-2xl md:text-4xl text-brand-light flex items-center mt-1 md:mt-2">
              {step + 1} <ArrowRight className="w-5 h-5 md:w-8 md:h-8 ml-2 opacity-50" />
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
              {q.title} <span className="text-brand-light/50 text-2xl md:text-4xl align-top">*</span>
            </h1>
          </div>

          {/* Subtitle */}
          {q.subtitle && (
            <p className="text-white/40 text-lg md:text-xl mb-8 ml-12 md:ml-20 font-light max-w-2xl leading-relaxed">
              {q.subtitle}
            </p>
          )}

          {/* Input Area */}
          <div className={`mt-10 md:mt-16 ml-0 md:ml-20`}>
            {q.type === 'choice' ? (
              <div className="flex flex-col gap-4">
                {q.options?.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx); // A, B, C...
                  const isSelected = formData[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleChoiceSelect(opt)}
                      className={`group flex items-center w-full max-w-2xl p-5 md:p-6 border rounded-lg transition-all text-left transform hover:translate-x-2 duration-300
                        ${isSelected ? 'bg-brand/20 border-brand shadow-[0_0_30px_rgba(106,58,93,0.3)]' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}
                      `}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center border text-sm mr-6 font-medium transition-colors rounded
                        ${isSelected ? 'bg-brand border-brand text-white' : 'border-white/20 text-white/50 group-hover:border-white/50 group-hover:text-white'}
                      `}>
                        {letter}
                      </div>
                      <span className={`text-xl md:text-3xl font-light transition-colors ${isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                        {opt}
                      </span>
                      <div className={`ml-auto w-6 h-6 rounded-full border flex items-center justify-center transition-all
                        ${isSelected ? 'border-brand bg-brand' : 'border-white/10 group-hover:border-white/30'}
                      `}>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="relative max-w-3xl group">
                <input
                  ref={inputRef}
                  type={q.type}
                  placeholder={q.placeholder || "Escribe tu respuesta..."}
                  value={formData[q.id] || ''}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, [q.id]: e.target.value }));
                    if (showError) setShowError(false);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  className="w-full bg-transparent border-b border-white/20 focus:border-white text-3xl md:text-5xl py-4 outline-none placeholder:text-white/10 transition-colors font-light text-brand-light"
                  autoComplete="off"
                />
                
                {/* Error message */}
                {showError && (
                  <div className="absolute -bottom-8 left-0 text-red-400 text-sm flex items-center gap-2">
                    Por favor, completa este campo
                  </div>
                )}
                
                {/* OK Button & Hint */}
                <div className="mt-12 flex items-center gap-6">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-4 rounded-md font-medium text-lg transition-all bg-white text-black hover:bg-gray-200"
                  >
                    OK <Check className="w-5 h-5" />
                  </button>
                  <span className="hidden md:flex items-center gap-2 text-white/30 text-sm font-light tracking-wide">
                    presiona <span className="font-bold">Enter ↵</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Navigation & Progress */}
      <footer className="relative z-10 w-full flex flex-col">
        {/* Navigation Arrows */}
        <div className="flex justify-end px-6 md:px-12 mb-6">
          <div className="flex rounded-md overflow-hidden border border-white/10">
            <button 
              onClick={() => navigateTo(step - 1)}
              disabled={step === 0}
              className="p-3 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronUp className="w-5 h-5 text-white/70" />
            </button>
            <div className="w-px bg-white/10" />
            <button 
              onClick={() => navigateTo(step + 1)}
              disabled={step === QUESTIONS.length - 1}
              className="p-3 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronDown className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>
        
        {/* Typeform Progress Bar */}
        <div className="w-full h-1.5 bg-white/10">
          <div 
            className="h-full bg-brand-light transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
    </div>
  );
}
