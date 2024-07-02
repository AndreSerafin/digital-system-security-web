import { env } from '@/env'
import { makeAxiosAuthService } from '@/services/axios/factories/make-axios-auth-service'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authService = makeAxiosAuthService()

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      // eslint-disable-next-line
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        const { email, password } = credentials

        const {
          status,
          data: { access_token: accessToken },
        } = await authService.auth({
          email,
          password,
        })

        if (status === 401) {
          return null
        }

        const user = {
          access_token: accessToken,
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const accessToken = user.access_token

        token = {
          ...token,
          access_token: accessToken,
        }
      }

      return token
    },
    async session({ token: { access_token: accessToken, error }, session }) {
      session.user = {
        access_token: accessToken,
      }

      session.error = error

      return session
    },
  },
  secret: env.NEXTAUTH_SECRET,
  jwt: {
    secret: env.NEXTAUTH_SECRET,
    maxAge: env.NEXTAUTH_JWT_MAX_AGE,
  },
  pages: { signIn: '/' },
}

export { nextAuthOptions }
