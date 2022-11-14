import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { SalesOrderItem } from './types'

const url = 'v1/sales-orders'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getSalesOrder = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<SalesOrderItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list`,
    data: params,
  })
  return response.data
}

export const getDetailSalesOrder = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<SalesOrderItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/detail`,
  })
  return response.data
}

export const createSalesOrder = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create`,
    data: payload,
  })
  return response.data
}

export const updateSalesOrder = async (payload: any, id: string) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/${id}/update`,
    data: payload,
  })
  return response.data
}

export const downloadTemplateSalesOrder = async () => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/export-excel`,
    // data: payload,
  })
  return response.data
}

export const cancelSalesOrder = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/cancel-batch-order`,
    data: payload,
  })
  return response.data
}