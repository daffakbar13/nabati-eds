import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ListSalesORGCustomerGroupCustomerGroup } from './types'

const url = 'v1/configuration/sales_organization_channel'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListSalesORGCustomerGroupCustomerGroup = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<ListSalesORGCustomerGroupCustomerGroup>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createSalesORGCustomerGroupCustomerGroup = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const getDetailSalesORGCustomerGroupCustomerGroup = async (
  company_id: string,
  sales_org_id: string,
  channel_id: string,
  customer_group_id: string,
  salesman_group_id: string,
  min_line: string,
) => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/detail/${company_id}/${sales_org_id}/${channel_id}/${customer_group_id}/${salesman_group_id}/${min_line}`,
    overrideBaseUrl,
  })
  return response.data
}

export const updateSalesORGCustomerGroupCustomerGroup = async (
  company_id: string,
  sales_org_id: string,
  channel_id: string,
  customer_group_id: string,
  salesman_group_id: string,
  min_line: string,
  payload: any,
) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/${company_id}/${sales_org_id}/${channel_id}/${customer_group_id}/${salesman_group_id}/${min_line}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const UpdateStatusSalesORGCustomerGroupCustomerGroup = async (
  company_id: string,
  sales_org_id: string,
  channel_id: string,
  customer_group_id: string,
  salesman_group_id: string,
  min_line: string,
  payload: any,
) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update_status/${company_id}/${sales_org_id}/${channel_id}/${customer_group_id}/${salesman_group_id}/${min_line}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}
