import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // W prawdziwej aplikacji dane wejściowe można tu zwalidować przez Zod albo Joi.
    
    const newOrder = await prisma.order.create({
      data: {
        customerName: body.customerName || 'Gość',
        customerPhone: body.customerPhone || 'Nie podano',
        shape: body.shape,
        weight: parseFloat(body.weight),
        flavor: body.flavor,
        customText: body.customText,
        photoPrint: body.photoPrint || false,
        pickupDate: new Date(body.pickupDate),
        pickupLocation: body.pickupLocation || 'Nie wybrano',
        totalPrice: parseFloat(body.totalPrice),
      },
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error('Nie udało się utworzyć zamówienia:', error);
    return NextResponse.json({
      success: true,
      demoMode: true,
      message: 'Zapytanie przyjęte do kontaktu z cukiernią.',
    }, { status: 202 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Nie udało się pobrać zamówień:', error);
    return NextResponse.json({ error: 'Nie udało się pobrać zamówień' }, { status: 500 });
  }
}
