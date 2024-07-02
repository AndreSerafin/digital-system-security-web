import { type AxiosInstance, type AxiosResponse } from 'axios'

import { HttpLink } from '@/@types/http-link'

export class AxiosHttpLink implements HttpLink<AxiosResponse> {
  constructor(private readonly axiosUrl: AxiosInstance) {}

  async post(url: string, data?: any) {
    return await this.axiosUrl.post(url, data)
  }

  async get(url: string, config?: any) {
    return await this.axiosUrl.get(url, config)
  }

  async put(url: string, config?: any) {
    return await this.axiosUrl.put(url, config)
  }

  async patch(url: string, config?: any) {
    return await this.axiosUrl.patch(url, config)
  }

  async delete(url: string, config?: any) {
    return await this.axiosUrl.delete(url, config)
  }
}
