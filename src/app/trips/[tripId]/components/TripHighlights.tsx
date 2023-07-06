import React from 'react'
import { TiInputChecked } from 'react-icons/ti'

interface TripHighlightsProps {
  highlights: string[]
}

export default function TripHighlights({ highlights }: TripHighlightsProps) {
  return (
    <div className="flex flex-col py-10 mx-auto px-10">
      <h2 className="font-semibold text-primaryDarker mb-4">Destaques</h2>
      <div className="flex flex-wrap gap-y-2">
        {highlights.map((highlight, i) => (
          <div key={i} className="flex items-center w-1/2">
            <TiInputChecked className="text-primary" />
            <p className="text-xs text-primaryDarker">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
