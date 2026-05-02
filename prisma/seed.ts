import { PrismaClient } from '@prisma/client'
import { fallbackFlavors, fallbackLocations } from '../src/lib/fallback-data'

const prisma = new PrismaClient()

async function main() {
  await prisma.order.deleteMany()
  await prisma.flavor.deleteMany()
  await prisma.location.deleteMany()

  for (const { id, ...loc } of fallbackLocations) {
    void id
    await prisma.location.create({
      data: loc,
    });
  }

  for (const { id, ...flav } of fallbackFlavors) {
    void id
    await prisma.flavor.create({
      data: flav,
    });
  }

  console.log('Seeded Złoty Bochen data.');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
