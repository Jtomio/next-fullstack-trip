import Image from 'next/image'
import React from 'react'
import MapImg from '../../../../../public/map-mobile.png'
import Button from '@/components/Button'

interface TripLocationProps {
  location: string
  locationDescription: string
}

export default function TripLocation({
  location,
  locationDescription,
}: TripLocationProps) {
  return (
    <div className="flex flex-col px-10">
      <h2 className="font-semibold text-primaryDarker mb-4">Localização</h2>
      <div className="relative w-full flex justify-center">
        <Image src={MapImg} alt="map" className="rounded-lg shadow-md" />
      </div>
      <p className="text-primaryDarker text-sm font-medium mt-3">{location}</p>
      <p className="text-xs text-primaryDarker mt-3 text-justify leading-5">
        {locationDescription}
      </p>
      <Button variant="outlined" className="w-full mt-5">
        Ver no Google Maps
      </Button>
    </div>
  )
}
