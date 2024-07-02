import { HttpLink } from '@/@types/http-link'

import { AxiosResponse } from 'axios'
import { DefaultAuthService } from '../../interfaces/default-auth-service'
import { UserAuthRequest, UserAuthResponse } from '@/services/dto/user-auth'

export class AuthService implements DefaultAuthService {
  constructor(
    private readonly endpoint: string,
    private readonly httpService: HttpLink<AxiosResponse>,
  ) {}

  async auth(input: UserAuthRequest): Promise<AxiosResponse<UserAuthResponse>> {
    const response = await this.httpService.post(this.endpoint, input)
    return response
  }
}
