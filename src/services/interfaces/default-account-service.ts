import { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  FetchAccountsResponse,
  AccountRequest,
  AccountResponse,
} from '../dto/account'

export interface DefaultAccountService {
  fetch(
    params?: AxiosRequestConfig,
  ): Promise<AxiosResponse<FetchAccountsResponse>>
  create(input: AccountRequest): Promise<AxiosResponse<AccountResponse>>
}
