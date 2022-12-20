import { AxiosError, AxiosResponse } from 'axios'
import Router from 'next/router'
import yell from 'src/components/yell'
import { PUBLIC_URL } from 'src/configs/env'
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_LOGIN_ERROR,
  HTTP_NETWORK_ERROR,
  HTTP_NETWORK_ISSUE_ERROR,
  HTTP_SESSION_EXPIRED,
  HTTP_UNAUTHORIZED_ACTION,
} from './http-error-message'

const LOGIN_SUB_URL = 'login'

export const responseInterceptor = (response: AxiosResponse) => ({
  ...response,
  // ...(response.data && { data: toCamelCase(response.data) }),
})

export const errorInterceptor = (err: AxiosError): Promise<never> => {
  const { response } = err
  if (response) {
    const message: string = response?.data?.message
    const url: string = response?.config?.url || ''
    if (response.status === 401 && url.includes(LOGIN_SUB_URL)) {
      yell(message || HTTP_LOGIN_ERROR)
      localStorage.clear()
    } else if (response.status === 401) {
      yell(message || HTTP_SESSION_EXPIRED)
      window.setTimeout(() => {
        localStorage.clear()
        window.location.href = `${PUBLIC_URL}/login`
      }, 1500)
    } else if (response.status === 400) {
      yell(message || HTTP_UNAUTHORIZED_ACTION)
    } else if (response.status === 403) {
      yell(HTTP_UNAUTHORIZED_ACTION)
    } else if (message || response.status === 500) {
      yell(HTTP_INTERNAL_SERVER_ERROR)
    } else if (message || response.status === 503) {
      Router.push('/maintenance')
    } else {
      yell(HTTP_NETWORK_ISSUE_ERROR)
    }
  } else {
    yell(HTTP_NETWORK_ERROR)
  }
  return Promise.reject(err)
}
