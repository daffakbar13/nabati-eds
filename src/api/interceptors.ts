import { AxiosError, AxiosResponse } from 'axios'
import Router from 'next/router'
import { toCamelCase } from 'src/utils/formatter'
import { PUBLIC_URL } from 'src/configs/env'
import MSG from './http-error-message'

const LOGIN_SUB_URL = 'login'

export const responseInterceptor = (response: AxiosResponse) => ({
  ...response,
  ...(response.data && { data: toCamelCase(response.data) }),
})

export const errorInterceptor = (err: AxiosError): Promise<never> => {
  const { response } = err
  if (response) {
    const url: string = response?.config?.url || ''
    if (response.status === 401 && url.includes(LOGIN_SUB_URL)) {
      alert(MSG.HTTP_LOGIN_ERROR)
      localStorage.clear()
    } else if (response.status === 401) {
      alert(MSG.HTTP_SESSION_EXPIRED)
      window.setTimeout(() => {
        localStorage.clear()
        window.location.href = `${PUBLIC_URL}/login`
      }, 1500)
    } else if (response.status === 403) {
      alert(MSG.HTTP_UNAUTHORIZED_ACTION)
    } else if (response.status === 500) {
      alert(MSG.HTTP_INTERNAL_SERVER_ERROR)
    } else if (response.status === 503) {
      Router.push('/maintenance')
    } else {
      alert(MSG.HTTP_NETWORK_ISSUE_ERROR)
    }
  } else {
    alert(MSG.HTTP_NETWORK_ERROR)
  }
  return Promise.reject(err)
}
