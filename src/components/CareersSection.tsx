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
    <section id="careers" className="py-20 md:py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-32 fade-up gap-8 lg:gap-8">
        <div>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[1.1] tracking-tighter text-white">
            Únete al equipo
          </h2>
        </div>
        
        <p className="text-white/50 max-w-md font-light text-base md:text-xl leading-relaxed lg:pb-6">
          Somos la agencia creativa detrás de escena. Actualmente estamos expandiendo nuestro equipo y buscando talento excepcional.
        </p>
      </div>

      {/* Job List */}
      <div className="border-t border-white/10 fade-up">
        {jobs.map((job, i) => (
          <a 
            key={i} 
            href={job.link} 
            target="_blank" 
            className="group flex flex-col py-8 md:py-16 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500 -mx-4 px-4"
          >
            {/* Top row: Number + Title */}
            <div className="flex items-start gap-4 sm:gap-6 md:gap-8 mb-4 md:mb-0">
              <span className="font-serif italic text-white/20 text-lg md:text-2xl group-hover:text-brand-light transition-colors duration-500 flex-shrink-0 mt-1 md:mt-2">
                0{i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white transition-all duration-300 tracking-tight break-words mb-4 md:mb-6">
                  {job.title}
                </h3>
                <p className="text-white/50 font-light text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors duration-500 max-w-lg">
                  {job.desc}
                </p>
              </div>
            </div>

            {/* Bottom row: Tag + Arrow */}
            <div className="flex items-center justify-between mt-6 md:mt-8 pl-8 sm:pl-10 md:pl-16">
              <div className="text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-sm group-hover:border-white/30 group-hover:text-white/80 transition-colors duration-500">
                {job.tag}
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-500">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-black transition-colors duration-500" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
