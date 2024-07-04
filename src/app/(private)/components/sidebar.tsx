'use client'

import { Cog, LogOut, Users2 } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed py-6 top-[59px] h-[calc(100vh-59px)] w-[100px] bg-primary flex flex-col items-center justify-between">
      <div className="flex flex-col gap-4">
        <Link
          className={`p-2 text-white hover:bg-slate-400 transition-all rounded-md ${pathname === '/systems' && 'bg-slate-500'}`}
          href={'/systems'}
        >
          <Cog />
        </Link>
        <Link
          className={`p-2 text-white hover:bg-slate-400 transition-all rounded-md ${pathname === '/accounts' && 'bg-slate-500'}`}
          href={'/accounts'}
        >
          <Users2 />
        </Link>
      </div>
      <div>
        <button
          className="p-2 font-semibold text-red-600 hover:bg-slate-400 transition-all rounded-md"
          onClick={() => signOut()}
        >
          <LogOut />
        </button>
      </div>
    </div>
  )
}
