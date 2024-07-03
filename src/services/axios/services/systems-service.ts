import { HttpLink } from '@/@types/http-link'

import { AxiosResponse } from 'axios'
import {
  FetchSystemsResponse,
  SystemRequest,
  SystemResponse,
} from '@/services/dto/system'
import { DefaultSystemService } from '@/services/interfaces/default-system-service'

export class SystemsService implements DefaultSystemService {
  constructor(
    private readonly endpoint: string,
    private readonly httpService: HttpLink<AxiosResponse>,
  ) {}

  async fetch(): Promise<AxiosResponse<FetchSystemsResponse>> {
    const response = await this.httpService.get(this.endpoint)

    return response
  }

  async create(input: SystemRequest): Promise<AxiosResponse<SystemResponse>> {
    const response = await this.httpService.post(this.endpoint, input)

    return response
  }
}
