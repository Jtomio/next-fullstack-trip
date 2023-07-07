'use client'
import Button from '@/components/Button'
import CurrencyInput from '@/components/CurrencyInput'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import React from 'react'

export default function TripSearch() {
  return (
    <div className="container mx-auto p-5 bg-search-bg bg-cover bg-center bg-no-repeat">
      <h1 className="font-semibold text-2xl text-primaryDarker text-center">
        Encontre a sua próxima <span className="text-primary">viagem!</span>
      </h1>
      <div className="flex flex-col gap-4 mt-5">
        <Input placeholder="Onde você quer ir?" />

        <div className="flex">
          <DatePicker onChange={() => {}} placeholderText="Data da ida" />
          <CurrencyInput placeholder="Orçamento" />
        </div>
        <Button variant="primary">Buscar</Button>
      </div>
    </div>
  )
}
