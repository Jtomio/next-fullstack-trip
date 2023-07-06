import React from 'react'

interface TripDescriptionProps {
  description: string
}

export default function TripDescription({ description }: TripDescriptionProps) {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold px-10 py-4 text-primaryDarker">
        Sobre a viagem
      </h2>
      <div className="text-xs px-10 text-justify leading-5 text-primaryDarker">
        {description}
      </div>
    </div>
  )
}
