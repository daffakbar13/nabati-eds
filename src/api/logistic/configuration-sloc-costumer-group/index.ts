import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ListSlocGrupCust } from './types'

const url = 'v1/customer-group-sloc'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListCustomerGroup = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<ListSlocGrupCust>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const CreateCustomerGroup = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const getDetailCustomerGroup = async (sales_org_id: string, customer_group_id: string) => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/detail?sales_org_id=${sales_org_id}&customer_group_id=${customer_group_id}`,
    overrideBaseUrl,
  })
  return response.data
}

export const updateCustomerGroup = async (
  sales_org_id: string,
  customer_group_id: string,
  payload: any,
) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/update/data?sales_org_id=${sales_org_id}&customer_group_id=${customer_group_id}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const UpdateStatusCustomerGroup = async (
  sales_org_id: string,
  customer_group_id: string,
  payload: any,
) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/status?sales_org_id=${sales_org_id}&customer_group_id=${customer_group_id}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const DeleteMultipleCustomerGroup = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/multiple_delete`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}
