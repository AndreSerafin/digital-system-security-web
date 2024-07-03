export interface SystemResponse {
  id: string
  acronym: string
  description: string
  attendance_email?: string | null
  url: string
  status: 'ACTIVE' | 'INACTIVE'
  created_at: string
  updated_at: string | null
  last_update_author: string
  last_update_author_id: string
  last_update_justification: string
}

export interface FetchSystemsResponse {
  total: number
  systems: SystemResponse[]
}

export interface SystemRequest {
  acronym: string
  description: string
  attendance_email?: string
  url: string
}

export interface UpdateSystemRequest {
  acronym: string
  description: string
  attendance_email?: string
  url: string
  update_justification: string
  status: string
}
