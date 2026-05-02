import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.order.deleteMany()
  await prisma.flavor.deleteMany()
  await prisma.location.deleteMany()

  const locations = [
    { city: "Nowe Brzegi", address: "ul. Miodowa 12", type: "Piekarnia i kawiarnia", phone: "+48 500 700 900", desc: "Fikcyjna główna pracownia marki." },
    { city: "Słoneczna", address: "Rynek 4", type: "Cukiernia", phone: "+48 500 700 901", openSunday: true },
    { city: "Młynary", address: "ul. Zbożowa 8", type: "Punkt odbioru tortów", phone: "+48 500 700 902" },
    { city: "Lipowe Pole", address: "ul. Cukiernicza 3", type: "Piekarnia", phone: "+48 500 700 903" },
    { city: "Jasny Las", address: "ul. Leśna 21", type: "Kawiarnia", phone: "+48 500 700 904", openSunday: true },
    { city: "Stare Mosty", address: "ul. Mostowa 5", type: "Punkt sprzedaży", phone: "+48 500 700 905" },
  ];

  for (const loc of locations) {
    await prisma.location.create({
      data: loc,
    });
  }

  const flavors = [
    { name: 'Royal Choco', description: 'Mus z gorzkiej czekolady, chrupka orzechowa i krem kakaowy.', category: 'Premium' },
    { name: 'Oreo', description: 'Krem śmietankowy z ciasteczkami i lekkim biszkoptem.', category: 'Classic' },
    { name: 'Pistacja', description: 'Aksamitny mus pistacjowy z białą czekoladą.', category: 'Premium' },
    { name: 'Rafaello', description: 'Kokos, biała czekolada, migdały i delikatny krem.', category: 'Classic' },
    { name: 'Bueno', description: 'Krem z orzechami laskowymi i karmelową nutą.', category: 'Premium' },
  ];

  for (const flav of flavors) {
    await prisma.flavor.create({
      data: flav,
    });
  }

  console.log('Demo database seeded for Złoty Bochen.');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
