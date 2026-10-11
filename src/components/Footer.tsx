"use client";
import Link from "next/link";
import { Mail, MapPin, Phone, Globe, Share2, Cookie, ExternalLink } from "lucide-react";

export default function Footer() {
  const openCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
    }
  };

  return (
    <footer className="bg-future-dusk text-white/80 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex flex-col items-start mb-6">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                PIEKARNIA ROMANOWSKI
              </span>
              <span className="text-[11px] tracking-[0.3em] uppercase text-bakery-gold mt-1 font-semibold">
                Warmia · Tradycja od 1989
              </span>
            </Link>
            <p className="font-light mb-8 max-w-sm text-sm text-white/75 leading-relaxed">
              Rzemieślnicza piekarnia i manufaktura tortów artystycznych. Długo dojrzewające ciasto na 35-letnim zakwasie macierzystym, mąka z młyna żarnowego i autorskie cukiernictwo okolicznościowe.
            </p>
            <div className="flex gap-3">
              <a
                href="#zamow"
                aria-label="Konfigurator tortu 3D"
                className="h-10 px-4 rounded-xl bg-white/10 flex items-center gap-2 hover:bg-bakery-gold hover:text-future-dusk text-xs font-bold transition-colors"
              >
                <span>Konfigurator 3D</span>
              </a>
              <a
                href="#oferta-chlebowa"
                aria-label="Oferta chlebów"
                className="h-10 px-4 rounded-xl bg-white/10 flex items-center gap-2 hover:bg-bakery-gold hover:text-future-dusk text-xs font-bold transition-colors"
              >
                <span>Pieczywo na zakwasie</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif text-xl">Pracownia & Oferta</h4>
            <ul className="space-y-3.5 font-light text-sm">
              <li><Link href="#nasza-historia" className="hover:text-bakery-gold transition-colors">Nasza Historia od 1989</Link></li>
              <li><Link href="#oferta-chlebowa" className="hover:text-bakery-gold transition-colors">Nuty Fermentacji & Chleby</Link></li>
              <li><Link href="#zamow" className="hover:text-bakery-gold transition-colors">Konfigurator Tortów 3D</Link></li>
              <li><Link href="#lokalizacje" className="hover:text-bakery-gold transition-colors">Pracownie & Punkty Odbioru</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif text-xl">Kontakt z Piekarnią</h4>
            <ul className="space-y-3.5 font-light text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-bakery-gold shrink-0" />
                <span>ul. Miodowa 12<br />Nowe Brzegi (Warmia)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-bakery-gold shrink-0" />
                <span>+48 500 700 900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-bakery-gold shrink-0" />
                <span>zamowienia@piekarniaromanowski.pl</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Rogal Studio Signature Watermark & Compliance Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-white/70">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} Piekarnia & Cukiernia Romanowski. Wszelkie prawa zastrzeżone.</p>
            <span className="hidden sm:inline text-white/30">·</span>
            <a
              href="https://rogalstudio.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-bakery-gold hover:text-white font-medium transition-colors"
            >
              Wykonanie & Architektura Kodu: Rogal Studio <ExternalLink size={12} />
            </a>
          </div>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            <button
              onClick={openCookieSettings}
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-bakery-gold transition-colors cursor-pointer"
            >
              <Cookie size={13} /> Ustawienia Cookies
            </button>
            <Link href="#" className="hover:text-white transition-colors">Polityka Prywatności RODO</Link>
            <Link href="#" className="hover:text-white transition-colors">Regulamin Rezerwacji</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

