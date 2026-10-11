"use client";
import React, { useState } from "react";
import {
  Wheat,
  Croissant,
  Cake,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Droplets,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

type ProductCategory = "sourdough" | "baguettes" | "sweet" | "cakes";

type ProductItem = {
  id: string;
  category: ProductCategory;
  title: string;
  subtitle: string;
  image: string;
  fermentationTime: string;
  sourdoughAge?: string;
  hydration?: string;
  crunchScore: string;
  flourType: string;
  cleanLabels: string[];
  flavorNotes: string;
  priceEstimate: string;
  featured?: boolean;
};

const CATEGORIES: { id: ProductCategory; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "sourdough", label: "Chleby na zakwasie", icon: Wheat },
  { id: "baguettes", label: "Bagietki & Bułki", icon: Croissant },
  { id: "sweet", label: "Drożdżówki & Rogale", icon: Sparkles },
  { id: "cakes", label: "Torty & Monoporcje", icon: Cake },
];

const PRODUCTS: ProductItem[] = [
  {
    id: "chleb-zytni-razowy",
    category: "sourdough",
    title: "Chleb Żytni Razowy 100%",
    subtitle: "35-letni zakwas macierzysty z 1989 roku",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
    fermentationTime: "48h w chłodzie (4°C)",
    sourdoughAge: "35 lat (od 1989)",
    hydration: "78%",
    crunchScore: "9/10",
    flourType: "Mąka żytnia z młyna żarnowego T2000 Warmia",
    cleanLabels: ["0% polepszaczy", "Bez drożdży piekarskich", "Czysty skład", "7 dni świeżości"],
    flavorNotes: "Głęboki aromat palonego słodu, wyrazista kwasowość suszonej śliwki i gęsty, wilgotny miękisz.",
    priceEstimate: "14 zł / 800g",
    featured: true,
  },
  {
    id: "chleb-wiejski",
    category: "sourdough",
    title: "Chleb Wiejski Tradycyjny",
    subtitle: "Piec szamotowy opalany drewnem bukowym",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1000&auto=format&fit=crop",
    fermentationTime: "24h powolne garowanie w koszach wiklinowych",
    sourdoughAge: "35 lat",
    hydration: "75%",
    crunchScore: "10/10",
    flourType: "Mąka pszenna chlebowa T750 & żytnia T720",
    cleanLabels: ["Piec szamotowy 250°C", "Woda źródlana", "Zero chemii"],
    flavorNotes: "Mocno skarmelizowana, gruba i trzaskająca skórka z maślanym aromatem naturalnej pszenicy.",
    priceEstimate: "12 zł / 700g",
    featured: true,
  },
  {
    id: "chleb-orkiszowy-miodowy",
    category: "sourdough",
    title: "Chleb Orkiszowy ze Słonecznikiem",
    subtitle: "Pradawne ziarno Schwabendorn & miód leśny",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=1000&auto=format&fit=crop",
    fermentationTime: "30h fermentacji na zakwasie orkiszowym",
    sourdoughAge: "20 lat",
    hydration: "76%",
    crunchScore: "8/10",
    flourType: "Mąka orkiszowa jasna T630 & razowa T1850",
    cleanLabels: ["Miód z pasieki mazurskiej", "Niski indeks glikemiczny", "Prażone ziarna"],
    flavorNotes: "Lekko orzechowy posmak prażonego słonecznika z delikatną słodyczą lipowego miodu.",
    priceEstimate: "16 zł / 650g",
  },
  {
    id: "bagietka-tradycyjna",
    category: "baguettes",
    title: "Bagietka Tradycyjna Poolish",
    subtitle: "Klasyczna metoda fermentacji wstępnej",
    image: "https://images.unsplash.com/photo-1597079910443-60c43fc4f729?q=80&w=1000&auto=format&fit=crop",
    fermentationTime: "18h zaczyn poolish w temperaturze kontrolowanej",
    hydration: "80%",
    crunchScore: "10/10",
    flourType: "Francuska mąka pszenna T65 Tradition",
    cleanLabels: ["Ręcznie formowana", "Sól kłodawska niejodowana", "Duże napowietrzenie"],
    flavorNotes: "Cienka, szklista skórka, która pęka pod palcami, oraz wielkie nieregularne pory w miękiszu.",
    priceEstimate: "7 zł / 250g",
  },
  {
    id: "bulki-orkiszowe-dynia",
    category: "baguettes",
    title: "Bułki Śniadaniowe z Prażoną Dynią",
    subtitle: "Lekkie pieczywo śniadaniowe z chrupiącą posypką",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=1000&auto=format&fit=crop",
    fermentationTime: "14h dojrzewania chłodniczego",
    hydration: "73%",
    crunchScore: "8/10",
    flourType: "Mąka orkiszowa T630 & pszenna T550",
    cleanLabels: ["Pestki dyni z polskich upraw", "0% polepszaczy"],
    flavorNotes: "Aksamitny środek i chrupiące, prażone pestki dyni na wierzchu.",
    priceEstimate: "3.50 zł / szt.",
  },
  {
    id: "rogal-maslany-cynamon",
    category: "sweet",
    title: "Kardamonka & Rogal Maślany",
    subtitle: "100% Masło ekstra 82% z lokalnej mleczarni",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop",
    fermentationTime: "16h wieloetapowego listkowania ciasta",
    crunchScore: "9/10",
    flourType: "Mąka tortowa T450 & czyste masło 82%",
    cleanLabels: ["Zero margaryny", "Kardamon z całych ziaren", "Cukier trzcinowy"],
    flavorNotes: "Karmelizowane masło, korzenny kardamon i dziesiątki kruchych, maślanych warstw.",
    priceEstimate: "9 zł / szt.",
    featured: true,
  },
  {
    id: "drozdzowka-jagody",
    category: "sweet",
    title: "Drożdżówka z Jagodami Leśnymi",
    subtitle: "Jagody z Puszczy Piskiej & kruszonka maślana",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000&auto=format&fit=crop",
    fermentationTime: "Długie wyrastanie na żółtkach kur z wolnego wybiegu",
    crunchScore: "7/10",
    flourType: "Mąka pszenna T500 & masło śmietankowe",
    cleanLabels: ["100% jagody leśne", "Kruszonka waniliowa", "Jaja z wolnego wybiegu"],
    flavorNotes: "Soczyste, lekko cierpkie leśne jagody otulone puszystym, wilgotnym ciastem drożdżowym.",
    priceEstimate: "8.50 zł / szt.",
  },
  {
    id: "tort-royal-choco",
    category: "cakes",
    title: "Tort Royal Choco & Pralina",
    subtitle: "Gorzka czekolada 70% Single Origin & orzech laskowy",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
    fermentationTime: "48h dojrzewania musów czekoladowych",
    crunchScore: "8/10",
    flourType: "Biszkopt migdałowy bezglutenowy & kakao Valrhona",
    cleanLabels: ["Czekolada 70%", "Śmietanka 36%", "Chrupka pralinowa"],
    flavorNotes: "Głębokie nuty prażonego kakao, chrupiące orzechy laskowe w karmelu i aksamitny ganache.",
    priceEstimate: "od 140 zł (konfigurowalny)",
  },
  {
    id: "tort-pistacja-malina",
    category: "cakes",
    title: "Tort Leśna Pistacja z Maliną",
    subtitle: "100% czysta pasta pistacjowa & domowe confiture",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1000&auto=format&fit=crop",
    fermentationTime: "48h stabilizacji kremu pistacjowego",
    crunchScore: "7/10",
    flourType: "Lekki biszkopt maślany & mączka pistacjowa",
    cleanLabels: ["Pistacja 100% Bronte", "Polskie maliny", "Zero sztucznych barwników"],
    flavorNotes: "Kremowa, intensywna pistacja idealnie zbalansowana orzeźwiającą, kwaskową maliną.",
    priceEstimate: "od 160 zł (konfigurowalny)",
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("sourdough");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="oferta-chlebowa" className="py-24 bg-bakery-cream relative overflow-hidden scroll-mt-12">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-bakery-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-transcendent-pink/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-bakery-gold uppercase tracking-widest text-xs font-bold mb-3 px-3 py-1 bg-white rounded-full border border-bakery-gold/20 shadow-xs">
            <Wheat size={14} /> Manufaktura Pieczywa & Cukiernictwa
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-future-dusk mb-5 leading-tight">
            Nuty Fermentacji & Rzemieślnicza Oferta
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed">
            Nie używamy przemysłowych drożdży ani chemicznych polepszaczy objętości. Każdy bochenek powstaje z 
            mąki z lokalnych młynów żarnowych i dojrzewa nawet do 48 godzin w kontrolowanym chłodzie.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-future-dusk text-white shadow-lg shadow-future-dusk/15 scale-102"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 shadow-xs"
                }`}
              >
                <Icon size={16} className={isActive ? "text-bakery-gold" : "text-slate-400"} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid with Sourdough Tasting Notes & Crunch Score */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 hover-lift flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                {/* Product Image Banner */}
                <div className="h-56 relative overflow-hidden bg-slate-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {product.featured && (
                    <div className="absolute top-3 left-3 bg-bakery-gold text-future-dusk text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                      Wypiek Dnia
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                    <span className="text-xs font-medium text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10">
                      {product.priceEstimate}
                    </span>
                    {product.hydration && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold bg-future-dusk/80 text-amber-200 px-2 py-1 rounded-md backdrop-blur-xs border border-white/10">
                        <Droplets size={12} /> Hydratacja {product.hydration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content & Fermentation Notes */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-serif text-2xl font-bold text-future-dusk group-hover:text-bakery-gold transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{product.subtitle}</p>
                  </div>

                  {/* Sourdough & Fermentation Metric Bar */}
                  <div className="bg-bakery-cream/70 border border-slate-200/60 rounded-xl p-3 mb-4 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
                        <Clock size={13} className="text-bakery-gold" /> Fermentacja:
                      </span>
                      <span className="font-semibold text-future-dusk">{product.fermentationTime}</span>
                    </div>

                    {product.sourdoughAge && (
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
                          <Wheat size={13} className="text-bakery-gold" /> Wiek zakwasu:
                        </span>
                        <span className="font-bold text-amber-700">{product.sourdoughAge}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
                        <Flame size={13} className="text-bakery-gold" /> Chrupkość skórki:
                      </span>
                      <span className="font-mono font-bold text-future-dusk">{product.crunchScore}</span>
                    </div>
                  </div>

                  {/* Clean Label Allergen / Quality Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.cleanLabels.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded-md"
                      >
                        <ShieldCheck size={11} className="text-emerald-600" />
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Tasting & Flavor Notes */}
                  <p className="text-xs text-slate-600 leading-relaxed font-light italic border-l-2 border-bakery-gold/60 pl-2.5">
                    „{product.flavorNotes}”
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[170px]">
                  {product.flourType}
                </span>

                {product.category === "cakes" ? (
                  <Link
                    href="#zamow"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-future-dusk hover:text-bakery-gold transition-colors group/btn"
                  >
                    Konfiguruj 3D <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <a
                    href="#lokalizacje"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-future-dusk hover:text-bakery-gold transition-colors group/btn"
                  >
                    Dostępny w pracowniach <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bakery Philosophy Banner */}
        <div className="mt-20 bg-white rounded-3xl p-8 md:p-14 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-bakery-gold uppercase tracking-widest text-xs font-bold mb-3 block flex items-center gap-2">
                <Award size={16} /> Czysta Etykieta & Tradycja
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-future-dusk mb-5">
                Chleb z mąki, wody, soli i 35-letniego zakwasu. Nic więcej.
              </h3>
              <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed mb-6">
                Współpracujemy wyłącznie z rodzinnymi gospodarstwami z Warmii i Mazur. Nasze ziarno nie zawiera glifosatu, 
                a mąka nie przechodzi przez chemiczne wybielanie. Długa fermentacja w chłodzie sprawia, że gluten ulega 
                naturalnemu rozkładowi, czyniąc pieczywo lekkostrawnym.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-bakery-gold shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700">0% spulchniaczy i polepszaczy smaku</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-bakery-gold shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700">Młyny żarnowe wolnoobrotowe</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-bakery-gold shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700">Tradycyjne piece szamotowe</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div
                className="h-44 md:h-56 rounded-2xl bg-cover bg-center shadow-md"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop')" }}
              />
              <div
                className="h-44 md:h-56 rounded-2xl bg-cover bg-center shadow-md mt-6"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1000&auto=format&fit=crop')" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
