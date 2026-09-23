export default function Footer() {
  return (
    <footer className="border-t border-white/5 text-white/60 pt-16 pb-8 px-6 md:px-12 text-sm font-light">
      <div className="max-w-[1400px] mx-auto">

        {/* Top Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl text-white">The <span className="italic">A</span> List.</h3>
          </div>
          <div>
            <p className="mb-8">
              <a href="mailto:thealist.mexicocity@gmail.com" className="hover:text-white transition-colors block">thealist.mexicocity@gmail.com</a>
            </p>
            <p>
              <a href="https://instagram.com/thealist.mexicocity" target="_blank" className="hover:text-white transition-colors">@thealist.mexicocity</a>
            </p>
          </div>
          <div>
            <p className="mb-2 text-white text-xs uppercase tracking-widest">Sede Principal</p>
            <p className="mb-8 leading-relaxed">
              Ciudad de México, CDMX<br/>
              México
            </p>
          </div>
          <div>
            <p className="mb-2 text-white text-xs uppercase tracking-widest">Bolsa de Trabajo</p>
            <p className="mb-8 leading-relaxed">
              Presencial / Híbrido<br/>
              Remoto
            </p>
            <p>
              <a href="#careers" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">Ver Vacantes</a>
            </p>
          </div>
        </div>

        {/* Middle Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-white/5">
          <div className="md:col-span-1 pr-8">
            <p className="mb-6 leading-relaxed">
              Únete a nuestra lista para recibir invitaciones exclusivas a eventos y actualizaciones de nuestra comunidad.
            </p>
            <p className="text-xs text-white uppercase tracking-widest mb-4 font-medium">Nuestro Newsletter</p>
            <form className="flex border border-white/10 focus-within:border-white/30 transition-colors rounded-md overflow-hidden">
              <input 
                type="email" 
                placeholder="Tu Correo Electrónico" 
                className="bg-transparent px-4 py-3 outline-none flex-1 w-full text-white placeholder:text-white/30 text-sm"
              />
              <button type="button" className="px-6 py-3 border-l border-white/10 hover:bg-white/10 transition-colors uppercase tracking-widest text-[10px] text-white">
                Suscribir
              </button>
            </form>
            <p className="text-[10px] mt-4 text-white/30">
              Al suscribirte aceptas nuestra <a href="#" className="underline decoration-white/20 hover:text-white">Política de Privacidad</a>.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs text-white uppercase tracking-widest mb-2 font-medium">Explorar</p>
            <a href="#comunidad" className="hover:text-white transition-colors">Comunidad</a>
            <a href="#business" className="hover:text-white transition-colors">Business</a>
            <a href="https://linktr.ee/thealist.mexicocity" target="_blank" className="hover:text-white transition-colors">Linktree</a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs text-white uppercase tracking-widest mb-2 font-medium">Únete</p>
            <a href="https://tally.so/r/7RrpqL" target="_blank" className="hover:text-white transition-colors">Aplicar a Comunidad</a>
            <a href="https://tally.so/r/814g7P" target="_blank" className="hover:text-white transition-colors">Vacantes CDMX</a>
            <a href="https://tally.so/r/GxOJy2" target="_blank" className="hover:text-white transition-colors">Vacantes Remotas</a>
            <a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs text-white uppercase tracking-widest mb-2 font-medium">Legal</p>
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between pt-8 text-[10px] uppercase tracking-widest text-white/30">
          <p>© {new Date().getFullYear()} The A List. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0 hover:text-white transition-colors cursor-pointer">Bienvenido a The A List / Ciudad de México</p>
        </div>
      </div>
    </footer>
  );
}
