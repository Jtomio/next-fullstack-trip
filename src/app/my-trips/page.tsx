'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TripReservation } from '@prisma/client'

export default async function MyTrips() {
  const [reservations, setReservations] = useState<TripReservation[]>([])
  const { status, data } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated' || !data?.user) {
      return router.push('/')
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any).id}/reservations`,
      )
      const json = await response.json()

      setReservations(json)
    }
    fetchReservations()
  }, [data?.user, router, status])
  console.log({ reservations })

  return <div>Minhas viagens</div>
}
