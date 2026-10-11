"use client";
import React, { useState, useEffect } from "react";
import { Cookie, Shield, Check, X, SlidersHorizontal, ChevronRight, Lock } from "lucide-react";

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const COOKIE_STORAGE_KEY = "romanowski_cookie_consent_v1";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check localStorage
    try {
      const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!saved) {
        // Show after brief delay for smooth appearance
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    // Listen for custom event from footer or other buttons
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowDetails(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => window.removeEventListener("open-cookie-settings", handleOpenSettings);
  }, []);

  const saveConsent = (prefs: { necessary: boolean; analytics: boolean; marketing: boolean }) => {
    const payload: CookiePreferences = {
      ...prefs,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error("Nie udało się zapisać zgód cookies", e);
    }
    setIsVisible(false);
    setShowDetails(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Ustawienia prywatności i plików cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-slate-200 text-slate-800">
        <div className="flex items-start gap-3.5 mb-3">
          <div className="p-2.5 rounded-xl bg-bakery-cream text-future-dusk shrink-0 border border-bakery-gold/20">
            <Cookie size={22} className="text-bakery-gold" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-future-dusk">
              Szanujemy Twoją Prywatność
            </h3>
            <p className="text-xs text-slate-600 font-light mt-1 leading-relaxed">
              Używamy plików cookies w celach technicznych (działanie konfiguratora 3D i zamówień), 
              oraz analitycznych zgodnie z wytycznymi RODO/UODO. Możesz dostosować swoje zgody lub zaakceptować tylko niezbędne.
            </p>
          </div>
        </div>

        {/* Granular Categories Drawer */}
        {showDetails && (
          <div className="my-4 pt-3 border-t border-slate-100 space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
            {/* Techniczne */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-future-dusk">
                  <Lock size={12} className="text-slate-400" /> Niezbędne techniczne (Wymagane)
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Kluczowe dla prawidłowego działania sklepu, silnika 3D Three.js, koszyka i bezpieczeństwa sesji.
                </p>
              </div>
              <input
                type="checkbox"
                checked={true}
                disabled
                className="mt-1 h-4 w-4 rounded accent-future-dusk cursor-not-allowed opacity-70"
              />
            </div>

            {/* Analityczne */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-future-dusk">
                  <Shield size={12} className="text-bakery-gold" /> Analityka & Wydajność
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Anonimowe statystyki odwiedzin pomagające optymalizować czas ładowania i płynność podglądu 3D.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded accent-future-dusk cursor-pointer"
              />
            </div>

            {/* Marketingowe */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-future-dusk">
                  <SlidersHorizontal size={12} className="text-bakery-gold" /> Funkcjonalne & Preferencje
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Zapamiętywanie wybranej lokalizacji odbioru tortu oraz preferowanych wariantów smakowych.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences((p) => ({ ...p, marketing: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded accent-future-dusk cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Action Buttons: Equal Visual Weight (Anti-Dark-Pattern Standard) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
          {showDetails ? (
            <>
              <button
                onClick={handleSaveCustom}
                className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-future-dusk text-white text-xs font-bold px-4 py-2.5 hover:bg-future-dusk/90 shadow-sm transition-all cursor-pointer"
              >
                <Check size={14} /> Zapisz wybrane zgody
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-future-dusk text-future-dusk text-xs font-bold px-4 py-2.5 hover:bg-future-dusk hover:text-white transition-all cursor-pointer"
              >
                Zaakceptuj wszystkie
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleRejectNonEssential}
                className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-future-dusk text-future-dusk text-xs font-bold px-4 py-2.5 hover:bg-future-dusk hover:text-white transition-all cursor-pointer"
              >
                Tylko Niezbędne
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-future-dusk text-white text-xs font-bold px-4 py-2.5 hover:bg-future-dusk/90 shadow-sm transition-all cursor-pointer"
              >
                Zaakceptuj Wszystkie
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="min-h-11 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold px-3 py-2.5 hover:bg-slate-100 transition-all cursor-pointer"
                title="Dostosuj szczegółowo"
              >
                <SlidersHorizontal size={14} /> Opcje
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
