import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { SignInApiResponse } from 'src/api/user/types'

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
