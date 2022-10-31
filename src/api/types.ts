export interface CommonPagination {
  total: number
  per_page: number
  previous_page: number
  current_page: number
  next_page: number
  total_page: number
}

export interface CommonListResponse<T> {
  status: string
  message: string
  data: {
    result: T[]
    pagination: CommonPagination
  }
}

export interface CommonDetailResponse<T> {
  data: T
}

export interface CommonDetailParams {
  id?: string
}

export interface CommonListParams {
  page?: number
  limit?: number
  filters?: any[]
}
