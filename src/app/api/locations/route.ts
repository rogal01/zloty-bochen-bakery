import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { demoLocations } from '@/lib/demo-data';

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(locations);
  } catch (error) {
    console.error('Nie udało się pobrać lokalizacji:', error);
    return NextResponse.json(demoLocations);
  }
}
