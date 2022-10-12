import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListParams,
  CommonListResponse,
  CommonDetailParams,
} from 'src/api/types'
import { DeliveryOrder } from './types'

const subUrl = 'v1/delivery-order'

export const getDeliveryOrderList = async (
  params: CommonListParams,
): Promise<CommonListResponse<DeliveryOrder>> => {
  const response = await call({ method: METHODS.GET, subUrl, data: params })
  return response.data
}

export const getDeliveryOrderDetail = async (
  params: CommonDetailParams,
): Promise<CommonListResponse<DeliveryOrder>> => {
  const response = await call({ method: METHODS.GET, subUrl, data: params })
  return response.data
}

export const createDeliveryOrder = async (payload: any) => {
  const response = await call({ method: METHODS.POST, subUrl, data: payload })
  return response.data
}

export const editDeliveryOrder = async (payload: DeliveryOrder) => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${subUrl}/${payload.id}`,
    data: payload,
  })
  return response.data
}
