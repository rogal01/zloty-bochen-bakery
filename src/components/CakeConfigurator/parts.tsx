import React from "react";
import { Check } from "lucide-react";
import { formatPrice } from "./config";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function BuilderPanel({
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

export function SectionLabel({ title, hint, required }: { title: string; hint?: string; required?: boolean }) {
  return (
    <div className="mb-3">
      <h4 className="font-bold text-future-dusk">
        {title} {required && <span className="text-bakery-gold">*</span>}
      </h4>
      {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
    </div>
  );
}

export function ChoiceButton({
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
      aria-pressed={active}
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

export function Stat({
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

export function ReviewLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-bakery-cream p-4">
      <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</div>
      <div className={cx("mt-1 font-medium", strong ? "font-serif text-2xl text-bakery-gold" : "text-future-dusk")}>{value}</div>
    </div>
  );
}
