import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import NextAuthSessionProvider from '@/components/session-provider'
import TanstackProvider from '@/components/tanstack-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistema de Segurança Digital',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  )
}
