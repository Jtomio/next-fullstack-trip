'use client'
import Button from '@/components/Button'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import { Trip } from '@prisma/client'
import React from 'react'

interface TripReservationProps {
  trip: Trip
}

export default function TripReservation({ trip }: TripReservationProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <DatePicker
          placeholderText="Data do Início"
          onChange={() => {}}
          className="w-full"
        />
        <DatePicker
          placeholderText="Data final"
          onChange={() => {}}
          className="w-full"
        />
      </div>
      <Input
        placeholder={`Número de hospedes (max: ${trip.maxGuests})`}
        className="mt-4"
      />

      <div className="flex justify-between mt-2">
        <div className="font-medium text-sm text-primaryDarker">total: </div>
        <div className="font-medium text-sm text-primaryDarker">R$ 2,500</div>
      </div>
      <Button className="mt-3">Reservar agora</Button>
    </div>
  )
}
