import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { QuotationItem } from './types'

const subUrl = 'v1/master/get-company'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getCompany = async (
  params: CommonListParams,
): Promise<CommonListResponse<QuotationItem>> => {
  const response = await call({ method: METHODS.GET, overrideBaseUrl, subUrl, data: params })
  return response.data
}
