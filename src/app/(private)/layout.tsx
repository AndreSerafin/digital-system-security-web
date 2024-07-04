import { ReactNode } from 'react'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mb-16">
      <Header />
      <Sidebar />
      <div className="mt-[90px] ml-[120px]">{children}</div>
    </div>
  )
}
