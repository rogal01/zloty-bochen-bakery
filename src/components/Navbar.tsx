"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col items-center z-50">
            <span className={`font-serif text-2xl font-bold tracking-tight ${scrolled ? "text-future-dusk" : "text-white"}`}>
              ZŁOTY BOCHEN
            </span>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${scrolled ? "text-bakery-gold" : "text-white/80"}`}>
              Od 1989
            </span>
          </Link>

          <div className={`hidden md:flex items-center space-x-8 font-medium ${scrolled ? "text-slate-700" : "text-white/90"}`}>
            <Link href="#nasza-historia" className="hover:text-bakery-gold transition-colors">Historia</Link>
            <Link href="#torty" className="hover:text-bakery-gold transition-colors">Torty</Link>
            <Link href="#piekarnia" className="hover:text-bakery-gold transition-colors">Piekarnia</Link>
            <Link href="#lokalizacje" className="flex items-center gap-1 hover:text-bakery-gold transition-colors">
              <MapPin size={16} /> <span>6 Lokalizacji</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 z-50">
            <button className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              scrolled
                ? "bg-transcendent-pink text-future-dusk hover:bg-transcendent-pink/80"
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            }`}>
              <ShoppingBag size={18} />
              <span>Zaloguj / Koszyk</span>
            </button>

            <button
              className={`md:hidden ${scrolled || isMobileMenuOpen ? "text-future-dusk" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Przełącz menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-4 flex flex-col space-y-4 text-future-dusk">
          <Link href="#nasza-historia" className="text-lg font-medium p-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Historia</Link>
          <Link href="#torty" className="text-lg font-medium p-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Torty</Link>
          <Link href="#piekarnia" className="text-lg font-medium p-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Piekarnia</Link>
          <Link href="#lokalizacje" className="text-lg font-medium p-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>6 Lokalizacji</Link>
          <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-medium bg-transcendent-pink text-future-dusk mt-4">
            <ShoppingBag size={20} />
            <span>Zaloguj / Koszyk</span>
          </button>
        </div>
      )}
    </nav>
  );
}
