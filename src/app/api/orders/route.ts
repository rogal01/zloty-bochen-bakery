import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would validate the incoming data with Zod or Joi here.
    
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
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}