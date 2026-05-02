import { ArrowRight, Cake, Croissant } from "lucide-react";
import Link from "next/link";

export default function Products() {
  const cakeCategories = [
    {
      title: "Klasyczne",
      desc: "Lekkie bazy owocowe, biszkopt waniliowy, malinowy krem i cytrynowe przełamanie.",
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Premium",
      desc: "Royal Choco, Royal Karmel i Pistacja. Bogate musy, orzechy i chrupiące warstwy.",
      img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Artystyczne",
      desc: "Torty 3D, z nadrukiem. Pełna personalizacja opłatka i dekoracji.",
      img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 bg-bakery-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="torty" className="mb-24">
          <div className="text-center mb-16">
            <span className="text-bakery-gold uppercase tracking-widest text-sm font-semibold mb-4 block flex items-center justify-center gap-2">
              <Cake size={16} /> Pracownia premium
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-future-dusk mb-6">Torty Złotego Bochna</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Torty, które tworzą wspomnienia. Niezależnie czy to elegancki tort na wesele,
              czy radosny wypiek na urodziny. Przygotowywane na zamówienie z dbałością o każdy detal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cakeCategories.map((cat) => (
              <div key={cat.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover-lift flex flex-col">
                <div className="h-64 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${cat.img}')` }}
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif text-future-dusk mb-3">{cat.title}</h3>
                    <p className="text-slate-600 mb-6 font-light">{cat.desc}</p>
                  </div>
                  <Link href="#zamow" className="text-bakery-gold font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Wybierz smak <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="#zamow"
              className="inline-flex items-center gap-2 bg-future-dusk text-white px-8 py-4 rounded-full font-medium hover:bg-future-dusk/90 transition-all hover-lift shadow-lg"
            >
              Skonfiguruj Własny Tort w 3D
            </Link>
          </div>
        </div>

        <div id="piekarnia" className="bg-white rounded-3xl p-8 md:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-bakery-gold/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <span className="text-bakery-gold uppercase tracking-widest text-sm font-semibold mb-4 block flex items-center gap-2">
                <Croissant size={16} /> Nasza Piekarnia
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-future-dusk mb-6">Chleb, jak dawniej.</h2>
              <p className="text-lg text-slate-600 mb-6 font-light leading-relaxed">
                W naszych fikcyjnych pracowniach zapach świeżego chleba unosi się już od świtu.
                Stosujemy tradycyjne metody fermentacji i receptury dobrane do charakteru lokalnej piekarni.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-bakery-gold" />
                  <span>Tradycyjne receptury i jasna komunikacja oferty</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-bakery-gold" />
                  <span>Brak sztucznych polepszaczy smaku</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-bakery-gold" />
                  <span>Mąka od lokalnych, sprawdzonych dostawców</span>
                </li>
              </ul>
              <Link href="#oferta-piekarni" className="text-future-dusk border-b-2 border-bakery-gold pb-1 font-medium hover:text-bakery-gold transition-colors inline-block">
                Poznaj ofertę wypieków
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="h-48 md:h-64 rounded-2xl bg-cover bg-center shadow-md"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop')" }}
              />
              <div
                className="h-48 md:h-64 rounded-2xl bg-cover bg-center shadow-md mt-8"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1000&auto=format&fit=crop')" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
