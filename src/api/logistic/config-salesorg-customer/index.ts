import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ListSalesORGCustomer } from './types'

const url = 'v1/configuration/sales_organization_customer'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListSalesORGCustomer = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<ListSalesORGCustomer>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createSalesORGCustomer = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const getDetailSalesORGCustomer = async (company_id: string, customer_id: string) => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/detail/${company_id}/${customer_id}`,
    overrideBaseUrl,
  })
  return response.data
}

export const updateSalesORGCustomer = async (
  company_id: string,
  customer_id: string,
  payload: any,
) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/${company_id}/${customer_id}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const UpdateStatusSalesORGCustomer = async (
  company_id: string,
  customer_id: string,
  payload: any,
) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update_status/${company_id}/${customer_id}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}
