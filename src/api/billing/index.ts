import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { BillingItem } from './types'

const subUrl = 'v1/billing/list'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getBilling = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<BillingItem>> => {
  const response = await call({ method: METHODS.POST, overrideBaseUrl, subUrl })
  return response.data
}

export const getDetailBilling = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<BillingItem>> => {
  const response = await call({ method: METHODS.GET, overrideBaseUrl, subUrl: 'v1/billing/' + params.id + '/detail' })
  return response.data
}
