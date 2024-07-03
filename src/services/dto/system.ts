export interface SystemResponse {
  id: string
  acronym: 'SYSTEST'
  description: string
  attendance_email: string
  url: string
  status: 'ACTIVE' | 'INACTIVE'
  created_at: string
  updated_at: string | null
}

export interface FetchSystemsResponse {
  systems: SystemResponse[]
}

export interface SystemRequest {
  description: string
  attendance_email: string
  url: string
  status: 'ACTIVE' | 'INACTIVE'
}
