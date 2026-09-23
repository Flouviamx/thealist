export default function ServicesSection() {
  const communityItems = [
    "Eventos para la comunidad (speed dating, speed friending, networking, música y experiencias)",
    "Beneficios exclusivos y descuentos para miembros",
    "Te conectamos con oportunidades de trabajo",
    "Reservaciones, recomendaciones, info de openings y hot spots en CDMX",
    "Travel guide (gestionamos tu visita a la CDMX de inicio a fin)"
  ];

  const businessItems = [
    "Head Hunting para tu negocio: te conectamos con el mejor talento",
    "Social Media para tu negocio (estrategia, creación de contenido y seguimiento)",
    "Public Relations (PR)",
    "Producción de eventos y experiencias curadas para tu negocio"
  ];

  return (
    <section id="business" className="py-20 md:py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
      
      {/* Mobile: Title on top. Desktop: Title in right column */}
      <div className="md:hidden mb-16 fade-up">
        <h2 className="font-serif text-4xl sm:text-5xl leading-none text-white tracking-tighter text-right">
          ¿Qué <span className="italic">Hacemos?</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 lg:gap-32">
        
        {/* Community Column */}
        <div className="fade-up md:pt-24">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-2 italic tracking-tight">The A List</h3>
          <div className="text-white/50 font-sans text-xs tracking-[0.2em] uppercase mb-8 md:mb-12 font-medium">
            (Community)
          </div>
          
          <ul className="flex flex-col border-t border-white/10">
            {communityItems.map((text, i) => (
              <li key={i} className="py-6 md:py-8 border-b border-white/10 text-white/60 font-light text-sm md:text-lg leading-relaxed flex items-start gap-4 md:gap-6 group cursor-default transition-all duration-500 hover:bg-white/[0.02] -mx-4 px-4">
                <span className="text-white/20 font-serif italic text-lg md:text-2xl mt-0.5 group-hover:text-brand-light transition-colors duration-500 flex-shrink-0">
                  0{i + 1}
                </span>
                <span className="group-hover:text-white transition-colors duration-500">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Column */}
        <div className="flex flex-col">
          {/* Desktop-only header in the right negative space */}
          <div className="hidden md:block mb-24 lg:mb-32 fade-up text-right">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-none text-white tracking-tighter">
              ¿Qué <span className="italic">Hacemos?</span>
            </h2>
          </div>

          <div className="fade-up">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-2 italic tracking-tight">The A List</h3>
            <div className="text-white/50 font-sans text-xs tracking-[0.2em] uppercase mb-8 md:mb-12 font-medium">
              (For Business)
            </div>
          
            <ul className="flex flex-col border-t border-white/10">
              {businessItems.map((text, i) => (
                <li key={i} className="py-6 md:py-8 border-b border-white/10 text-white/60 font-light text-sm md:text-lg leading-relaxed flex items-start gap-4 md:gap-6 group cursor-default transition-all duration-500 hover:bg-white/[0.02] -mx-4 px-4">
                  <span className="text-white/20 font-serif italic text-lg md:text-2xl mt-0.5 group-hover:text-brand-light transition-colors duration-500 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <span className="group-hover:text-white transition-colors duration-500">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
