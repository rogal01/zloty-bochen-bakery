import Link from "next/link";
import { Mail, MapPin, Phone, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-future-dusk text-white/80 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex flex-col items-start mb-6">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                ROMANOWSKI
              </span>
              <span className="text-[11px] tracking-[0.3em] uppercase text-bakery-gold mt-1">
                Tradycja od 1969
              </span>
            </Link>
            <p className="font-light mb-8 max-w-sm">
              Od 1969 roku dostarczamy świeże pieczywo i artystyczne torty do domów w 22 miejscowościach regionu. Twoje zaufanie to nasz największy sukces.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bakery-gold hover:text-future-dusk transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bakery-gold hover:text-future-dusk transition-colors">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif text-xl">Szybkie linki</h4>
            <ul className="space-y-4 font-light">
              <li><Link href="#nasza-historia" className="hover:text-bakery-gold transition-colors">Nasza Historia</Link></li>
              <li><Link href="#poezja-smaku" className="hover:text-bakery-gold transition-colors">Torty Poezja Smaku</Link></li>
              <li><Link href="#piekarnia" className="hover:text-bakery-gold transition-colors">Piekarnia i Ciastkarnia</Link></li>
              <li><Link href="#lokalizacje" className="hover:text-bakery-gold transition-colors">Znajdź Cukiernię</Link></li>
              <li><Link href="#zamow" className="hover:text-bakery-gold transition-colors">Skonfiguruj Tort</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif text-xl">Kontakt główny</h4>
            <ul className="space-y-4 font-light">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-bakery-gold shrink-0" />
                <span>Goworowo, ul. Rynek 18<br/>07-440 Goworowo</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-bakery-gold shrink-0" />
                <span>+48 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-bakery-gold shrink-0" />
                <span>kontakt@piekarniaromanowski.pl</span>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} Cukiernia-Piekarnia Romanowski. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Polityka Prywatności</Link>
            <Link href="#" className="hover:text-white transition-colors">Regulamin Sklepu</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}