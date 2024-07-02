export declare module 'next-auth' {
  export interface User {
    id?: number
    access_token: string
  }

  interface Session {
    user: User
    expires: string
    error?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
    sub: string
    iat: number
    exp: number
    jti: string
    error?: string
  }
}
