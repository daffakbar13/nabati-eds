import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { TransportationGroup } from './types'

const url = 'v1/master/list/transportation-group'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getListTransportationGroup = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<TransportationGroup>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createTransportationGroup = async (
  params: any,
): Promise<CommonListResponse<TransportationGroup>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateTransportationGroup = async (
  params: any,
  id: any,
): Promise<CommonListResponse<TransportationGroup>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/${id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusTransportationGroup = async (
  params: any,
  id: any,
): Promise<CommonListResponse<TransportationGroup>> => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${url}/${id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteTransportationGroup = async (
  params: any,
): Promise<CommonListResponse<TransportationGroup>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
