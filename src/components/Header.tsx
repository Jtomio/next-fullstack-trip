'use client'
import Image from 'next/image'
import React, { useState } from 'react'

import LogoImg from '../../public/logo.svg'
import { signIn, signOut, useSession } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'
import Link from 'next/link'

export default function Header() {
  const { status, data } = useSession()
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const handleLoginClick = () => signIn()
  const handleLogOutClick = () => signOut()
  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

  const handleMyTripsClick = () => {}

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center sticky top-0 z-10 bg-white shadow-b-sm">
      <div className="relative h-[32px] w-[182px]">
        <Image src={LogoImg} fill alt="image logo" />
      </div>

      {status === 'unauthenticated' && (
        <button
          className="text-primary text-sm font-semibold"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}
      {status === 'authenticated' && data.user && (
        <div className="flex justify-center items-center gap-3 border-grayLighter p-2 border border-solid rounded-full relative">
          <AiOutlineMenu
            size={16}
            onClick={handleMenuClick}
            className=" cursor-pointer"
          />
          <Image
            src={data.user.image!}
            height={35}
            width={35}
            alt={data.user.name!}
            className="rounded-full shadow-md"
          />

          {menuIsOpen && (
            <div className="absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md p-2 px-3 flex flex-col justify-center items-center cursor-pointer">
              <Link href="/my-trips">
                <button className="text-primary text-xs font-semibold mb-2">
                  Minhas viagens
                </button>
              </Link>
              <button
                className="text-primary text-xs font-semibold"
                onClick={handleLogOutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
