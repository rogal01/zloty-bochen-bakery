"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Sparkles, Menu, X, Wheat } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3.5 border-b border-slate-100" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col items-start z-50">
            <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight transition-colors ${scrolled ? "text-future-dusk" : "text-white"}`}>
              ROMANOWSKI
            </span>
            <span className={`text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-semibold transition-colors ${scrolled ? "text-bakery-gold" : "text-white/80"}`}>
              Piekarnia & Torty · 1989
            </span>
          </Link>

          <div className={`hidden md:flex items-center space-x-8 text-sm font-medium ${scrolled ? "text-slate-700" : "text-white/90"}`}>
            <Link href="#nasza-historia" className="hover:text-bakery-gold transition-colors">Nasza Historia</Link>
            <Link href="#oferta-chlebowa" className="hover:text-bakery-gold transition-colors flex items-center gap-1.5">
              <Wheat size={15} /> <span>Chleby na Zakwasie</span>
            </Link>
            <Link href="#zamow" className="hover:text-bakery-gold transition-colors flex items-center gap-1.5">
              <Sparkles size={15} /> <span>Konfigurator 3D</span>
            </Link>
            <Link href="#lokalizacje" className="flex items-center gap-1.5 hover:text-bakery-gold transition-colors">
              <MapPin size={15} /> <span>6 Pracowni</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3 z-50">
            <Link
              href="#zamow"
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all hover-lift shadow-sm ${
                scrolled
                  ? "bg-future-dusk text-white hover:bg-future-dusk/90"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30"
              }`}
            >
              <Sparkles size={14} className="text-bakery-gold" />
              <span>Zaprojektuj Tort 3D</span>
            </Link>

            <button
              className={`md:hidden p-2 rounded-lg ${scrolled || isMobileMenuOpen ? "text-future-dusk" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Przełącz menu mobilne"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl py-6 px-6 flex flex-col space-y-4 text-future-dusk border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="#nasza-historia"
            className="text-base font-semibold py-2 border-b border-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Nasza Historia
          </Link>
          <Link
            href="#oferta-chlebowa"
            className="text-base font-semibold py-2 border-b border-gray-100 flex items-center justify-between"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Nuty Fermentacji & Chleby</span>
            <Wheat size={18} className="text-bakery-gold" />
          </Link>
          <Link
            href="#zamow"
            className="text-base font-semibold py-2 border-b border-gray-100 flex items-center justify-between"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Konfigurator Tortu 3D</span>
            <Sparkles size={18} className="text-bakery-gold" />
          </Link>
          <Link
            href="#lokalizacje"
            className="text-base font-semibold py-2 border-b border-gray-100 flex items-center justify-between"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>6 Pracowni w Regionie</span>
            <MapPin size={18} className="text-bakery-gold" />
          </Link>
          <Link
            href="#zamow"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-future-dusk text-white mt-4 shadow-md"
          >
            <Sparkles size={16} className="text-bakery-gold" />
            <span>Zaprojektuj Tort w 3D</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

