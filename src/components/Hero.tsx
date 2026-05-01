import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image (Placeholder for Video) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat parallax"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2565&auto=format&fit=crop')", // Bakery/Cake image
        }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for text readability */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <span className="text-bakery-gold tracking-widest uppercase text-sm font-semibold mb-4 block">
          Tradycja, która spotyka się z nowoczesnością
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-md">
          Poezja Smaku<br/>w Każdym Kęsie
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-sans font-light">
          Rzemieślnicze pieczywo i artystyczne torty prosto z serca Goworowa.
          Odkryj smak, który łączy pokolenia od 1969 roku.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="#zamow" 
            className="bg-future-dusk text-white px-8 py-4 rounded-full font-medium hover:bg-future-dusk/90 transition-all flex items-center gap-2 text-lg hover-lift shadow-lg"
          >
            Zamów Tort Online <ChevronRight size={20} />
          </Link>
          <Link 
            href="#lokalizacje" 
            className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all flex items-center gap-2 text-lg"
          >
            Nasze Cukiernie
          </Link>
        </div>
      </div>
    </section>
  );
}