export default function CareersSection() {
  return (
    <section id="careers" className="py-32 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-24 fade-up">
        <h2 className="font-serif text-4xl md:text-6xl mb-6 text-white"><span className="italic">Vacantes</span></h2>
        <p className="text-white/60 max-w-2xl mx-auto font-light text-lg">
          Somos la agencia creativa detrás de escena. Actualmente estamos expandiendo nuestro equipo y buscando talento excepcional.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 fade-up shadow-2xl">
        {/* Career Card 1 */}
        <a href="https://tally.so/r/814g7P" target="_blank" className="block group p-10 bg-[#080407] hover:bg-[#0a0509] transition-all">
          <div className="text-[10px] text-white/40 mb-8 uppercase tracking-[0.2em] font-medium">Presencial / Híbrido</div>
          <h3 className="text-2xl font-serif text-white mb-4">Roles Creativos</h3>
          <p className="text-sm text-white/60 mb-10 font-light leading-relaxed">
            Fotógrafos, Editores de Video, Creadores de Contenido y Diseñadores Gráficos con base en CDMX.
          </p>
        </a>

        {/* Career Card 2 */}
        <a href="https://tally.so/r/814g7P" target="_blank" className="block group p-10 bg-[#080407] hover:bg-[#0a0509] transition-all">
          <div className="text-[10px] text-white/40 mb-8 uppercase tracking-[0.2em] font-medium">Presencial / Híbrido</div>
          <h3 className="text-2xl font-serif text-white mb-4">Marketing y Estrategia</h3>
          <p className="text-sm text-white/60 mb-10 font-light leading-relaxed">
            Community Managers, Analistas de Marketing y Asistentes Administrativos.
          </p>
        </a>

        {/* Career Card 3 */}
        <a href="https://tally.so/r/GxOJy2" target="_blank" className="block group p-10 bg-[#080407] hover:bg-[#0a0509] transition-all">
          <div className="text-[10px] text-white/40 mb-8 uppercase tracking-[0.2em] font-medium">Remoto / Por proyecto</div>
          <h3 className="text-2xl font-serif text-white mb-4">Operaciones Remotas</h3>
          <p className="text-sm text-white/60 mb-10 font-light leading-relaxed">
            Roles de medio tiempo y por proyecto para colaboradores remotos con base en CDMX.
          </p>
        </a>
      </div>
    </section>
  );
}
