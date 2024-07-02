import { AxiosHttpLink } from '../axios-http-link'
import { api } from '../axios-api'
import { AuthService } from '../services/auth-service'

export function makeAxiosAuthService() {
  const endpoint = '/sessions'

  const axiosHttpLink = new AxiosHttpLink(api)
  const service = new AuthService(endpoint, axiosHttpLink)

  return service
}
