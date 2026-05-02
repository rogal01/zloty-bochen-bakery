import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { demoFlavors } from '@/lib/demo-data';

export async function GET() {
  try {
    const flavors = await prisma.flavor.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(flavors);
  } catch (error) {
    console.error('Nie udało się pobrać smaków:', error);
    return NextResponse.json(demoFlavors);
  }
}
