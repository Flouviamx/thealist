"use client";
import Invitation3D from "./Invitation3D";

export default function AboutSection() {
  return (
    <section id="comunidad" className="py-32 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="fade-up font-serif text-4xl md:text-6xl mb-8 text-white">Bienvenido a <br/><span className="italic">The A List</span></h2>
          <p className="fade-up text-white/60 text-lg leading-relaxed mb-8 font-light">
            Organizamos eventos privados exclusivos diseñados para fomentar conexiones genuinas. Tu pase de acceso a las mejores experiencias, networking y wellness en el corazón de la Ciudad de México.
          </p>
          <div className="fade-up grid grid-cols-2 gap-4 mt-12">
            {['Amigos', 'Citas', 'Experiencias', 'Networking', 'Música', 'Wellness'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/60 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-brand-light rounded-full shadow-[0_0_10px_rgba(106,58,93,0.8)]" /> 
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="fade-up relative h-[600px] md:h-[800px] w-full flex items-center justify-center">
          <Invitation3D />
        </div>
      </div>
    </section>
  );
}
