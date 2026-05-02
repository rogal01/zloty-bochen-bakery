"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Cake,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Info,
  Minus,
  Palette,
  Plus,
  Ruler,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import CakeModel from "./CakeModel";

const SHAPES = [
  { id: "round", label: "Okrągły", note: "Klasyczny i elegancki" },
  { id: "square", label: "Kwadratowy", note: "Nowoczesny, łatwy do krojenia" },
];

const SIZES = [
  { id: "1.2", label: "16 cm", weight: "1.2", slices: 10, price: 0 },
  { id: "2.0", label: "20 cm", weight: "2.0", slices: 18, price: 80 },
  { id: "3.0", label: "24 cm", weight: "3.0", slices: 28, price: 160 },
];

const FROSTINGS = [
  { id: "buttercream", label: "Buttercream", price: 0 },
  { id: "cream-cheese", label: "Cream cheese", price: 20 },
  { id: "ganache", label: "Czekoladowy ganache", price: 30 },
  { id: "naked", label: "Naked cake", price: 0 },
];

const FROSTING_COLORS = [
  { id: "#fff7ed", label: "Wanilia", price: 0 },
  { id: "#f2e3e6", label: "Róż pudrowy", price: 10 },
  { id: "#c69c6d", label: "Złoty karmel", price: 15 },
  { id: "#93c572", label: "Pistacja", price: 10 },
  { id: "#3d1e11", label: "Czekolada", price: 0 },
];

const DECORATIONS = [
  { id: "minimal", label: "Minimal", desc: "Gładkie wykończenie i subtelna dekoracja", price: 0 },
  { id: "flowers", label: "Kwiaty kremowe", desc: "Dekoracje z kremu na górze tortu", price: 35 },
  { id: "fruit", label: "Owoce sezonowe", desc: "Świeże owoce i lekki błysk cukierniczy", price: 45 },
  { id: "photo", label: "Wydruk na opłatku", desc: "Personalizowany opłatek lub grafika", price: 25 },
];

const DELIVERY_OPTIONS = [
  { id: "pickup", label: "Odbiór osobisty", desc: "Najbezpieczniejsza opcja dla tortów piętrowych", price: 0 },
  { id: "local", label: "Dostawa lokalna", desc: "Demo dostawy w obrębie miasta", price: 35 },
];

const PICKUP_LOCATIONS = [
  "Nowe Brzegi, ul. Miodowa 12",
  "Słoneczna, Rynek 4",
  "Młynary, ul. Zbożowa 8",
  "Lipowe Pole, ul. Cukiernicza 3",
];

const STEPS = [
  { id: 1, label: "Tiers", mobile: "Baza", icon: Cake },
  { id: 2, label: "Decorations", mobile: "Dekoracje", icon: Palette },
  { id: 3, label: "Delivery", mobile: "Odbiór", icon: Truck },
  { id: 4, label: "Review", mobile: "Podsumowanie", icon: ClipboardCheck },
];

type Flavor = {
  id: number;
  name: string;
  description: string;
  category: string;
};

