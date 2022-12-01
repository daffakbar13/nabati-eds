/* eslint-disable camelcase */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse, CommonDetailParams, CommonDetailResponse } from 'src/api/types'
import { DeliveryOrder } from './types'

const url = 'v1/delivery-orders'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

export const getDeliveryOrderList = async (
  params: CommonListParams,
): Promise<CommonListResponse<DeliveryOrder>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list`,
    data: params,
  })
  return response.data
}

export const getDeliveryOrderDetail = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    overrideBaseUrl,
    method: METHODS.GET,
    subUrl: `${url}/${params.id}/detail`,
    // data: params
  })
  return response.data
}

export const createDeliveryOrder = async (payload: any) => {
  const response = await call({
    overrideBaseUrl,
    method: METHODS.POST,
    subUrl: `${url}/create`,
    data: payload,
  })
  return response.data
}

export const editDeliveryOrder = async (payload: DeliveryOrder) => {
  const response = await call({
    overrideBaseUrl,
    method: METHODS.PATCH,
    subUrl: `${url}/${payload.id}`,
    data: payload,
  })
  return response.data
}

export const manualSubmitDeliveryOrder = async (
  delivery_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    overrideBaseUrl,
    method: METHODS.POST,
    subUrl: `${url}/${delivery_id}/submit`,
    // data: params
  })
  return response.data
}

export const cancelDeliveryOrder = async (
  delivery_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    overrideBaseUrl,
    method: METHODS.POST,
    subUrl: `${url}/${delivery_id}/cancel`,
    // data: params
  })
  return response.data
}