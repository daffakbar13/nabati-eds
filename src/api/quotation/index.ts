import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { QuotationDetailResult, QuotationItem } from './types'

const subUrl = 'v1/quotations'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getQuotation = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<QuotationItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}/list`,
    data: params,
  })
  return response.data
}

export const getDetailQuotation = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<QuotationDetailResult>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `v1/quotations/${params.id}/detail`,
  })
  return response.data
}

export const createQuotation = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/create`,
    data: payload,
  })
  return response.data
}

export const updateQuotation = async (payload: any, id: string) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/${id}/update`,
    data: payload,
  })
  return response.data
}

export const cancelBatchOrder = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/cancel-batch-order`,
    data: payload,
  })
  return response.data
}

export const cancelOrder = async (id: string) => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${subUrl}/${id}/cancel-order`,
  })
  return response.data
}

export const multipleSubmitQuotation = async (payload: { order_list: { id: string }[] }) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: 'v1/sales-orders/submit',
    data: payload,
  })
  return response.data
}