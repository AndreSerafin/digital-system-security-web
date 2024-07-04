export interface AccountResponse {
  id: string
  name: string
  email: string
  role: string

  created_at: string
  updated_at: string
}

export interface FetchAccountsResponse {
  total: number
  users: AccountResponse[]
}

export interface AccountRequest {
  email: string
  name: string
  password: string
  role: string
}

export interface UpdateAccountRequest {
  acronym: string
  description: string
  attendance_email?: string
  url: string
  update_justification: string
  status: string
}
