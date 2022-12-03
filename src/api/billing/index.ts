import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { BillingItem } from './types'

const url = 'v1/billings'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

export const getBilling = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<BillingItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list`,
    data: params,
  })
  return response.data
}

export const getDetailBilling = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<BillingItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}`,
  })
  return response.data
}

export const createBilling = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/create`,
    data: payload,
  })
  return response.data
}
