'use client'

import { Button } from '@/components/ui/button'
import { LogOut, ShieldCheck } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export function Header() {
  return (
    <div className="h-[60px] flex items-center justify-between bg-primary px-4 fixed left-0 top-0 w-full">
      <Link
        className="inline-flex items-center text-slate-100 py-2 text-3xl font-bold"
        href={''}
      >
        <ShieldCheck className="h-8 w-8" />
        SSD
      </Link>

      <div>
        <Button
          className="gap-2 font-semibold"
          variant={'secondary'}
          onClick={() => signOut()}
        >
          <LogOut />
        </Button>
      </div>
    </div>
  )
}
