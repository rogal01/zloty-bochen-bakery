export type LocationRecord = {
  id: number;
  city: string;
  address: string;
  type: string;
  phone?: string | null;
  desc?: string | null;
  openSunday: boolean;
};

export type FlavorRecord = {
  id: number;
  name: string;
  description: string;
  category: string;
};

export const fallbackLocations: LocationRecord[] = [
  {
    id: 1,
    city: "Nowe Brzegi",
    address: "ul. Miodowa 12",
    type: "Piekarnia i kawiarnia",
    phone: "+48 500 700 900",
    desc: "Główna manufaktura piekarnicza z piecem szamotowym.",
    openSunday: false,
  },
  { id: 2, city: "Słoneczna", address: "Rynek 4", type: "Cukiernia & Kawiarnia", phone: "+48 500 700 901", desc: "Pracownia tortów weselnych i monoporcji.", openSunday: true },
  { id: 3, city: "Młynary", address: "ul. Zbożowa 8", type: "Pracownia Chlebowa", phone: "+48 500 700 902", desc: "Dojrzewalnia zakwasu i piec żytni.", openSunday: false },
  { id: 4, city: "Lipowe Pole", address: "ul. Cukiernicza 3", type: "Piekarnia Tradycyjna", phone: "+48 500 700 903", desc: "Wypiek świeżych bagietek i drożdżówek.", openSunday: false },
  { id: 5, city: "Jasny Las", address: "ul. Leśna 21", type: "Punkt Odbioru Tortów & Kawiarnia", phone: "+48 500 700 904", desc: "Odbiór zamówień okolicznościowych.", openSunday: true },
  { id: 6, city: "Stare Mosty", address: "ul. Mostowa 5", type: "Pracownia Rzemieślnicza", phone: "+48 500 700 905", desc: "Poranny wypiek chleba wiejskiego.", openSunday: false },
];

export const fallbackFlavors: FlavorRecord[] = [
  { id: 1, name: "Royal Choco", description: "Mus z gorzkiej czekolady, chrupka orzechowa i krem kakaowy.", category: "Premium" },
  { id: 2, name: "Oreo", description: "Krem śmietankowy z ciasteczkami i lekkim biszkoptem.", category: "Classic" },
  { id: 3, name: "Pistacja", description: "Aksamitny mus pistacjowy z białą czekoladą.", category: "Premium" },
  { id: 4, name: "Rafaello", description: "Kokos, biała czekolada, migdały i delikatny krem.", category: "Classic" },
  { id: 5, name: "Bueno", description: "Krem z orzechami laskowymi i karmelową nutą.", category: "Premium" },
];
