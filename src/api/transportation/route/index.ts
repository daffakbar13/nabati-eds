import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { TransportationRoute } from './types'

const url = 'v1/master'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getLisTransportationRoute = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<TransportationRoute>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/route`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createTransportationRoute = async (
  params: any,
): Promise<CommonListResponse<TransportationRoute>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create/route`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateTransportationRoute = async (
  params: any,
): Promise<CommonListResponse<TransportationRoute>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/route`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusTransportationRoute = async (
  params: any,
): Promise<CommonListResponse<TransportationRoute>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/route-status`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteTransportationRoute = async (
  params: any,
): Promise<CommonListResponse<TransportationRoute>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}/delete/route`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
