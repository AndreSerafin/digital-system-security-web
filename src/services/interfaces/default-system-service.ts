import { AxiosResponse } from 'axios'
import {
  FetchSystemsResponse,
  SystemRequest,
  SystemResponse,
} from '../dto/system'

export interface DefaultSystemService {
  fetch(): Promise<AxiosResponse<FetchSystemsResponse>>
  create(input: SystemRequest): Promise<AxiosResponse<SystemResponse>>
}
