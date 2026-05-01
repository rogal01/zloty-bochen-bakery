import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const flavors = await prisma.flavor.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(flavors);
  } catch (error) {
    console.error('Failed to fetch flavors:', error);
    return NextResponse.json({ error: 'Failed to fetch flavors' }, { status: 500 });
  }
}