import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { TransportationZone } from './types'

const url = 'v1/master'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getLisTransportationZone = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<TransportationZone>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/transportation-zone`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createTransportationZone = async (
  params: any,
): Promise<CommonListResponse<TransportationZone>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create/transportation-zone`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateTransportationZone = async (
  params: any,
): Promise<CommonListResponse<TransportationZone>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/transportation-zone`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusTransportationZone = async (
  params: any,
): Promise<CommonListResponse<TransportationZone>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/transportation-zone-status`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteTransportationZone = async (
  params: any,
): Promise<CommonListResponse<TransportationZone>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}/delete/transportation-zone`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
