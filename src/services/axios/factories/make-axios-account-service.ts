import { AxiosHttpLink } from '../axios-http-link'
import { api } from '../axios-api'
import { AccountsService } from '../services/account-service'

export function makeAxiosAccountsService() {
  const endpoint = '/accounts'

  const axiosHttpLink = new AxiosHttpLink(api)
  const service = new AccountsService(endpoint, axiosHttpLink)

  return service
}
