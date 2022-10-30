import { AxiosError, AxiosResponse } from 'axios'
import Router from 'next/router'
import { toCamelCase } from 'src/utils/formatter'
import { PUBLIC_URL } from 'src/configs/env'
import {
  HTTP_ERROR,
  HTTP_UNAUTHORIZED_ACTION,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_LOGIN_ERROR,
  HTTP_UNKNOWN_ERROR,
  HTTP_UNPROCESSED_REQUEST,
  HTTP_NETWORK_ERROR,
  HTTP_NETWORK_ISSUE_ERROR,
  HTTP_SESSION_EXPIRED,
} from './http-error-message'

const LOGIN_SUB_URL = 'login'

export const responseInterceptor = (response: AxiosResponse) => ({
  ...response,
  // ...(response.data && { data: toCamelCase(response.data) }),
})

export const errorInterceptor = (err: AxiosError): Promise<never> => {
  const { response } = err
  if (response) {
    const url: string = response?.config?.url || ''
    if (response.status === 401 && url.includes(LOGIN_SUB_URL)) {
      alert(HTTP_LOGIN_ERROR)
      localStorage.clear()
    } else if (response.status === 401) {
      alert(HTTP_SESSION_EXPIRED)
      window.setTimeout(() => {
        localStorage.clear()
        window.location.href = `${PUBLIC_URL}/login`
      }, 1500)
    } else if (response.status === 403) {
      alert(HTTP_UNAUTHORIZED_ACTION)
    } else if (response.status === 500) {
      alert(HTTP_INTERNAL_SERVER_ERROR)
    } else if (response.status === 503) {
      Router.push('/maintenance')
    } else {
      alert(HTTP_NETWORK_ISSUE_ERROR)
    }
  } else {
    alert(HTTP_NETWORK_ERROR)
  }
  return Promise.reject(err)
}
