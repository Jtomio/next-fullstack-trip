'use client'
import Button from '@/components/Button'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import { differenceInDays } from 'date-fns'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

interface TripReservationProps {
  tripId: string
  tripStartDate: Date
  tripEndDate: Date
  maxGuests: number
  pricePerDay: number
}

interface TripReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

export default function TripReservation({
  tripId,
  tripEndDate,
  tripStartDate,
  maxGuests,
  pricePerDay,
}: TripReservationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TripReservationForm>()

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch('http://localhost:3000/api/trips/check', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        }),
      ),
    })
    const res = await response.json()

    if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
      setError('startDate', {
        type: 'manual',
        message: 'Esta data já esta reservada.',
      })
      setError('endDate', {
        type: 'manual',
        message: 'Esta data já esta reservada.',
      })
    }

    if (res?.error?.code === 'INVALID_START_DATE') {
      setError('startDate', {
        type: 'manual',
        message: 'Data inválida',
      })
    }

    if (res?.error?.code === 'INVALID_END_DATE') {
      setError('endDate', {
        type: 'manual',
        message: 'Data inválida',
      })
    }
  }

  const startDate = watch('startDate')
  const endDate = watch('endDate')

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
              placeholderText="Data da entrada"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors?.startDate}
              errorMessage={errors.startDate?.message}
              minDate={tripStartDate}
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
              placeholderText="Data da saída"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors?.endDate}
              errorMessage={errors.endDate?.message}
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
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
        placeholder={`Número de hospedes (max: ${maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className="flex justify-between mt-2">
        <div className="font-medium text-sm text-primaryDarker">total: </div>
        <div className="font-medium text-sm text-primaryDarker">
          {startDate && endDate
            ? `R$ ${differenceInDays(endDate, startDate) * pricePerDay ?? 1}`
            : 'R$ 0,00'}
        </div>
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
