import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse, CommonDetailParams } from 'src/api/types'
import { DeliveryOrder } from './types'

const url = 'v1/delivery-orders'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

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
): Promise<CommonListResponse<DeliveryOrder>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${params.id}/detail`,
    // data: params
  })
  return response.data
}

export const createDeliveryOrder = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create`,
    data: payload,
  })
  return response.data
}

export const editDeliveryOrder = async (payload: DeliveryOrder) => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${url}/${payload.id}`,
    data: payload,
  })
  return response.data
}
