import { AxiosHttpLink } from '../axios-http-link'
import { api } from '../axios-api'
import { SystemsService } from '../services/systems-service'

export function makeAxiosSystemsService() {
  const endpoint = '/systems'

  const axiosHttpLink = new AxiosHttpLink(api)
  const service = new SystemsService(endpoint, axiosHttpLink)

  return service
}
