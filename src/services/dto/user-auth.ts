export interface UserAuthRequest {
  email: string
  password: string
}

export interface UserAuthResponse {
  access_token: string
}
