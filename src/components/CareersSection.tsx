import { ArrowUpRight } from "lucide-react";

export default function CareersSection() {
  const jobs = [
    {
      title: "Roles Creativos",
      desc: "Fotógrafos, Editores de Video, Creadores de Contenido y Diseñadores Gráficos con base en CDMX.",
      tag: "Presencial / Híbrido",
      link: "https://tally.so/r/814g7P"
    },
    {
      title: "Marketing y Estrategia",
      desc: "Community Managers, Analistas de Marketing y Asistentes Administrativos.",
      tag: "Presencial / Híbrido",
      link: "https://tally.so/r/814g7P"
    },
    {
      title: "Operaciones Remotas",
      desc: "Roles de medio tiempo y por proyecto para colaboradores remotos con base en CDMX.",
      tag: "Remoto / Por proyecto",
      link: "https://tally.so/r/GxOJy2"
    }
  ];

  return (
    <section id="careers" className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
      
      {/* Editorial 2-Column Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 md:mb-32 fade-up gap-12 lg:gap-8">
        <div>
          <h2 className="font-serif text-6xl md:text-7xl lg:text-[7rem] leading-[1.1] tracking-tighter text-white">
            Únete al equipo
          </h2>
        </div>
        
        <p className="text-white/50 max-w-md font-light text-lg md:text-xl leading-relaxed lg:pb-6">
          Somos la agencia creativa detrás de escena. Actualmente estamos expandiendo nuestro equipo y buscando talento excepcional.
        </p>
      </div>

      {/* Borderless Interactive Job List */}
      <div className="border-t border-white/10 fade-up">
        {jobs.map((job, i) => (
          <a 
            key={i} 
            href={job.link} 
            target="_blank" 
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start lg:items-center py-12 md:py-16 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500 -mx-4 px-4 md:-mx-8 md:px-8"
          >
            {/* Left: Number + Title */}
            <div className="flex items-start md:items-center gap-6 md:gap-8 lg:col-span-5 min-w-0">
              <span className="font-serif italic text-white/20 text-xl md:text-2xl group-hover:text-brand-light transition-colors duration-500 flex-shrink-0">
                0{i + 1}
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-white group-hover:italic transition-all duration-300 tracking-tight break-words">
                {job.title}
              </h3>
            </div>

            {/* Middle: Description */}
            <div className="lg:col-span-4 min-w-0">
              <p className="text-white/50 font-light text-base leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                {job.desc}
              </p>
            </div>

            {/* Right: Tag & Arrow */}
            <div className="flex items-center justify-between lg:justify-end gap-6 lg:col-span-3 min-w-0 mt-4 lg:mt-0">
              <div className="text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium border border-white/10 px-5 py-2.5 rounded-full group-hover:border-white/30 group-hover:text-white/80 transition-colors duration-500 whitespace-nowrap">
                {job.tag}
              </div>
              <div className="w-12 h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-colors duration-500" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