type Config = {
  tiers: number;
  shape: string;
  size: string;
  flavor: string;
  frosting: string;
  frostingColor: string;
  decoration: string;
  text: string;
  delivery: string;
  date: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatPrice(value: number) {
  return `${value} zł`;
}

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [loadingFlavors, setLoadingFlavors] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [config, setConfig] = useState<Config>({
    tiers: 1,
    shape: "round",
    size: "1.2",
    flavor: "Royal Choco",
    frosting: "buttercream",
    frostingColor: "#fff7ed",
    decoration: "minimal",
    text: "",
    delivery: "pickup",
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

  const selectedSize = SIZES.find((size) => size.id === config.size) ?? SIZES[0];
  const selectedShape = SHAPES.find((shape) => shape.id === config.shape) ?? SHAPES[0];
  const selectedFrosting = FROSTINGS.find((frosting) => frosting.id === config.frosting) ?? FROSTINGS[0];
  const selectedColor = FROSTING_COLORS.find((color) => color.id === config.frostingColor) ?? FROSTING_COLORS[0];
  const selectedDecoration = DECORATIONS.find((decoration) => decoration.id === config.decoration) ?? DECORATIONS[0];
  const selectedDelivery = DELIVERY_OPTIONS.find((delivery) => delivery.id === config.delivery) ?? DELIVERY_OPTIONS[0];

  const price = useMemo(() => {
    const basePrice = 120;
    const tierPrice = (config.tiers - 1) * 90;
    return basePrice + selectedSize.price + tierPrice + selectedFrosting.price + selectedColor.price + selectedDecoration.price + selectedDelivery.price;
  }, [config.tiers, selectedColor.price, selectedDecoration.price, selectedDelivery.price, selectedFrosting.price, selectedSize.price]);

  const servings = selectedSize.slices + (config.tiers - 1) * 12;
  const height = config.tiers * 9;

  const updateConfig = (updates: Partial<Config>) => {
    setSubmitMessage("");
    setConfig((current) => ({ ...current, ...updates }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const submitOrder = async () => {
    setSubmitMessage("");
    if (!config.date || !config.customerName || !config.customerPhone) {
      setSubmitMessage("Uzupełnij imię, kontakt i datę odbioru, aby wysłać zapytanie demo.");
      return;
    }

    setIsSubmitting(true);
    try {
      const details = [
        `${config.tiers} poziom(y)`,
        selectedSize.label,
        selectedShape.label,
        selectedFrosting.label,
        selectedColor.label,
        selectedDecoration.label,
        config.text ? `Napis: ${config.text}` : "Bez napisu",
        selectedDelivery.label,
      ].join(" | ");

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: config.customerName,
          customerPhone: config.customerPhone,
          shape: config.shape,
          weight: selectedSize.weight,
          flavor: config.flavor,
          customText: details,
          photoPrint: config.decoration === "photo",
          pickupDate: config.date,
          pickupLocation: config.pickupLocation,
          totalPrice: price,
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
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <span className="text-bakery-gold uppercase tracking-widest text-sm font-semibold mb-4 block">Cake builder</span>
            <h2 className="text-4xl md:text-5xl font-serif text-future-dusk mb-5">Zbuduj swój tort marzeń</h2>
            <p className="text-lg text-slate-600 max-w-2xl font-light">
              Interaktywny konfigurator prowadzi przez bazę, dekoracje, odbiór i podsumowanie. Inspiracja: praktyczny builder zakupowy, ale w naszej własnej oprawie.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 rounded-lg border border-white/70 bg-white/75 p-2 shadow-sm">
            {STEPS.map((item) => {
              const Icon = item.icon;
              const active = step === item.id;
              const complete = step > item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  className={cx(
                    "min-h-16 rounded-lg px-2 py-3 text-center text-[11px] font-bold uppercase tracking-wider transition",
                    active && "bg-future-dusk text-white shadow-md",
                    complete && !active && "bg-bakery-gold/15 text-future-dusk",
                    !active && !complete && "text-slate-400 hover:bg-white"
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  <Icon size={18} className="mx-auto mb-1" />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.mobile}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <CakeModel
              shape={config.shape}
              flavor={config.flavor}
              text={config.text}
              tiers={config.tiers}
              frostingColor={config.frostingColor}
            />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat icon={<Ruler size={16} />} label="Wysokość" value={`${height} cm`} />
              <Stat icon={<Users size={16} />} label="Porcje" value={`${servings}`} />
              <Stat icon={<Cake size={16} />} label="Poziomy" value={`${config.tiers}`} />
              <Stat icon={<Sparkles size={16} />} label="Cena" value={formatPrice(price)} strong />
            </div>
          </aside>

          <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-xl md:p-8">
            {step === 1 && (
              <BuilderStep title="Foundation" kicker="Kształt, poziomy i smak" icon={<Cake size={22} />}>
                <div className="grid gap-6">
                  <div>
                    <SectionLabel title="Liczba poziomów" hint="Podobnie jak w klasycznym builderze, cena i porcje aktualizują się od razu." />
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-bakery-cream p-3">
                      <button
                        type="button"
                        onClick={() => updateConfig({ tiers: Math.max(1, config.tiers - 1) })}
                        className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-future-dusk disabled:opacity-40"
                        disabled={config.tiers === 1}
                        aria-label="Zmniejsz liczbę poziomów"
                      >
                        <Minus size={18} />
                      </button>
                      <div className="text-center">
                        <div className="font-serif text-4xl text-future-dusk">{config.tiers}</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">poziom(y)</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateConfig({ tiers: Math.min(3, config.tiers + 1) })}
                        className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-future-dusk disabled:opacity-40"
                        disabled={config.tiers === 3}
                        aria-label="Zwiększ liczbę poziomów"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <SectionLabel title="Overall shape" hint="Wybierz bryłę, którą widać w podglądzie 3D." />
                    <div className="grid gap-3 sm:grid-cols-2">
                      {SHAPES.map((shape) => (
                        <ChoiceButton
                          key={shape.id}
                          active={config.shape === shape.id}
                          title={shape.label}
                          description={shape.note}
                          onClick={() => updateConfig({ shape: shape.id })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionLabel title="Base size" hint="Waga zostaje kompatybilna z naszym obecnym modelem zamówień." />
                    <div className="grid gap-3 sm:grid-cols-3">
                      {SIZES.map((size) => (
                        <ChoiceButton
                          key={size.id}
                          active={config.size === size.id}
                          title={size.label}
                          description={`${size.weight} kg · ${size.slices} porcji`}
                          price={size.price}
                          onClick={() => updateConfig({ size: size.id })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionLabel title="Cake flavor" required />
                    <div className="grid gap-3">
                      {loadingFlavors ? (
                        <div className="rounded-lg border border-slate-100 p-4 text-center text-sm text-slate-400">Ładowanie smaków...</div>
                      ) : (
                        flavors.map((flavor) => (
                          <ChoiceButton
                            key={flavor.id}
                            active={config.flavor === flavor.name}
                            title={flavor.name}
                            description={flavor.description}
                            badge={flavor.category}
                            onClick={() => updateConfig({ flavor: flavor.name })}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </BuilderStep>
            )}

            {step === 2 && (
              <BuilderStep title="Decorations" kicker="Wykończenie, kolor i tekst" icon={<Palette size={22} />}>
                <div className="grid gap-6">
                  <div>
                    <SectionLabel title="Frosting style" required />
                    <div className="grid gap-3 sm:grid-cols-2">
                      {FROSTINGS.map((frosting) => (
                        <ChoiceButton
                          key={frosting.id}
                          active={config.frosting === frosting.id}
                          title={frosting.label}
                          description={frosting.price ? `Dopłata ${formatPrice(frosting.price)}` : "W cenie bazowej"}
                          price={frosting.price}
                          onClick={() => updateConfig({ frosting: frosting.id })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionLabel title="Frosting color" hint="Kolor aktualizuje obwódkę tortu w podglądzie 3D." />
                    <div className="grid gap-3 sm:grid-cols-5">
                      {FROSTING_COLORS.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => updateConfig({ frostingColor: color.id })}
                          className={cx(
                            "min-h-24 rounded-lg border-2 p-3 text-left transition",
                            config.frostingColor === color.id ? "border-future-dusk bg-future-dusk/5" : "border-slate-100 hover:border-bakery-gold"
                          )}
                        >
                          <span className="mb-3 block h-8 w-full rounded" style={{ backgroundColor: color.id }} />
                          <span className="block text-sm font-bold text-future-dusk">{color.label}</span>
                          <span className="block text-xs text-slate-400">{color.price ? `+${formatPrice(color.price)}` : "w cenie"}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionLabel title="Decoration package" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      {DECORATIONS.map((decoration) => (
                        <ChoiceButton
                          key={decoration.id}
                          active={config.decoration === decoration.id}
                          title={decoration.label}
                          description={decoration.desc}
                          price={decoration.price}
                          onClick={() => updateConfig({ decoration: decoration.id })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between gap-4">
                      <SectionLabel title="Cake message" hint="Opcjonalny napis na górze tortu." />
                      <span className={cx("text-[11px] font-bold", config.text.length >= 30 ? "text-red-500" : "text-slate-400")}>
                        {config.text.length} / 30
                      </span>
                    </div>
                    <textarea
                      placeholder="Np. Sto lat Aniu!"
                      maxLength={30}
                      className={cx(
                        "h-24 w-full resize-none rounded-lg border-2 p-4 outline-none transition",
                        config.text.length >= 30 ? "border-red-200 bg-red-50" : "border-slate-100 focus:border-future-dusk"
                      )}
                      value={config.text}
                      onChange={(e) => updateConfig({ text: e.target.value })}
                    />
                  </div>
                </div>
              </BuilderStep>
            )}

            {step === 3 && (
              <BuilderStep title="Delivery" kicker="Termin, odbiór i kontakt" icon={<Truck size={22} />}>
                <div className="grid gap-6">
                  <div>
                    <SectionLabel title="Delivery method" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      {DELIVERY_OPTIONS.map((delivery) => (
                        <ChoiceButton
                          key={delivery.id}
                          active={config.delivery === delivery.id}
                          title={delivery.label}
                          description={delivery.desc}
                          price={delivery.price}
                          onClick={() => updateConfig({ delivery: delivery.id })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-bold text-future-dusk">
                      Imię i nazwisko
                      <input
                        type="text"
                        className="rounded-lg border-2 border-slate-100 p-4 font-normal outline-none focus:border-future-dusk"
                        placeholder="Anna Kowalska"
                        value={config.customerName}
                        onChange={(e) => updateConfig({ customerName: e.target.value })}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-bold text-future-dusk">
                      Telefon lub e-mail
                      <input
                        type="tel"
                        className="rounded-lg border-2 border-slate-100 p-4 font-normal outline-none focus:border-future-dusk"
                        placeholder="+48 500 700 900"
                        value={config.customerPhone}
                        onChange={(e) => updateConfig({ customerPhone: e.target.value })}
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
                    <label className="grid gap-2 text-sm font-bold text-future-dusk">
                      <span className="inline-flex items-center gap-2"><Calendar size={16} /> Data odbioru</span>
                      <input
                        type="date"
                        className="rounded-lg border-2 border-slate-100 p-4 font-normal outline-none focus:border-future-dusk"
                        value={config.date}
                        onChange={(e) => updateConfig({ date: e.target.value })}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-bold text-future-dusk">
                      Lokalizacja
                      <select
                        className="rounded-lg border-2 border-slate-100 bg-white p-4 font-normal outline-none focus:border-future-dusk"
                        value={config.pickupLocation}
                        onChange={(e) => updateConfig({ pickupLocation: e.target.value })}
                      >
                        {PICKUP_LOCATIONS.map((location) => (
                          <option key={location}>{location}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <p className="flex items-start gap-2 rounded-lg border border-bakery-gold/30 bg-bakery-cream p-4 text-sm text-slate-600">
                    <Info size={16} className="mt-0.5 shrink-0 text-bakery-gold" />
                    Torty piętrowe i z dekoracjami wymagają minimum 48 godzin przygotowania. Wersja demo zapisuje zapytanie, nie pobiera płatności.
                  </p>
                </div>
              </BuilderStep>
            )}

            {step === 4 && (
              <BuilderStep title="Review" kicker="Sprawdź konfigurację" icon={<ClipboardCheck size={22} />}>
                <div className="grid gap-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ReviewLine label="Poziomy" value={`${config.tiers}`} />
                    <ReviewLine label="Porcje" value={`${servings}`} />
                    <ReviewLine label="Kształt" value={selectedShape.label} />
                    <ReviewLine label="Rozmiar" value={`${selectedSize.label} / ${selectedSize.weight} kg`} />
                    <ReviewLine label="Smak" value={config.flavor} />
                    <ReviewLine label="Wykończenie" value={selectedFrosting.label} />
                    <ReviewLine label="Kolor" value={selectedColor.label} />
                    <ReviewLine label="Dekoracja" value={selectedDecoration.label} />
                    <ReviewLine label="Odbiór" value={config.date || "Nie wybrano daty"} />
                    <ReviewLine label="Cena demo" value={formatPrice(price)} strong />
                  </div>

                  <button
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-future-dusk px-6 py-3 font-bold text-white shadow-lg transition hover:bg-future-dusk/90 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={submitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Zapisywanie..." : "Wyślij zapytanie demo"} <Check size={18} />
                  </button>

                  {submitMessage && (
                    <p className="rounded-lg border border-bakery-gold/30 bg-bakery-cream p-4 text-sm text-slate-600" role="status">
                      {submitMessage}
                    </p>
                  )}
                </div>
              </BuilderStep>
            )}

            <div className="mt-8 flex gap-3 border-t border-slate-100 pt-6">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg border-2 border-slate-100 px-5 font-medium text-slate-600 transition hover:border-bakery-gold"
                >
                  <ChevronLeft size={18} /> Wstecz
                </button>
              )}
              {step < 4 && (
                <button
                  onClick={nextStep}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-future-dusk px-5 font-medium text-white shadow-md transition hover:bg-future-dusk/90"
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

function BuilderStep({
  title,
  kicker,
  icon,
  children,
}: {
  title: string;
  kicker: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-7 flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-transcendent-pink text-future-dusk">
          {icon}
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-bakery-gold">{kicker}</span>
          <h3 className="font-serif text-3xl text-future-dusk">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  );
}

function SectionLabel({ title, hint, required }: { title: string; hint?: string; required?: boolean }) {
  return (
    <div className="mb-3">
      <h4 className="font-bold text-future-dusk">
        {title} {required && <span className="text-bakery-gold">*</span>}
      </h4>
      {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
    </div>
  );
}

function ChoiceButton({
  active,
  title,
  description,
  badge,
  price,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  badge?: string;
  price?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "min-h-24 rounded-lg border-2 p-4 text-left transition",
        active ? "border-future-dusk bg-future-dusk/5 ring-4 ring-future-dusk/10" : "border-slate-100 hover:border-bakery-gold"
      )}
    >
      <span className="mb-2 flex items-start justify-between gap-3">
        <span className="font-bold text-future-dusk">{title}</span>
        {active && <Check size={18} className="shrink-0 text-bakery-gold" />}
      </span>
      <span className="block text-sm leading-relaxed text-slate-500">{description}</span>
      <span className="mt-3 flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider">
        {badge ? <span className="text-bakery-gold">{badge}</span> : <span />}
        {typeof price === "number" && <span className="text-slate-400">{price > 0 ? `+${formatPrice(price)}` : "w cenie"}</span>}
      </span>
    </button>
  );
}

function Stat({
  icon,
  label,
  value,
  strong,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/70 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        {icon} {label}
      </div>
      <div className={cx("font-serif text-2xl", strong ? "text-bakery-gold" : "text-future-dusk")}>{value}</div>
    </div>
  );
}

function ReviewLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-bakery-cream p-4">
      <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</div>
      <div className={cx("mt-1 font-medium", strong ? "font-serif text-2xl text-bakery-gold" : "text-future-dusk")}>{value}</div>
    </div>
  );
}
