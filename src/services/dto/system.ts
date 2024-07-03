export interface SystemResponse {
  id: string
  acronym: string
  description: string
  attendance_email?: string
  url: string
  status: 'ACTIVE' | 'INACTIVE'
  created_at: string
  updated_at: string | null
}

export interface FetchSystemsResponse {
  systems: SystemResponse[]
}

export interface SystemRequest {
  acronym: string
  description: string
  attendance_email?: string
  url: string
}
