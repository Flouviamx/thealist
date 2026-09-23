"use client";
import Invitation3D from "./Invitation3D";

export default function AboutSection() {
  return (
    <section id="comunidad" className="py-20 md:py-32 px-4 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left: Text Content */}
        <div className="relative z-10">
          <h2 className="fade-up font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tighter text-white mb-8 md:mb-12">
            Bienvenido a <br/>
            <span className="italic">The A List</span>
          </h2>
          
          <p className="fade-up text-white/50 text-lg md:text-xl lg:text-2xl font-light leading-[1.6] mb-10 md:mb-16 pl-5 md:pl-6 border-l border-white/10">
            Organizamos eventos privados exclusivos diseñados para fomentar conexiones genuinas. Tu pase de acceso a las mejores experiencias, networking y wellness en el corazón de la Ciudad de México.
          </p>
          
          <div className="fade-up flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            {['Amigos', 'Citas', 'Experiencias', 'Networking', 'Música', 'Wellness'].map((item) => (
              <div 
                key={item} 
                className="px-4 py-2 md:px-5 md:py-2.5 rounded-sm border border-white/10 text-[10px] sm:text-xs text-white/60 uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-default"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Invitation */}
        <div className="fade-up relative h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] w-full flex items-center justify-center">
          {/* Subtle glow behind the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand/10 blur-[100px] rounded-full pointer-events-none" />
          <Invitation3D />
        </div>
        
      </div>
    </section>
  );
}
