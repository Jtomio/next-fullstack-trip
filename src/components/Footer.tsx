import React from 'react'
import LogoImg from '../../public/logo.svg'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="container mx-auto mt-4 fixed inset-x-0 bottom-0 p-10 bg-walterWhite">
      <div className="flex  flex-col justify-center items-center">
        <Image src={LogoImg} alt="logo" />
        <p className="text-sm font-semibold mt-2 text-primaryDarker">
          Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
