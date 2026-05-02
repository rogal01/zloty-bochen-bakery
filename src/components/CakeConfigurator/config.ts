export type Flavor = {
  id: number;
  name: string;
  description: string;
  category: string;
};

export type CakeConfig = {
  tiers: number;
  shape: string;
  size: string;
  flavor: string;
  frosting: string;
  frostingColor: string;
  decorations: string[];
  text: string;
  delivery: string;
  date: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
};

export const SHAPES = [
  { id: "round", label: "Okrągły", note: "Klasyczny i elegancki" },
  { id: "square", label: "Kwadratowy", note: "Nowoczesny, łatwy do krojenia" },
];

export const SIZES = [
  { id: "1.2", label: "16 cm", weight: "1.2", slices: 10, price: 0 },
  { id: "2.0", label: "20 cm", weight: "2.0", slices: 18, price: 80 },
  { id: "3.0", label: "24 cm", weight: "3.0", slices: 28, price: 160 },
];

export const FROSTINGS = [
  { id: "buttercream", label: "Krem maślany", desc: "Gładkie boki i dekoracyjna obwódka", price: 0 },
  { id: "cream-cheese", label: "Krem śmietankowy", desc: "Jaśniejszy wierzch z miękkimi rozetami", price: 20 },
  { id: "ganache", label: "Ganache czekoladowy", desc: "Ciemna polewa z widocznymi zaciekami", price: 30 },
  { id: "naked", label: "Lekki tynk", desc: "Cienka warstwa kremu z widocznym ciastem", price: 0 },
];

export const FROSTING_COLORS = [
  { id: "#fff7ed", label: "Wanilia", price: 0 },
  { id: "#f2e3e6", label: "Róż pudrowy", price: 10 },
  { id: "#c69c6d", label: "Złoty karmel", price: 15 },
  { id: "#93c572", label: "Pistacja", price: 10 },
  { id: "#3d1e11", label: "Czekolada", price: 0 },
];

export const DECORATIONS = [
  {
    id: "seasonal-berries",
    label: "Owoce sezonowe",
    desc: "Truskawki, maliny i borówki ułożone przy rancie",
    price: 45,
  },
  {
    id: "orchard-fruit",
    label: "Owoce sadownicze",
    desc: "Brzoskwinia, kiwi i różowe akcenty owocowe",
    price: 45,
  },
  {
    id: "cream-flowers",
    label: "Kwiaty kremowe",
    desc: "Jasne i różowe rozety z kremu wokół góry tortu",
    price: 35,
  },
  {
    id: "wafer-text",
    label: "Napis na opłatku",
    desc: "Jasny opłatek pod napisem, żeby lepiej ocenić efekt",
    price: 25,
  },
];

export const DELIVERY_OPTIONS = [
  { id: "pickup", label: "Odbiór osobisty", desc: "Najbezpieczniejsza opcja dla tortów piętrowych", price: 0 },
  { id: "local", label: "Dostawa lokalna", desc: "Dostawa w obrębie miasta", price: 35 },
];

export const PICKUP_LOCATIONS = [
  "Nowe Brzegi, ul. Miodowa 12",
  "Słoneczna, Rynek 4",
  "Młynary, ul. Zbożowa 8",
  "Lipowe Pole, ul. Cukiernicza 3",
];

export const INITIAL_CONFIG: CakeConfig = {
  tiers: 1,
  shape: "round",
  size: "1.2",
  flavor: "Royal Choco",
  frosting: "buttercream",
  frostingColor: "#fff7ed",
  decorations: [],
  text: "",
  delivery: "pickup",
  date: "",
  customerName: "",
  customerPhone: "",
  pickupLocation: PICKUP_LOCATIONS[0],
};

export function formatPrice(value: number) {
  return `${value} zł`;
}

export function translateCategory(category: string) {
  const normalized = category.toLowerCase();

  if (normalized === "classic") return "Klasyczny";
  if (normalized === "premium") return "Premium";

  return category;
}
