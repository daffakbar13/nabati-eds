import { PUBLIC_URL } from 'configs/env'
import { AuthUserInfo, SignInInputTypes } from './types'
import { LOCAL_STORAGE } from 'configs/localStorage'
import { SignInApiResponse } from 'api/user/types'
import { logout } from 'api/user'

export const auth = {
  authenticate: (
    signInInput: SignInInputTypes,
    signInResponse: SignInApiResponse,
  ): void => {
    const userInfo: AuthUserInfo = {
      email: signInInput.email,
      name: signInInput.name,
      id: signInResponse.id,
      roles: signInResponse.roles,
    }
    localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(userInfo))
    localStorage.setItem(LOCAL_STORAGE.TOKEN, signInResponse.token)
  },
  signOut: async (withRedirect?: boolean | undefined) => {
    await logout()
      .then()
      .finally(() => {
        localStorage.clear()
        if (!withRedirect) window.location.href = `${PUBLIC_URL}/login`
      })
  },
  isAuthenticated: (): boolean => !!auth.getToken(),
  getToken: (): string => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN)
    return token
  },
  getUserInfo: (): AuthUserInfo => {
    const userInfo = localStorage.getItem(LOCAL_STORAGE.USER)
    return userInfo ? JSON.parse(userInfo) : {}
  },
}
