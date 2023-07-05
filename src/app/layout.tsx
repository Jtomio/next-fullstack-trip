import React from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'
import { NextAuthProvider } from '@/providers/auth'
import Header from '@/components/Header'

const inter = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'FSW Trips',
  description: 'Planeje suas viagens...Com nosso Sistema.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
