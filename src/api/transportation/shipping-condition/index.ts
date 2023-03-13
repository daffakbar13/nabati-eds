import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ShipementCondition } from './types'

const url = 'v1/master'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getListShippingCondition = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<ShipementCondition>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/shipping-condition`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createShippingCondition = async (
  params: any,
): Promise<CommonListResponse<ShipementCondition>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create/shipping-condition`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateShippingCondition = async (
  params: any,
): Promise<CommonListResponse<ShipementCondition>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/shipping-condition`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusShippingCondition = async (
  params: any,
): Promise<CommonListResponse<ShipementCondition>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/shipping-condition-status`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteShippingCondition = async (
  params: any,
): Promise<CommonListResponse<ShipementCondition>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}/delete/shipping-condition`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
