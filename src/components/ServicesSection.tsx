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
    <section id="business" className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
      {/* Asymmetrical Grid */}
      <div className="grid md:grid-cols-2 gap-16 md:gap-32 md:pl-8">
        
        {/* Community Column (Staggered slightly down) */}
        <div className="fade-up md:pt-24">
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-2 italic tracking-tight">The A List</h3>
          <div className="text-white/50 font-sans text-xs tracking-[0.2em] uppercase mb-12 font-medium">
            (Community)
          </div>
          
          <ul className="flex flex-col border-t border-white/10">
            {communityItems.map((text, i) => (
              <li key={i} className="py-8 border-b border-white/10 text-white/60 font-light text-base md:text-lg leading-relaxed flex items-start gap-6 group cursor-default transition-all duration-500 hover:bg-white/[0.02] -mx-4 px-4 md:-mx-8 md:px-8">
                <span className="text-white/20 font-serif italic text-xl md:text-2xl mt-0.5 group-hover:text-brand-light transition-colors duration-500">
                  0{i + 1}
                </span>
                <span className="group-hover:text-white transition-colors duration-500">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Column (Header sits in the top negative space) */}
        <div className="flex flex-col">
          {/* Editorial Right-Aligned Header */}
          <div className="mb-24 md:mb-32 fade-up text-right">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-none text-white tracking-tighter">
              ¿Qué <span className="italic">Hacemos?</span>
            </h2>
          </div>

          <div className="fade-up">
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-2 italic tracking-tight">The A List</h3>
            <div className="text-white/50 font-sans text-xs tracking-[0.2em] uppercase mb-12 font-medium">
              (For Business)
            </div>
          
          <ul className="flex flex-col border-t border-white/10">
            {businessItems.map((text, i) => (
              <li key={i} className="py-8 border-b border-white/10 text-white/60 font-light text-base md:text-lg leading-relaxed flex items-start gap-6 group cursor-default transition-all duration-500 hover:bg-white/[0.02] -mx-4 px-4 md:-mx-8 md:px-8">
                <span className="text-white/20 font-serif italic text-xl md:text-2xl mt-0.5 group-hover:text-brand-light transition-colors duration-500">
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
