import React from 'react'
import LogoImg from '../../public/logo.svg'
import Image from 'next/image'

export default function Footer() {
  return (
    <div className="container mx-auto p-10 bg-walterWhite">
      <div className="flex  flex-col justify-center items-center">
        <Image src={LogoImg} alt="logo" />
        <p className="text-sm font-semibold mt-2 text-primaryDarker">
          Todos os direitos reservados
        </p>
      </div>
    </div>
  )
}
