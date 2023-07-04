import { prisma } from '@/lib/prisma'
import React from 'react'

const getTrips = async () => {
  const trips = await prisma.trip.findMany({})

  return trips
}

export default async function Trips() {
  const data = await fetch('http://jsonplaceholder.typicode.com/posts').then(
    (res) => res.json(),
  )

  return (
    <div className="w-full flex justify-center items-center p-10">
      <div className="w-[990px] bg-gray-500 rounded-lg p-8">
        {data.map((i: any) => (
          <p key={i.id} className="flex justify-center items-center">
            {i.title}
          </p>
        ))}
      </div>
    </div>
  )
}
