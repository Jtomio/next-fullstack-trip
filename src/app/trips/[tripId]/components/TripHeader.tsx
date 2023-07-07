import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import Image from 'next/image'
import { Trip } from '@prisma/client'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'

interface TripHeaderProps {
  trip: Trip
}

export default function TripHeader({ trip }: TripHeaderProps) {
  return (
    <div className="flex flex-col">
      <Link href="/">
        <p className="flex items-center gap-2 text-primary py-3 pl-10">
          <BiArrowBack />
          Voltar
        </p>
      </Link>
      <div className="relative h-[280px] w-full">
        <Image src={trip?.coverImage} fill objectFit="cover" alt={trip.name} />
      </div>
      {/* Title and Information */}
      <div className="flex flex-col px-10">
        <h1 className="font-semibold text-xl text-primaryDarker">
          {trip.name}
        </h1>
        <div className="flex items-center gap-1 py-2">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-grayPrimary underline">{trip.location}</p>
        </div>
        <p className="text-xs text-grayPrimary mb-2">
          <span className="text-primary font-medium">
            R${trip.pricePerDay.toString()}{' '}
          </span>
          pernoite
        </p>
      </div>
    </div>
  )
}
