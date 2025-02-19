import { env } from '@/env'
import { AppError } from '@/utils/app-error'
import axios, { AxiosError } from 'axios'
import { getSession } from 'next-auth/react'

const ApiClient = () => {
  const defaultOptions = {
    baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  }

  const instance = axios.create(defaultOptions)

  instance.interceptors.request.use(async (request) => {
    const session = await getSession()
    if (session) {
      request.headers.Authorization = `Bearer ${session.user.access_token}`
    }
    return request
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      throw new AppError(error.response)
    },
  )

  return instance
}

export const api = ApiClient()
