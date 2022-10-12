import { call } from 'api/BaseApi'
import { METHODS } from 'api/methods'
import { SignInApiResponse } from 'api/user/types'

export const signInApi = async (
  password: string,
  email: string,
): Promise<SignInApiResponse> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: 'v1/login',
    data: { email, password },
  })
  return response.data
}

export const logout = async () => {
  const response = await call({ method: METHODS.POST, subUrl: 'v1/logout' })
  return response.data
}
