'use client'
import Button from '@/components/Button'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

interface TripReservationProps {
  tripStartDate: Date
  tripEndDate: Date
  maxGuests: number
}

interface TripReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

export default function TripReservation({
  tripEndDate,
  tripStartDate,
  maxGuests,
}: TripReservationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<TripReservationForm>()

  const onSubmit = (data: any) => {
    console.log({ data })
  }

  const startDate = watch('startDate')

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
              placeholderText="Data final"
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
