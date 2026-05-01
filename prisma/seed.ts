import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Add Locations
  const locations = [
    { city: "Maków Mazowiecki", address: "Rynek 24", type: "Cukiernia", phone: "503 512 393" },
    { city: "Ostrołęka", address: "ul. Prądzyńskiego 4 (Handlowiec)", type: "Cukieteria", phone: "503 806 326", openSunday: true },
    { city: "Ostrów Mazowiecka", address: "ul. Mieczkowskiego 16/3", type: "Cukieteria", phone: "PON-NIEDZ 9:00-21:00", openSunday: true },
    { city: "Legionowo", address: "Piłsudskiego lok 5 / 24 b", type: "Punkt Sprzedaży", phone: "789 207 216" },
    { city: "Goworowo", address: "ul. Rynek 18", type: "Cukiernia-Piekarnia-Kawiarnia", desc: "Miejsce narodzin marki." },
    { city: "Szczytno", address: "ul. Odrodzenia 11 lok. 5", type: "Cukieteria", phone: "690 568 467" },
  ];

  for (const loc of locations) {
    await prisma.location.create({
      data: loc,
    });
  }

  // Add Flavors
  const flavors = [
    { name: 'Royal Choco', description: 'Mus z gorzkiej czekolady, chrupka orzechowa.', category: 'Premium' },
    { name: 'Oreo', description: 'Krem śmietankowy z ciasteczkami Oreo.', category: 'Classic' },
    { name: 'Pistacja', description: 'Aksamitny mus pistacjowy z białą czekoladą.', category: 'Premium' },
    { name: 'Rafaello', description: 'Kokos, biała czekolada, migdały.', category: 'Classic' },
    { name: 'Bueno', description: 'Smak popularnego batonika z orzechami laskowymi.', category: 'Premium' },
  ];

  for (const flav of flavors) {
    await prisma.flavor.create({
      data: flav,
    });
  }

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })