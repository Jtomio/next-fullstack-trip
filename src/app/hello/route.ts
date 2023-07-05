import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const trips = await prisma.trip.findMany()

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return new NextResponse(JSON.stringify(trips), {
    status: 200,
  })
}
