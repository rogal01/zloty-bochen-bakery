export type DemoLocation = {
  id: number;
  city: string;
  address: string;
  type: string;
  phone?: string | null;
  desc?: string | null;
  openSunday: boolean;
};

export type DemoFlavor = {
  id: number;
  name: string;
  description: string;
  category: string;
};

export const demoLocations: DemoLocation[] = [
  { id: 1, city: "Nowe Brzegi", address: "ul. Miodowa 12", type: "Piekarnia i kawiarnia", phone: "+48 500 700 900", desc: "Fikcyjna główna pracownia marki.", openSunday: false },
  { id: 2, city: "Słoneczna", address: "Rynek 4", type: "Cukiernia", phone: "+48 500 700 901", openSunday: true },
  { id: 3, city: "Młynary", address: "ul. Zbożowa 8", type: "Punkt odbioru tortów", phone: "+48 500 700 902", openSunday: false },
  { id: 4, city: "Lipowe Pole", address: "ul. Cukiernicza 3", type: "Piekarnia", phone: "+48 500 700 903", openSunday: false },
  { id: 5, city: "Jasny Las", address: "ul. Leśna 21", type: "Kawiarnia", phone: "+48 500 700 904", openSunday: true },
  { id: 6, city: "Stare Mosty", address: "ul. Mostowa 5", type: "Punkt sprzedaży", phone: "+48 500 700 905", openSunday: false },
];

export const demoFlavors: DemoFlavor[] = [
  { id: 1, name: "Royal Choco", description: "Mus z gorzkiej czekolady, chrupka orzechowa i krem kakaowy.", category: "Premium" },
  { id: 2, name: "Oreo", description: "Krem śmietankowy z ciasteczkami i lekkim biszkoptem.", category: "Classic" },
  { id: 3, name: "Pistacja", description: "Aksamitny mus pistacjowy z białą czekoladą.", category: "Premium" },
  { id: 4, name: "Rafaello", description: "Kokos, biała czekolada, migdały i delikatny krem.", category: "Classic" },
  { id: 5, name: "Bueno", description: "Krem z orzechami laskowymi i karmelową nutą.", category: "Premium" },
];
