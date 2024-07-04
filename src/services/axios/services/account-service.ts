import { HttpLink } from '@/@types/http-link'

import { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  FetchAccountsResponse,
  AccountRequest,
  AccountResponse,
} from '@/services/dto/account'
import { DefaultAccountService } from '@/services/interfaces/default-account-service'

export class AccountsService implements DefaultAccountService {
  constructor(
    private readonly endpoint: string,
    private readonly httpService: HttpLink<AxiosResponse>,
  ) {}

  async fetch(
    params?: AxiosRequestConfig,
  ): Promise<AxiosResponse<FetchAccountsResponse>> {
    const response = await this.httpService.get(this.endpoint, { ...params })

    return response
  }

  async create(input: AccountRequest): Promise<AxiosResponse<AccountResponse>> {
    const response = await this.httpService.post(this.endpoint, input)

    return response
  }
}
