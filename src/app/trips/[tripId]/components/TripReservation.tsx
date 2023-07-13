'use client'
import Button from '@/components/Button'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import { differenceInDays } from 'date-fns'
import { useRouter } from 'next/navigation'
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

  const router = useRouter()

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
      return setError('endDate', {
        type: 'manual',
        message: 'Esta data já esta reservada.',
      })
    }

    if (res?.error?.code === 'INVALID_START_DATE') {
      return setError('startDate', {
        type: 'manual',
        message: 'Data inválida',
      })
    }

    if (res?.error?.code === 'INVALID_END_DATE') {
      setError('endDate', {
        type: 'manual',
        message: 'Data inválida',
      })
      return setError('endDate', {
        type: 'manual',
        message: 'Data inválida',
      })
    }

    router.push(
      `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${
        data.guests
      }`,
    )
  }

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const minDate = () => {
    const currentDate = new Date(Date.now())
    if (startDate === null) {
      return null
    }
    if (startDate <= currentDate || tripStartDate <= currentDate) {
      return currentDate
    } else {
      return startDate
    }
  }

  const maxDate = () => {
    const initialDate = new Date(Date.now())
    if (endDate === null) {
      return null
    }
    if (endDate <= initialDate || tripEndDate <= initialDate) {
      return initialDate
    } else {
      const newMaxDate = new Date(endDate)
      newMaxDate.setDate(newMaxDate.getDate() + 1)
      return newMaxDate
    }
  }

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
              minDate={minDate()}
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
              maxDate={maxDate()}
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
          max: {
            value: maxGuests,
            message: `Número de hóspedes não pode ser maior que ${maxGuests}.`,
          },
        })}
        placeholder={`Número de hospedes (max: ${maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        type="number"
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
