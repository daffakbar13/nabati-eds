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

export const getBillingGT = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<BillingItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list`,
    data: {
      filters: [
        {
          field: 'sales_org_id',
          option: 'EQ',
          from_value: 'PID1',
        },
        ...params.filters,
      ],
      limit: params.limit,
      page: params.page,
    },
  })
  return response.data
}

export const getBillingMT = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<BillingItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list`,
    data: {
      filters: [
        {
          field: 'sales_org_id',
          option: 'EQ',
          from_value: 'PID2',
        },
        ...params.filters,
      ],
      limit: params.limit,
      page: params.page,
    },
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

export const printBilling = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/print`,
    data: payload,
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

export const UpdateBilling = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/update`,
    data: payload,
  })
  return response.data
}
