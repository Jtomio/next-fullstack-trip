'use client'
import Button from '@/components/Button'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import { Trip } from '@prisma/client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

interface TripReservationProps {
  trip: Trip
}

interface TripReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

export default function TripReservation({ trip }: TripReservationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TripReservationForm>()

  const onSubmit = (data: any) => {}

  return (
    <div className="flex flex-col mx-auto px-10 pb-10 border-b borgral">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: 'Data inicial é obrigatória',
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data do Início"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors?.startDate}
              errorMessage={errors.startDate?.message}
              className="w-full"
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: 'Data final é obrigatória',
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data final"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors?.endDate}
              errorMessage={errors.endDate?.message}
              className="w-full"
            />
          )}
        />
      </div>
      <Input
        {...register('guests', {
          required: {
            value: true,
            message: 'Número de hóspedes é obrigatório!',
          },
        })}
        placeholder={`Número de hospedes (max: ${trip.maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className="flex justify-between mt-2">
        <div className="font-medium text-sm text-primaryDarker">total: </div>
        <div className="font-medium text-sm text-primaryDarker">R$ 2,500</div>
      </div>
      <Button
        variant="primary"
        onClick={() => handleSubmit(onSubmit)()}
        className="mt-3"
      >
        Reservar agora
      </Button>
    </div>
  )
}
