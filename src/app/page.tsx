'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data } = useSession()

  return (
    <div>
      <div className="flex flex-col">
        <button onClick={() => signIn('google')}>Login com o Google</button>
        <button onClick={() => signOut()}>Logout</button>
      </div>
      <h1>Olá, {data?.user?.name}</h1>
      <img src={data?.user?.image ?? 'User'} alt="" />
    </div>
  )
}
