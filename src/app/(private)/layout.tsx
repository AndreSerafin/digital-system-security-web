import { ReactNode } from 'react'
import { Header } from './components/header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mb-16">
      <Header />
      <div className="mt-[90px]">{children}</div>
    </div>
  )
}
