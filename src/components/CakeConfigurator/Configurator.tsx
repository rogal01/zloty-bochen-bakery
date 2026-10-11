"use client";
import { useEffect, useState } from "react";
import {
  Cake,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Info,
  Minus,
  Palette,
  PartyPopper,
  Plus,
  RotateCcw,
  Ruler,
  Scale,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import confetti from "canvas-confetti";
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
  calculateCakeMetrics,
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

/**
 * Multi-step cake configurator. The wizard walks the customer through
 *   1. Base (size, shape, flavour, frosting + colour)
 *   2. Decorations (icing details, optional wafer text)
 *   3. Pickup / delivery
 *   4. Review + submit
 *
 * All visible copy is in Polish — see `src/i18n` for the strings when we
 * eventually localise. Prices are computed locally rather than per-request
 * so the configurator stays snappy without round-tripping the API on every
 * dial twist; the server re-validates the total on order submit.
 */
export default function Configurator() {
  const [step, setStep] = useState(1);
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [loadingFlavors, setLoadingFlavors] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [orderSuccessData, setOrderSuccessData] = useState<{
    orderNumber: string;
    metrics: ReturnType<typeof calculateCakeMetrics>;
    config: CakeConfig;
  } | null>(null);
  const [config, setConfig] = useState<CakeConfig>(INITIAL_CONFIG);

  // Pull the flavour list once on mount. If the API hiccups (server down,
  // offline preview, etc.) we surface a friendly fallback rather than a blank
  // dropdown so the customer can still see what we offer.
  useEffect(() => {
    const controller = new AbortController();

    const fetchFlavors = async () => {
      try {
        const res = await fetch("/api/flavors", { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Flavours API returned ${res.status}`);
        }
        const data: Flavor[] = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Flavours API returned an empty list");
        }
        setFlavors(data);
        // Pre-select the first flavour so the 3D preview has something to render
        // immediately — customers can always change it on step 1.
        if (data[0]?.name) {
          setConfig((current) => ({ ...current, flavor: data[0].name }));
        }
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") return;
        console.error("Nie udało się pobrać smaków", err);
      } finally {
        setLoadingFlavors(false);
      }
    };
    fetchFlavors();

    // Avoid a state update if the customer navigates away mid-fetch.
    return () => controller.abort();
  }, []);

  const selectedSize = SIZES.find((size) => size.id === config.size) ?? SIZES[0];
  const selectedShape = SHAPES.find((shape) => shape.id === config.shape) ?? SHAPES[0];
  const selectedFrosting = FROSTINGS.find((frosting) => frosting.id === config.frosting) ?? FROSTINGS[0];
  const selectedColor = FROSTING_COLORS.find((color) => color.id === config.frostingColor) ?? FROSTING_COLORS[0];
  const selectedDecorations = DECORATIONS.filter((decoration) => config.decorations.includes(decoration.id));
  const selectedDelivery = DELIVERY_OPTIONS.find((delivery) => delivery.id === config.delivery) ?? DELIVERY_OPTIONS[0];
  const hasWaferText = config.decorations.includes("wafer-text");
  const decorationSummary = selectedDecorations.length ? selectedDecorations.map((decoration) => decoration.label).join(", ") : "Bez dekoracji";

  // Dynamic live weight, portions, height, and price matrix
  const metrics = calculateCakeMetrics(config);

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

  const resetConfigurator = () => {
    setOrderSuccessData(null);
    setStep(1);
    setConfig(INITIAL_CONFIG);
  };

  const submitOrder = async () => {
    setSubmitMessage("");
    if (!config.date || !config.customerName || !config.customerPhone) {
      setSubmitMessage("Uzupełnij imię, numer telefonu oraz pożądaną datę odbioru, aby zarezerwować termin wypieku.");
      return;
    }

    setIsSubmitting(true);
    try {
      const details = [
        `${config.tiers} poziom(y)`,
        `Rozmiar bazowy: ${selectedSize.label}`,
        `Waga: ${metrics.weightKg.toFixed(1)} kg`,
        `Porcje: ${metrics.servings}`,
        `Kształt: ${selectedShape.label}`,
        `Smak: ${config.flavor}`,
        `Wykończenie: ${selectedFrosting.label}`,
        `Kolor: ${selectedColor.label}`,
        `Dekoracje: ${decorationSummary}`,
        hasWaferText ? `Napis: "${config.text || "bez wpisanej treści"}"` : "Bez napisu",
        selectedDelivery.label,
      ].join(" | ");

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: config.customerName,
          customerPhone: config.customerPhone,
          shape: config.shape,
          weight: `${metrics.weightKg.toFixed(1)} kg (${metrics.servings} porcji)`,
          flavor: config.flavor,
          customText: details,
          photoPrint: hasWaferText,
          pickupDate: config.date,
          pickupLocation: config.pickupLocation,
          totalPrice: metrics.price,
        }),
      });

      if (!res.ok) {
        throw new Error("Błąd podczas zapisywania zamówienia");
      }

      // Celebratory confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#c69c6d", "#f2e3e6", "#2b2b4d", "#ffffff", "#e30b5d", "#f59e0b"],
        });
      } catch {
        // Fallback if canvas is not available
      }

      const generatedId = `ROM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderSuccessData({
        orderNumber: generatedId,
        metrics,
        config,
      });
    } catch (err) {
      console.error("Nie udało się zapisać zapytania", err);
      setSubmitMessage("Wystąpił problem z połączeniem. Spróbuj ponownie lub zadzwoń bezpośrednio do pracowni.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="zamow" className="bg-transcendent-pink/20 py-24 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-bakery-gold">
              Manufaktura Tortów Artystycznych
            </span>
            <h2 className="mb-4 font-serif text-4xl text-future-dusk md:text-5xl">
              Konfigurator Tortu 3D
            </h2>
            <p className="max-w-2xl text-lg font-light text-slate-600">
              Skomponuj tort na wesele, jubileusz lub urodziny. Wybierz liczbę poziomów, rzemieślniczy smak, 
              krem oraz świeże owoce z lokalnych sadów Warmii. Podgląd 3D i metryki przeliczają się na żywo.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 rounded-xl border border-white/80 bg-white/80 p-2 shadow-sm backdrop-blur-md">
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
                    "min-h-16 rounded-lg px-2 py-3 text-center text-[11px] font-bold uppercase tracking-wider transition-all",
                    active && "bg-future-dusk text-white shadow-md",
                    complete && !active && "bg-bakery-gold/20 text-future-dusk font-bold",
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
          {/* 3D Visualizer & Dynamic 4-Stat Bar */}
          <aside className="lg:sticky lg:top-24 space-y-4">
            <CakeModel
              shape={config.shape}
              flavor={config.flavor}
              text={hasWaferText ? config.text : ""}
              tiers={config.tiers}
              frosting={config.frosting}
              frostingColor={config.frostingColor}
              decorations={config.decorations}
            />

            {/* Live 4-Stat Metric Matrix */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat icon={<Users size={16} />} label="Porcje" value={`${metrics.servings} os.`} />
              <Stat icon={<Scale size={16} />} label="Waga" value={`${metrics.weightKg.toFixed(1)} kg`} strong />
              <Stat icon={<Ruler size={16} />} label="Wysokość" value={`${metrics.heightCm} cm`} />
              <Stat icon={<Sparkles size={16} />} label="Cena" value={formatPrice(metrics.price)} strong />
            </div>

            <div className="rounded-xl border border-bakery-gold/30 bg-white/70 p-4 text-xs text-slate-600 backdrop-blur-sm">
              <div className="flex items-center gap-2 font-bold text-future-dusk mb-1">
                <Sparkles size={14} className="text-bakery-gold" /> Rzemieślnicza Precyzja
              </div>
              Waga tortu ({metrics.weightKg.toFixed(1)} kg) oraz liczba porcji ({metrics.servings}) są dynamicznie kalkulowane na podstawie wybranego biszkoptu, kremów i gęstości dekoracji.
            </div>
          </aside>

          {/* Form Wizard Panels */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl md:p-8">
            {orderSuccessData ? (
              <div className="text-center py-6">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={36} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-bakery-gold">
                  Rezerwacja Przyjęta
                </span>
                <h3 className="font-serif text-3xl text-future-dusk mt-1 mb-2">
                  Dziękujemy za zamówienie!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                  Mistrz cukiernictwa Piekarni Romanowski otrzymał Twoją konfigurację. Skontaktujemy się telefonicznie, aby potwierdzić szczegóły dekoracji.
                </p>

                <div className="rounded-xl border border-slate-100 bg-bakery-cream p-5 text-left mb-6 space-y-2 text-sm">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Numer zapytania:</span>
                    <span className="font-mono font-bold text-future-dusk">{orderSuccessData.orderNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Konfiguracja:</span>
                    <span className="font-bold text-future-dusk">{orderSuccessData.config.tiers} poz. · {orderSuccessData.metrics.weightKg.toFixed(1)} kg · {orderSuccessData.metrics.servings} porcji</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Smak & Krem:</span>
                    <span className="font-bold text-future-dusk">{orderSuccessData.config.flavor} ({selectedFrosting.label})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Termin odbioru:</span>
                    <span className="font-bold text-future-dusk">{orderSuccessData.config.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Punkt odbioru:</span>
                    <span className="font-bold text-future-dusk">{orderSuccessData.config.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-base">
                    <span className="font-bold text-future-dusk">Szacowany koszt:</span>
                    <span className="font-serif font-bold text-bakery-gold text-xl">{formatPrice(orderSuccessData.metrics.price)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetConfigurator}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-future-dusk px-6 py-3 font-bold text-future-dusk transition hover:bg-future-dusk hover:text-white"
                  >
                    <RotateCcw size={16} /> Skonfiguruj kolejny tort
                  </button>
                  <a
                    href="#oferta-chlebowa"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-future-dusk px-6 py-3 font-bold text-white shadow-md transition hover:bg-future-dusk/90"
                  >
                    Zobacz pieczywo na zakwasie <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <BuilderPanel title="Baza tortu" kicker="Kształt, poziomy i smak" icon={<Cake size={22} />}>
                    <div className="grid gap-6">
                      <div>
                        <SectionLabel title="Liczba poziomów" hint="Waga, wysokość, porcje i cena aktualizują się automatycznie." />
                        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-bakery-cream p-4">
                          <button
                            type="button"
                            onClick={() => updateConfig({ tiers: Math.max(1, config.tiers - 1) })}
                            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-future-dusk shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
                            disabled={config.tiers === 1}
                            aria-label="Zmniejsz liczbę poziomów"
                          >
                            <Minus size={18} />
                          </button>
                          <div className="text-center">
                            <div className="font-serif text-4xl font-bold text-future-dusk">{config.tiers}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                              {config.tiers === 1 ? "poziom (klasyczny)" : config.tiers === 2 ? "poziomy (bankietowy)" : "poziomy (weselny)"}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => updateConfig({ tiers: Math.min(3, config.tiers + 1) })}
                            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-future-dusk shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
                            disabled={config.tiers === 3}
                            aria-label="Zwiększ liczbę poziomów"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <SectionLabel title="Kształt tortu" hint="Wybierz bryłę modelowaną w czasie rzeczywistym w 3D." />
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
                        <SectionLabel title="Średnica podstawy" hint="Wybór średnicy wpływa na wagę bazową i rekomendowaną liczbę gości." />
                        <div className="grid gap-3 sm:grid-cols-3">
                          {SIZES.map((size) => (
                            <ChoiceButton
                              key={size.id}
                              active={config.size === size.id}
                              title={size.label}
                              description={`Śr. ${size.label} · ~${size.weight} kg bazowo`}
                              price={size.price}
                              onClick={() => updateConfig({ size: size.id })}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <SectionLabel title="Rzemieślniczy smak ciasta" required />
                        <div className="grid gap-3">
                          {loadingFlavors ? (
                            <div className="rounded-xl border border-slate-100 p-4 text-center text-sm text-slate-400">
                              Wczytywanie receptur cukierniczych...
                            </div>
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
                  <BuilderPanel title="Dekoracje i wykończenie" kicker="Krem, kolorystyka, owoce i dedykacja" icon={<Palette size={22} />}>
                    <div className="grid gap-6">
                      <div>
                        <SectionLabel title="Styl wykończenia kremem" hint="Każdy styl kremu modyfikuje teksturę w podglądzie 3D." required />
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
                        <SectionLabel title="Odcień kremu" hint="Naturalne barwniki na bazie owoców, kakao i matchy." />
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                          {FROSTING_COLORS.map((color) => (
                            <button
                              key={color.id}
                              type="button"
                              onClick={() => updateConfig({ frostingColor: color.id })}
                              className={cx(
                                "min-h-24 rounded-xl border-2 p-3 text-left transition-all",
                                config.frostingColor === color.id
                                  ? "border-future-dusk bg-future-dusk/5 ring-4 ring-future-dusk/10"
                                  : "border-slate-100 hover:border-bakery-gold"
                              )}
                            >
                              <span className="mb-3 block h-7 w-full rounded-md shadow-inner border border-black/10" style={{ backgroundColor: color.id }} />
                              <span className="block text-xs font-bold text-future-dusk">{color.label}</span>
                              <span className="block text-[11px] text-slate-400">{color.price ? `+${formatPrice(color.price)}` : "w cenie"}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <SectionLabel
                          title="Dodatki i dekoracje owocowe"
                          hint="Możesz wybrać kilka dodatków naraz. Ich waga wlicza się do kalkulacji masy tortu."
                        />
                        <div className="grid gap-3 sm:grid-cols-2">
                          <ChoiceButton
                            active={config.decorations.length === 0}
                            title="Bez dodatków"
                            description="Gładkie, minimalistyczne wykończenie rzemieślnicze"
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
                          <div className="flex justify-between items-center gap-4 mb-2">
                            <SectionLabel title="Personalizowana dedykacja (opłatek)" hint="Napis pojawi się na wierzchu tortu w podglądzie 3D." />
                            <span className={cx("text-xs font-bold font-mono", config.text.length >= 30 ? "text-red-500" : "text-slate-400")}>
                              {config.text.length} / 30
                            </span>
                          </div>
                          <textarea
                            placeholder="Np. Sto Lat Zosiu! lub Rocznica Ślubu 2026"
                            maxLength={30}
                            className={cx(
                              "h-24 w-full resize-none rounded-xl border-2 p-4 text-sm outline-none transition",
                              config.text.length >= 30 ? "border-red-200 bg-red-50" : "border-slate-200 focus:border-future-dusk"
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
                  <BuilderPanel title="Odbiór i kontakt" kicker="Termin, pracownia i dane zamawiającego" icon={<Truck size={22} />}>
                    <div className="grid gap-6">
                      <div>
                        <SectionLabel title="Metoda odbioru" />
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
                          Imię i nazwisko zamawiającego
                          <input
                            type="text"
                            className="rounded-xl border-2 border-slate-200 p-3.5 font-normal text-sm outline-none focus:border-future-dusk"
                            placeholder="np. Anna Romanowska"
                            value={config.customerName}
                            onChange={(e) => updateConfig({ customerName: e.target.value })}
                          />
                        </label>
                        <label className="grid gap-2 text-sm font-bold text-future-dusk">
                          Numer telefonu do kontaktu
                          <input
                            type="tel"
                            className="rounded-xl border-2 border-slate-200 p-3.5 font-normal text-sm outline-none focus:border-future-dusk"
                            placeholder="+48 600 700 800"
                            value={config.customerPhone}
                            onChange={(e) => updateConfig({ customerPhone: e.target.value })}
                          />
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
                        <label className="grid gap-2 text-sm font-bold text-future-dusk">
                          <span className="inline-flex items-center gap-2">
                            <Calendar size={16} className="text-bakery-gold" /> Pożądana data odbioru
                          </span>
                          <input
                            type="date"
                            className="rounded-xl border-2 border-slate-200 p-3.5 font-normal text-sm outline-none focus:border-future-dusk"
                            value={config.date}
                            onChange={(e) => updateConfig({ date: e.target.value })}
                          />
                        </label>
                        <label className="grid gap-2 text-sm font-bold text-future-dusk">
                          Pracownia odbioru
                          <select
                            className="rounded-xl border-2 border-slate-200 bg-white p-3.5 font-normal text-sm outline-none focus:border-future-dusk"
                            value={config.pickupLocation}
                            onChange={(e) => updateConfig({ pickupLocation: e.target.value })}
                          >
                            {PICKUP_LOCATIONS.map((location) => (
                              <option key={location}>{location}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <p className="flex items-start gap-3 rounded-xl border border-bakery-gold/30 bg-bakery-cream p-4 text-xs text-slate-600 leading-relaxed">
                        <Info size={18} className="mt-0.5 shrink-0 text-bakery-gold" />
                        Torty artystyczne i wielopiętrowe wymagają minimum 48 godzin dojrzewania musów owocowych i stabilizacji konstrukcji. Rezerwacja w formularzu gwarantuje termin w harmonogramie cukierni.
                      </p>
                    </div>
                  </BuilderPanel>
                )}

                {step === 4 && (
                  <BuilderPanel title="Podsumowanie zamówienia" kicker="Sprawdź parametry przed wysłaniem" icon={<ClipboardCheck size={22} />}>
                    <div className="grid gap-5">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <ReviewLine label="Liczba poziomów" value={`${config.tiers} ${config.tiers === 1 ? "poziom" : "poziomy"}`} />
                        <ReviewLine label="Liczba porcji" value={`${metrics.servings} osób`} />
                        <ReviewLine label="Szacowana waga" value={`${metrics.weightKg.toFixed(1)} kg`} strong />
                        <ReviewLine label="Kształt i średnica" value={`${selectedShape.label} (baza ${selectedSize.label})`} />
                        <ReviewLine label="Smak biszkoptu" value={config.flavor} />
                        <ReviewLine label="Wykończenie kremem" value={`${selectedFrosting.label} (${selectedColor.label})`} />
                        <ReviewLine label="Dekoracje" value={decorationSummary} />
                        {hasWaferText && <ReviewLine label="Treść dedykacji" value={config.text || "Brak treści"} />}
                        <ReviewLine label="Termin odbioru" value={config.date || "Nie wybrano daty"} />
                        <ReviewLine label="Pracownia" value={config.pickupLocation} />
                        <ReviewLine label="Koszt całościowy" value={formatPrice(metrics.price)} strong />
                      </div>

                      <button
                        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-future-dusk px-6 py-4 font-bold text-white shadow-xl transition-all hover:bg-future-dusk/90 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 text-base hover-lift"
                        onClick={submitOrder}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Rezerwowanie terminu..." : "Wyślij zapytanie do pracowni"} <PartyPopper size={20} />
                      </button>

                      {submitMessage && (
                        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700" role="status">
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
                      className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-slate-200 px-5 font-semibold text-slate-600 transition hover:border-bakery-gold"
                    >
                      <ChevronLeft size={18} /> Wstecz
                    </button>
                  )}
                  {step < 4 && (
                    <button
                      onClick={nextStep}
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-future-dusk px-5 font-semibold text-white shadow-md transition hover:bg-future-dusk/90"
                    >
                      Dalej <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

