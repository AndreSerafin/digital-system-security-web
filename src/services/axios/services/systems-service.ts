import { HttpLink } from '@/@types/http-link'

import { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  FetchSystemsResponse,
  SystemRequest,
  SystemResponse,
  UpdateSystemRequest,
} from '@/services/dto/system'
import { DefaultSystemService } from '@/services/interfaces/default-system-service'

export class SystemsService implements DefaultSystemService {
  constructor(
    private readonly endpoint: string,
    private readonly httpService: HttpLink<AxiosResponse>,
  ) {}

  async fetch(
    params?: AxiosRequestConfig,
  ): Promise<AxiosResponse<FetchSystemsResponse>> {
    const response = await this.httpService.get(this.endpoint, { ...params })

    return response
  }

  async create(input: SystemRequest): Promise<AxiosResponse<SystemResponse>> {
    const response = await this.httpService.post(this.endpoint, input)

    return response
  }

  async getById(
    systemId: string,
  ): Promise<AxiosResponse<{ system: SystemResponse }>> {
    const response = await this.httpService.get(`${this.endpoint}/${systemId}`)

    return response
  }

  async update(
    systemId: string,
    input: UpdateSystemRequest,
  ): Promise<AxiosResponse<SystemResponse>> {
    const response = await this.httpService.patch(
      `${this.endpoint}/${systemId}`,
      input,
    )

    return response
  }
}
