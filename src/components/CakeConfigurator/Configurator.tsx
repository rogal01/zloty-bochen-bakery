"use client";
import React, { useState, useEffect } from "react";
import { Check, ChevronRight, ChevronLeft, Info, Calendar } from "lucide-react";
import CakeModel from "./CakeModel";

const SHAPES = [
  { id: "round", label: "Okrągły" },
  { id: "square", label: "Kwadratowy" },
];

const WEIGHTS = [
  { id: "1.2", label: "1.2 kg (ok. 8-10 porcji)", price: 0 },
  { id: "2.0", label: "2.0 kg (ok. 15-18 porcji)", price: 80 },
  { id: "3.0", label: "3.0 kg (ok. 25 porcji)", price: 160 },
];

const PICKUP_LOCATIONS = [
  "Nowe Brzegi, ul. Miodowa 12",
  "Słoneczna, Rynek 4",
  "Młynary, ul. Zbożowa 8",
  "Lipowe Pole, ul. Cukiernicza 3",
];

type Flavor = {
  id: number;
  name: string;
  description: string;
  category: string;
};

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [loadingFlavors, setLoadingFlavors] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [config, setConfig] = useState({
    shape: "round",
    weight: "1.2",
    flavor: "Royal Choco",
    text: "",
    date: "",
    customerName: "",
    customerPhone: "",
    pickupLocation: PICKUP_LOCATIONS[0],
  });

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const res = await fetch("/api/flavors");
        const data = await res.json();
        setFlavors(data);
        if (data[0]?.name) {
          setConfig((current) => ({ ...current, flavor: data[0].name }));
        }
      } catch (err) {
        console.error("Failed to fetch flavors", err);
      } finally {
        setLoadingFlavors(false);
      }
    };
    fetchFlavors();
  }, []);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const basePrice = 120;
  const weightPrice = WEIGHTS.find((w) => w.id === config.weight)?.price || 0;
  const totalPrice = basePrice + weightPrice;

  const submitOrder = async () => {
    setSubmitMessage("");
    if (!config.date || !config.customerName || !config.customerPhone) {
      setSubmitMessage("Uzupełnij imię, telefon i datę odbioru, aby wysłać zapytanie demo.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: config.customerName,
          customerPhone: config.customerPhone,
          shape: config.shape,
          weight: config.weight,
          flavor: config.flavor,
          customText: config.text,
          photoPrint: false,
          pickupDate: config.date,
          pickupLocation: config.pickupLocation,
          totalPrice,
        }),
      });

      if (!res.ok) {
        throw new Error("Order request failed");
      }

      setSubmitMessage("Zapytanie demo zapisane. W realnym wdrożeniu klient dostałby potwierdzenie SMS lub e-mail.");
    } catch (err) {
      console.error("Failed to submit order", err);
      setSubmitMessage("Nie udało się zapisać zapytania demo. Spróbuj ponownie po chwili.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="zamow" className="py-24 bg-transcendent-pink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-bakery-gold uppercase tracking-widest text-sm font-semibold mb-4 block">Personalizacja Online</span>
          <h2 className="text-4xl md:text-5xl font-serif text-future-dusk mb-6">Skonfiguruj swój Tort Marzeń</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Wybierz kształt, smak i dodatki. Zobacz podgląd 3D swojego zamówienia w czasie rzeczywistym.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="sticky top-32">
            <CakeModel shape={config.shape} flavor={config.flavor} text={config.text} />
            <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500">Twoja konfiguracja:</span>
                <span className="text-future-dusk font-bold font-serif text-2xl">{totalPrice} zł</span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between"><span>Kształt:</span> <span className="font-medium">{SHAPES.find((s) => s.id === config.shape)?.label}</span></div>
                <div className="flex justify-between"><span>Waga:</span> <span className="font-medium">{WEIGHTS.find((w) => w.id === config.weight)?.label}</span></div>
                <div className="flex justify-between"><span>Smak:</span> <span className="font-medium text-bakery-gold">{config.flavor}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 min-h-[600px] flex flex-col">
            <div className="flex justify-between mb-10">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2 flex-1 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors z-10 ${
                    step >= s ? "bg-future-dusk text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                    {step > s ? <Check size={16} /> : s}
                  </div>
                  <span className={`text-[10px] uppercase tracking-tighter font-bold ${step >= s ? "text-future-dusk" : "text-slate-400"}`}>
                    {s === 1 ? "Baza" : s === 2 ? "Smak" : s === 3 ? "Dodatki" : "Odbiór"}
                  </span>
                  {s < 4 && <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-0 ${step > s ? "bg-future-dusk" : "bg-slate-100"}`} />}
                </div>
              ))}
            </div>

            <div className="flex-grow">
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h3 className="text-xl font-bold text-future-dusk mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-bakery-gold rounded-full" /> Wybierz Kształt
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {SHAPES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setConfig({ ...config, shape: s.id })}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            config.shape === s.id ? "border-future-dusk bg-future-dusk/5 ring-4 ring-future-dusk/10" : "border-slate-100 hover:border-bakery-gold"
                          }`}
                        >
                          <span className="font-medium">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-future-dusk mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-bakery-gold rounded-full" /> Wybierz Wagę
                    </h3>
                    <div className="space-y-3">
                      {WEIGHTS.map((w) => (
                        <button
                          key={w.id}
                          onClick={() => setConfig({ ...config, weight: w.id })}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left flex justify-between items-center ${
                            config.weight === w.id ? "border-future-dusk bg-future-dusk/5" : "border-slate-100 hover:border-bakery-gold"
                          }`}
                        >
                          <span className="font-medium">{w.label}</span>
                          {w.price > 0 && <span className="text-slate-400 text-sm">+{w.price} zł</span>}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-slate-500 flex items-start gap-2">
                      <Info size={16} className="shrink-0 mt-0.5" />
                      Waga tortu może się różnić o ok. 10% w zależności od wybranego smaku i dekoracji.
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-bold text-future-dusk mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-bakery-gold rounded-full" /> Wybierz Smak
                  </h3>
                  <div className="grid gap-4">
                    {loadingFlavors ? (
                      <div className="text-slate-400 text-sm text-center py-4">Ładowanie smaków...</div>
                    ) : (
                      flavors.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setConfig({ ...config, flavor: f.name })}
                          className={`p-4 rounded-xl border-2 transition-all text-left group ${
                            config.flavor === f.name ? "border-future-dusk bg-future-dusk/5" : "border-slate-100 hover:border-bakery-gold"
                          }`}
                        >
                          <div className="font-bold text-future-dusk group-hover:text-bakery-gold transition-colors">{f.name}</div>
                          <div className="text-sm text-slate-500 font-light">{f.description}</div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-bold text-future-dusk mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-bakery-gold rounded-full" /> Personalizacja
                  </h3>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-sm font-medium text-slate-700">Napis na torcie (opcjonalnie)</label>
                      <span className={`text-[10px] font-bold ${config.text.length >= 30 ? "text-red-500" : "text-slate-400"}`}>
                        {config.text.length} / 30 znaków
                      </span>
                    </div>
                    <textarea
                      placeholder="Np. Sto lat Aniu!"
                      maxLength={30}
                      className={`w-full p-4 rounded-xl border-2 outline-none transition-all resize-none h-24 ${
                        config.text.length >= 30 ? "border-red-200 bg-red-50" : "border-slate-100 focus:border-future-dusk"
                      }`}
                      value={config.text}
                      onChange={(e) => setConfig({ ...config, text: e.target.value })}
                    />
                    <p className="mt-2 text-[11px] text-slate-500 italic">
                      Napis pojawi się na górze tortu. Ze względu na miejsce, limit wynosi 30 znaków.
                    </p>
                  </div>
                  <div className="p-4 bg-transcendent-pink/30 rounded-xl border border-transcendent-pink">
                    <p className="text-sm text-future-dusk font-medium mb-2 flex items-center gap-2">
                      <Check size={16} /> Wydruk na opłatku
                    </p>
                    <p className="text-xs text-slate-600">W realnym wdrożeniu klient mógłby dodać własne zdjęcie, a system doliczyłby koszt usługi do zamówienia.</p>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-bold text-future-dusk mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-bakery-gold rounded-full" /> Dane i Miejsce Odbioru
                  </h3>
                  <div className="grid gap-4">
                    <input
                      type="text"
                      className="w-full p-4 rounded-xl border-2 border-slate-100 outline-none focus:border-future-dusk"
                      placeholder="Imię i nazwisko"
                      value={config.customerName}
                      onChange={(e) => setConfig({ ...config, customerName: e.target.value })}
                    />
                    <input
                      type="tel"
                      className="w-full p-4 rounded-xl border-2 border-slate-100 outline-none focus:border-future-dusk"
                      placeholder="Telefon lub e-mail"
                      value={config.customerPhone}
                      onChange={(e) => setConfig({ ...config, customerPhone: e.target.value })}
                    />
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white rounded-xl shadow-sm"><Calendar className="text-bakery-gold" /></div>
                      <div className="w-full">
                        <div className="text-sm text-slate-500 uppercase tracking-tighter font-bold">Wybierz datę odbioru</div>
                        <input
                          type="date"
                          className="bg-transparent border-none outline-none font-bold text-future-dusk w-full"
                          value={config.date}
                          onChange={(e) => setConfig({ ...config, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <select
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm text-future-dusk outline-none focus:border-bakery-gold"
                      value={config.pickupLocation}
                      onChange={(e) => setConfig({ ...config, pickupLocation: e.target.value })}
                    >
                      {PICKUP_LOCATIONS.map((location) => (
                        <option key={location}>{location}</option>
                      ))}
                    </select>
                    <p className="mt-4 text-xs text-slate-500 italic">
                      Zamówienie musi zostać złożone z min. 48-godzinnym wyprzedzeniem.
                    </p>
                  </div>
                  <button
                    className="w-full bg-future-dusk text-white py-4 rounded-xl font-bold hover:bg-future-dusk/90 shadow-lg transition-all hover-lift disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={submitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Zapisywanie zapytania..." : "Wyślij zapytanie demo"}
                  </button>
                  {submitMessage && (
                    <p className="text-sm text-slate-600 bg-bakery-cream border border-bakery-gold/30 rounded-xl p-4" role="status">
                      {submitMessage}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8 pt-8 border-t border-slate-100">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-100 hover:border-bakery-gold text-slate-600 font-medium transition-all"
                >
                  <ChevronLeft size={18} /> Wstecz
                </button>
              )}
              {step < 4 && (
                <button
                  onClick={nextStep}
                  className="flex-grow flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-future-dusk text-white font-medium hover:bg-future-dusk/90 transition-all shadow-md"
                >
                  Dalej <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
