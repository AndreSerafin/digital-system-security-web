import { AxiosResponse } from 'axios'
import {
  FetchSystemsResponse,
  SystemRequest,
  SystemResponse,
  UpdateSystemRequest,
} from '../dto/system'

export interface DefaultSystemService {
  fetch(): Promise<AxiosResponse<FetchSystemsResponse>>
  create(input: SystemRequest): Promise<AxiosResponse<SystemResponse>>
  update(
    systemId: string,
    input: UpdateSystemRequest,
  ): Promise<AxiosResponse<SystemResponse>>
  getById(systemId: string): Promise<AxiosResponse<{ system: SystemResponse }>>
}
