"use client";
import { useEffect, useState } from "react";
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
import {
  DECORATIONS,
  DELIVERY_OPTIONS,
  FROSTINGS,
  FROSTING_COLORS,
  INITIAL_CONFIG,
  PICKUP_LOCATIONS,
  SHAPES,
  SIZES,
  formatPrice,
  translateCategory,
  type CakeConfig,
  type Flavor,
} from "./config";
import { BuilderPanel, ChoiceButton, ReviewLine, SectionLabel, Stat, cx } from "./parts";

const STEPS = [
  { id: 1, label: "Baza", icon: Cake },
  { id: 2, label: "Dekoracje", icon: Palette },
  { id: 3, label: "Odbiór", icon: Truck },
  { id: 4, label: "Podsumowanie", icon: ClipboardCheck },
];

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [loadingFlavors, setLoadingFlavors] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [config, setConfig] = useState<CakeConfig>(INITIAL_CONFIG);

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
        console.error("Nie udało się pobrać smaków", err);
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
  const selectedDecorations = DECORATIONS.filter((decoration) => config.decorations.includes(decoration.id));
  const selectedDelivery = DELIVERY_OPTIONS.find((delivery) => delivery.id === config.delivery) ?? DELIVERY_OPTIONS[0];
  const hasWaferText = config.decorations.includes("wafer-text");
  const decorationSummary = selectedDecorations.length ? selectedDecorations.map((decoration) => decoration.label).join(", ") : "Bez dekoracji";
  const decorationsPrice = selectedDecorations.reduce((sum, decoration) => sum + decoration.price, 0);
  const price =
    120 +
    selectedSize.price +
    (config.tiers - 1) * 90 +
    selectedFrosting.price +
    selectedColor.price +
    decorationsPrice +
    selectedDelivery.price;
  const servings = selectedSize.slices + (config.tiers - 1) * 12;
  const height = config.tiers * 9;

  const updateConfig = (updates: Partial<CakeConfig>) => {
    setSubmitMessage("");
    setConfig((current) => ({ ...current, ...updates }));
  };

  const toggleDecoration = (decorationId: string) => {
    setSubmitMessage("");
    setConfig((current) => {
      const isActive = current.decorations.includes(decorationId);
      const decorations = isActive
        ? current.decorations.filter((id) => id !== decorationId)
        : [...current.decorations, decorationId];

      return {
        ...current,
        decorations,
        text: decorationId === "wafer-text" && isActive ? "" : current.text,
      };
    });
  };

  const clearDecorations = () => {
    setSubmitMessage("");
    setConfig((current) => ({ ...current, decorations: [], text: "" }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const submitOrder = async () => {
    setSubmitMessage("");
    if (!config.date || !config.customerName || !config.customerPhone) {
      setSubmitMessage("Uzupełnij imię, kontakt i datę odbioru, aby wysłać zapytanie.");
      return;
    }

    setIsSubmitting(true);
    try {
      const details = [
        `${config.tiers} poziom(y)`,
        selectedSize.label,
        selectedShape.label,
        `Wykończenie: ${selectedFrosting.label}`,
        `Kolor: ${selectedColor.label}`,
        `Dekoracje: ${decorationSummary}`,
        hasWaferText ? `Napis na opłatku: ${config.text || "bez wpisanej treści"}` : "Bez napisu na opłatku",
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
          photoPrint: hasWaferText,
          pickupDate: config.date,
          pickupLocation: config.pickupLocation,
          totalPrice: price,
        }),
      });

      if (!res.ok) {
        throw new Error("Nie udało się wysłać zamówienia");
      }

      setSubmitMessage("Zapytanie zapisane. Cukiernia skontaktuje się, aby potwierdzić szczegóły.");
    } catch (err) {
      console.error("Nie udało się zapisać zapytania", err);
      setSubmitMessage("Nie udało się zapisać zapytania. Spróbuj ponownie po chwili.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="zamow" className="bg-transcendent-pink/20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-bakery-gold">Kreator tortu</span>
            <h2 className="mb-5 font-serif text-4xl text-future-dusk md:text-5xl">Zbuduj swój tort marzeń</h2>
            <p className="max-w-2xl text-lg font-light text-slate-600">
              Wybierz poziomy, kształt, smak, krem, kilka dekoracji naraz i odbiór. Podgląd 3D pokazuje mniej więcej,
              jak będzie wyglądał tort przed wysłaniem zapytania.
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
                  <span>{item.label}</span>
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
              text={hasWaferText ? config.text : ""}
              tiers={config.tiers}
              frosting={config.frosting}
              frostingColor={config.frostingColor}
              decorations={config.decorations}
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
              <BuilderPanel title="Baza tortu" kicker="Kształt, poziomy i smak" icon={<Cake size={22} />}>
                <div className="grid gap-6">
                  <div>
                    <SectionLabel title="Liczba poziomów" hint="Cena, wysokość i liczba porcji aktualizują się od razu." />
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
                    <SectionLabel title="Kształt tortu" hint="Wybierz bryłę widoczną w podglądzie 3D." />
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
                    <SectionLabel title="Rozmiar bazowy" hint="Rozmiar wpływa na wagę, porcje i cenę." />
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
                    <SectionLabel title="Smak ciasta" required />
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
                            badge={translateCategory(flavor.category)}
                            onClick={() => updateConfig({ flavor: flavor.name })}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </BuilderPanel>
            )}

            {step === 2 && (
              <BuilderPanel title="Dekoracje" kicker="Krem, kolor, owoce i opłatek" icon={<Palette size={22} />}>
                <div className="grid gap-6">
                  <div>
                    <SectionLabel title="Styl wykończenia" hint="Każdy krem ma własny wygląd w podglądzie 3D." required />
                    <div className="grid gap-3 sm:grid-cols-2">
                      {FROSTINGS.map((frosting) => (
                        <ChoiceButton
                          key={frosting.id}
                          active={config.frosting === frosting.id}
                          title={frosting.label}
                          description={frosting.desc}
                          price={frosting.price}
                          onClick={() => updateConfig({ frosting: frosting.id })}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionLabel title="Kolor kremu" hint="Kolor aktualizuje wykończenie tortu w podglądzie 3D." />
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
                    <SectionLabel
                      title="Dodatki dekoracyjne"
                      hint="Możesz wybrać kilka naraz, na przykład owoce sezonowe i napis na opłatku."
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ChoiceButton
                        active={config.decorations.length === 0}
                        title="Bez dekoracji"
                        description="Gładki tort bez owoców, kwiatów i opłatka"
                        price={0}
                        onClick={clearDecorations}
                      />
                      {DECORATIONS.map((decoration) => (
                        <ChoiceButton
                          key={decoration.id}
                          active={config.decorations.includes(decoration.id)}
                          title={decoration.label}
                          description={decoration.desc}
                          price={decoration.price}
                          onClick={() => toggleDecoration(decoration.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {hasWaferText && (
                    <div>
                      <div className="flex justify-between gap-4">
                        <SectionLabel title="Treść napisu na opłatku" hint="Napis pojawi się na jasnym opłatku w podglądzie." />
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
                  )}
                </div>
              </BuilderPanel>
            )}

            {step === 3 && (
              <BuilderPanel title="Odbiór" kicker="Termin, miejsce i kontakt" icon={<Truck size={22} />}>
                <div className="grid gap-6">
                  <div>
                    <SectionLabel title="Sposób odbioru" />
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
                    Torty piętrowe i z dekoracjami wymagają minimum 48 godzin przygotowania. Formularz zapisuje zapytanie i pozwala cukierni potwierdzić szczegóły.
                  </p>
                </div>
              </BuilderPanel>
            )}

            {step === 4 && (
              <BuilderPanel title="Podsumowanie" kicker="Sprawdź konfigurację" icon={<ClipboardCheck size={22} />}>
                <div className="grid gap-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ReviewLine label="Poziomy" value={`${config.tiers}`} />
                    <ReviewLine label="Porcje" value={`${servings}`} />
                    <ReviewLine label="Kształt" value={selectedShape.label} />
                    <ReviewLine label="Rozmiar" value={`${selectedSize.label} / ${selectedSize.weight} kg`} />
                    <ReviewLine label="Smak" value={config.flavor} />
                    <ReviewLine label="Wykończenie" value={selectedFrosting.label} />
                    <ReviewLine label="Kolor" value={selectedColor.label} />
                    <ReviewLine label="Dekoracje" value={decorationSummary} />
                    {hasWaferText && <ReviewLine label="Napis" value={config.text || "Nie wpisano"} />}
                    <ReviewLine label="Odbiór" value={config.date || "Nie wybrano daty"} />
                    <ReviewLine label="Cena" value={formatPrice(price)} strong />
                  </div>

                  <button
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-future-dusk px-6 py-3 font-bold text-white shadow-lg transition hover:bg-future-dusk/90 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={submitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Zapisywanie..." : "Wyślij zapytanie"} <Check size={18} />
                  </button>

                  {submitMessage && (
                    <p className="rounded-lg border border-bakery-gold/30 bg-bakery-cream p-4 text-sm text-slate-600" role="status">
                      {submitMessage}
                    </p>
                  )}
                </div>
              </BuilderPanel>
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
