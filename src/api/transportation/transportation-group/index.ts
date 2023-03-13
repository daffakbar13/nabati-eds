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

const url = 'v1/master'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getListTransportationGroup = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<TransportationGroup>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/transportation-group`,
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
    subUrl: `${url}/create/transportation-group`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateTransportationGroup = async (
  params: any,
): Promise<CommonListResponse<TransportationGroup>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/transportation-group`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusTransportationGroup = async (
  params: any,
): Promise<CommonListResponse<TransportationGroup>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/transportation-group-status`,
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
    subUrl: `${url}/delete/transportation-group`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
