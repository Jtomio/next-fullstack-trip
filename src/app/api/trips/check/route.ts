import { prisma } from '@/lib/prisma'
import { isBefore } from 'date-fns'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const req = await request.json()
  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
    },
  })

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_NOT_FOUND',
        },
      }),
    )
  }

  if (isBefore(new Date(req.startDate), new Date(trip?.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'INVALID_START_DATE',
        },
      }),
    )
  }

  const reservation = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      // Checked there are dates busy between dates
      startDate: {
        lte: new Date(req.endDate),
      },
      endDate: {
        gte: new Date(req.startDate),
      },
    },
  })

  if (reservation.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_ALREADY_RESERVED',
        },
      }),
    )
  }
  return new NextResponse(
    JSON.stringify({
      success: true,
    }),
  )
}
