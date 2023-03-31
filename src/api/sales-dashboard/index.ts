/* eslint-disable camelcase */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams } from 'src/api/types'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

export const getDashboard = async (params: CommonListParams = {}): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `v1/dashboard`,
    data: params,
  })
  return response.data
}
