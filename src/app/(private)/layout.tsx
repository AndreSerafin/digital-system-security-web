import { Button } from '@/components/ui/button'
import { LogOut, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mb-16">
      <div className="h-[60px] flex items-center justify-between bg-primary px-4 fixed left-0 top-0 w-full">
        <Link
          className="inline-flex items-center text-slate-100 py-2 text-3xl font-bold"
          href={''}
        >
          <ShieldCheck className="h-8 w-8" />
          SSD
        </Link>

        <div>
          <Button className="gap-2 font-semibold" variant={'secondary'}>
            <LogOut />
          </Button>
        </div>
      </div>
      <div className="mt-[90px]">{children}</div>
    </div>
  )
}
