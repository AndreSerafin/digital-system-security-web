import { AxiosResponse } from 'axios'
import { UserAuthRequest, UserAuthResponse } from '../dto/user-auth'

export interface DefaultAuthService {
  auth(input: UserAuthRequest): Promise<AxiosResponse<UserAuthResponse>>
}
