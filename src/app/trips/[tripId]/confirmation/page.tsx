'use client'
import { Trip } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { SlCalender } from 'react-icons/sl'
import { BsPerson } from 'react-icons/bs'
import ReactCountryFlag from 'react-country-flag'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Button from '@/components/Button'

export default function TripConfirmation({
  params,
}: {
  params: { tripId: string }
}) {
  const [trip, setTrip] = useState<Trip | null>()
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const searchParms = useSearchParams()

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: 'POST',
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParms.get('startDate'),
          endDate: searchParms.get('endDate'),
        }),
      })

      const { trip, totalPrice } = await response.json()

      setTrip(trip)
      setTotalPrice(totalPrice)
    }
    fetchTrip()
  }, [params.tripId, searchParms])

  if (!trip) return null

  const startDate = new Date(searchParms.get('startDate') as string)
  const endDate = new Date(searchParms.get('endDate') as string)
  const guests = searchParms.get('guests')

  return (
    <div className="container mx-auto px-10">
      <Link href="/">
        <p className="flex items-center gap-2 text-primary py-3">
          <BiArrowBack />
          Voltar para home
        </p>
      </Link>
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              alt={trip.name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="tex-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1 py-2">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-xl text-primaryDarker my-3">
          Informções sobre o preço
        </h3>

        <div className="flex justify-between">
          <p className="font-medium text-primaryDarker">Total:</p>
          <p className="font-medium">
            R${' '}
            <span className="font-semibold text-xl text-primary">
              {totalPrice}
            </span>
          </p>
        </div>

        <div className="flex flex-col">
          <div className="text-primaryDarker">
            <div className="flex items-center gap-2 mt-2">
              <SlCalender /> <span>Data</span>
            </div>
            <div className="flex items-center gap-2">
              <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>{' '}
              {' - '}
              <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
            </div>
          </div>

          <h3 className="font-semibold mt-3">Hóspedes</h3>

          <div className="flex items-center gap-2">
            <BsPerson />
            <span>{guests} pessoas</span>
          </div>
          <Button variant="primary" className="mt-5">
            Finalizar compra
          </Button>
        </div>
      </div>
    </div>
  )
}
