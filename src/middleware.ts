import { NextResponse } from 'next/server'
import { env } from './env'

import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware'
export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/systems/:path*', '/accounts/:path*'],
}

export async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request })
  if (!token && process.env.NEXTAUTH_URL) {
    return NextResponse.redirect(`${env.NEXTAUTH_URL}`)
  }
}
