import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Link
        className="absolute top-5 left-5 inline-flex items-center text-primary py-2 text-3xl font-bold"
        href={'/'}
      >
        <ShieldCheck className="h-8 w-8" />
        SSD
      </Link>
      {children}
    </div>
  )
}
