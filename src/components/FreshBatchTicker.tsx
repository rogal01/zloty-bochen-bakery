"use client";
import React, { useState, useEffect } from "react";
import { Flame, Clock, Calendar, Sparkles, ChevronRight, X, Info, Check, Bell } from "lucide-react";

type BakeScheduleItem = {
  time: string;
  name: string;
  category: string;
  temp: string;
  fermentation: string;
  flour: string;
  status: "completed" | "baking" | "upcoming";
  description: string;
};

const BAKE_SCHEDULE: BakeScheduleItem[] = [
  {
    time: "06:30",
    name: "Chleb Wiejski Tradycyjny",
    category: "Pszenno-żytni na zakwasie",
    temp: "250°C",
    fermentation: "24h chłodna fermentacja",
    flour: "Mąka pszenna T750 & żytnia T720",
    status: "completed",
    description: "Chrupiąca, gruba skórka wypiekana na płytach szamotowych z parą wodną.",
  },
  {
    time: "08:15",
    name: "Chleb Żytni Razowy 100%",
    category: "Czyste żyto na zakwasie",
    temp: "240°C",
    fermentation: "36h na 35-letnim zakwasie",
    flour: "Mąka żytnia z młyna żarnowego T2000",
    status: "completed",
    description: "Głęboki, kwaskowy aromat, wysoka wilgotność miękiszu i 7-dniowa świeżość.",
  },
  {
    time: "11:00",
    name: "Bagietki Tradycyjne & Bułki Orkiszowe",
    category: "Wypieki śniadaniowe",
    temp: "255°C",
    fermentation: "18h metoda poolish",
    flour: "Mąka pszenna francuska T65",
    status: "baking",
    description: "Lekkie, napowietrzone wnętrze z dużymi dziurami i złocistą, kruchą skórką.",
  },
  {
    time: "14:30",
    name: "Chleb Orkiszowo-Miodowy ze Słonecznikiem",
    category: "Orkisz pradawny",
    temp: "235°C",
    fermentation: "24h zakwas orkiszowy",
    flour: "Mąka orkiszowa jasna T630 & razowa T1850",
    status: "upcoming",
    description: "Prażone ziarna słonecznika namaczane w miodzie lipowym z mazurskich pasiek.",
  },
  {
    time: "17:00",
    name: "Ciepłe Drożdżówki z Jagodami & Maślane Rogale",
    category: "Cukiernia popołudniowa",
    temp: "210°C",
    fermentation: "Długie wyrastanie maślane",
    flour: "Mąka tortowa T450 & masło 82%",
    status: "upcoming",
    description: "Prawdziwe jagody leśne z Puszczy Piskiej i chrupiąca maślana kruszonka.",
  },
];

export default function FreshBatchTicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(2054); // ~34 min 14 sec
  const [reminderSet, setReminderSet] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) return 3600; // loop back to 60 mins
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes} min ${seconds < 10 ? `0${seconds}` : seconds} s`;

  return (
    <>
      {/* Sticky / Floating Live Oven Banner */}
      <div className="w-full bg-future-dusk text-white border-y border-white/10 relative overflow-hidden z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Piec Szamotowy · 245°C
            </span>

            <div className="flex items-center gap-2 text-white/90">
              <Flame size={16} className="text-amber-400 animate-pulse shrink-0" />
              <span>
                Kolejny gorący wypiek: <strong className="text-white font-semibold">Chleb Żytni na 35-letnim zakwasie</strong> za:{" "}
                <span className="font-mono font-bold text-amber-300 bg-black/25 px-2 py-0.5 rounded border border-white/10">
                  {formattedTime}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-bakery-gold hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-bakery-gold/30 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <Calendar size={14} /> Harmonogram Wypieków Pieca <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bake Schedule Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 md:p-8 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-future-dusk p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Zamknij harmonogram"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-transcendent-pink text-future-dusk">
                <Flame size={24} className="text-bakery-gold" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-bakery-gold">
                  Rytm Dnia w Piekarni Romanowski
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-future-dusk font-bold">
                  Harmonogram Pieca Szamotowego
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-6 font-light leading-relaxed">
              Wypiekamy pieczywo 5 razy dziennie partiami, by trafiało do naszych pracowni jeszcze ciepłe i pachnące chrupiącą skórką.
            </p>

            <div className="space-y-4 mb-6">
              {BAKE_SCHEDULE.map((item) => (
                <div
                  key={item.time}
                  className={`p-4 rounded-xl border transition-all ${
                    item.status === "baking"
                      ? "border-amber-500 bg-amber-50/50 shadow-sm ring-2 ring-amber-500/20"
                      : item.status === "completed"
                      ? "border-slate-100 bg-slate-50/60 opacity-85"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-sm font-bold bg-future-dusk text-white px-2.5 py-1 rounded-md shadow-xs">
                        {item.time}
                      </span>
                      <div>
                        <h4 className="font-bold text-future-dusk text-base">{item.name}</h4>
                        <span className="text-xs text-slate-500 font-medium">{item.category}</span>
                      </div>
                    </div>

                    {item.status === "baking" && (
                      <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
                        <Flame size={12} /> W piecu teraz
                      </span>
                    )}
                    {item.status === "completed" && (
                      <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-medium">
                        <Check size={14} className="text-emerald-600" /> Świeżo na półkach
                      </span>
                    )}
                    {item.status === "upcoming" && (
                      <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-medium">
                        <Clock size={14} /> Przygotowanie ciasta
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mb-3">{item.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-medium text-slate-500 bg-white/80 p-2.5 rounded-lg border border-slate-100">
                    <div>🔥 <strong>Temp:</strong> {item.temp}</div>
                    <div>⏳ <strong>Dojrzewanie:</strong> {item.fermentation}</div>
                    <div>🌾 <strong>Mąka:</strong> {item.flour}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <Info size={16} className="text-bakery-gold shrink-0" />
                <span>Piec opalany drewnem bukowym z płytami szamotowymi.</span>
              </div>

              <button
                onClick={() => setReminderSet(!reminderSet)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                  reminderSet
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-future-dusk text-white hover:bg-future-dusk/90 shadow-md"
                }`}
              >
                <Bell size={14} />
                {reminderSet ? "Powiadomienie włączone ✓" : "Powiadom o ciepłym wypieku"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
