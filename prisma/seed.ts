import { PrismaClient } from '@prisma/client'
import { demoFlavors, demoLocations } from '../src/lib/demo-data'

const prisma = new PrismaClient()

async function main() {
  await prisma.order.deleteMany()
  await prisma.flavor.deleteMany()
  await prisma.location.deleteMany()

  for (const { id, ...loc } of demoLocations) {
    void id
    await prisma.location.create({
      data: loc,
    });
  }

  for (const { id, ...flav } of demoFlavors) {
    void id
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
