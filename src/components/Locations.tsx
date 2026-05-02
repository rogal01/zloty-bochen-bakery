import { MapPin, Clock, Phone } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function Locations() {
  const locations = await prisma.location.findMany({
    orderBy: { city: "asc" },
  });

  return (
    <section id="lokalizacje" className="py-24 bg-future-dusk text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-bakery-gold uppercase tracking-widest text-sm font-semibold mb-4 block flex items-center justify-center gap-2">
            <MapPin size={16} /> Fikcyjna sieć odbioru
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">6 Lokalizacji dla Ciebie</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-light">
            Znajdź najbliższą pracownię Złotego Bochna i odbierz swoje zamówienie
            dzięki wygodnemu systemowi Click & Collect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <div key={loc.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-2xl font-bold">{loc.city}</h3>
                {loc.openSunday && (
                  <span className="bg-bakery-gold text-future-dusk text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                    Otwarte w Niedzielę
                  </span>
                )}
              </div>

              <div className="space-y-3 text-white/80 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-bakery-gold shrink-0" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 text-bakery-gold shrink-0" />
                  <span>{loc.type}</span>
                </div>
                {loc.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="mt-0.5 text-bakery-gold shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                )}
                {loc.desc && (
                  <p className="italic text-white/60 mt-2">{loc.desc}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="text-bakery-gold border border-bakery-gold px-8 py-3 rounded-full hover:bg-bakery-gold hover:text-future-dusk transition-colors font-medium">
            Pokaż wszystkie lokalizacje na mapie
          </button>
        </div>
      </div>
    </section>
  );
}
