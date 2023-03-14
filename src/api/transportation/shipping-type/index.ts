import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ShippingType } from './types'

const url = 'v1/transportation/shipping-types'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getListShippingType = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<ShippingType>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createConfigShippingType = async (params: any): Promise<CommonListResponse<ShippingType>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateConfigShippingType = async (
  params: any,
): Promise<CommonListResponse<ShippingType>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusShippingType = async (
  params: any,
  driver_id: any,
): Promise<CommonListResponse<ShippingType>> => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${url}/${driver_id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteShippingType= async (
  params: any,
): Promise<CommonListResponse<ShippingType>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
