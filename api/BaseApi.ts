import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios'

import { METHODS } from 'api/methods'
import { errorInterceptor, responseInterceptor } from 'api/interceptors'
import { API_URL } from 'configs/env'
import { auth } from 'utils/auth'
import { toSnakeCase } from 'utils/formatter'

const instance = axios.create()
instance.interceptors.response.use(responseInterceptor, errorInterceptor)

interface CallOptions {
  method: Method
  subUrl?: string
  data?: Record<string, any>
  options?: AxiosRequestConfig
  overrideBaseUrl?: string
}

export function call({
  method,
  subUrl = '',
  data = {},
  options,
  overrideBaseUrl,
}: CallOptions): AxiosPromise {
  const token = auth.getToken()
  const config: AxiosRequestConfig = {
    ...options,
    baseURL: overrideBaseUrl || API_URL,
    withCredentials: true,
    method,
    url: subUrl,
    headers: {
      ...(options && options.headers ? options.headers : {}),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const payload = { ...data }
  if (method === METHODS.GET) {
    Object.keys(payload).forEach((key) => {
      if (payload[key] === null || payload[key] === '') {
        delete payload[key]
      }
    })
    config.params = toSnakeCase(payload)
  } else {
    config.data = toSnakeCase(payload)
  }
  return instance.request(config)
}

namespace API {
  export const URL = 'https://dist-system.nabatisnack.co.id:3001/'
  export interface Pagination {
    total: number
    per_page: number
    previous_page: number
    current_page: number
    next_page: number
    total_page: number
  }
}

export default API
