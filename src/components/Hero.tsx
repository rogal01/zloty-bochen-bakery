import { ChevronRight, Sparkles, Flame } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat parallax scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2565&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto my-auto">
        <div className="inline-flex items-center gap-2 text-bakery-gold tracking-widest uppercase text-xs font-bold mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
          <Sparkles size={14} className="text-bakery-gold" />
          Rzemieślnicza Manufaktura Pieczywa & Cukiernictwa · Warmia 1989
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg leading-tight">
          Piekarnia Romanowski<br />
          <span className="italic font-normal text-bakery-cream">kunszt i czysty skład</span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-sans font-light leading-relaxed">
          Prawdziwy chleb na 35-letnim zakwasie z mąki żarnowej, autorskie torty okolicznościowe modelowane w 3D oraz 6 lokalnych pracowni wypieku.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#zamow"
            className="w-full sm:w-auto bg-future-dusk text-white px-8 py-4 rounded-full font-bold hover:bg-future-dusk/90 transition-all flex items-center justify-center gap-2 text-base hover-lift shadow-xl border border-white/10"
          >
            <Sparkles size={18} className="text-bakery-gold" /> Skonfiguruj Tort w 3D <ChevronRight size={18} />
          </Link>
          <Link
            href="#oferta-chlebowa"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-base hover-lift"
          >
            <Flame size={18} className="text-amber-400" /> Poznaj Chleby na Zakwasie
          </Link>
        </div>
      </div>
    </section>
  );
}

