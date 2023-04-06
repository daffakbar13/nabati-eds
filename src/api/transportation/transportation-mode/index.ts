import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { TrasportationMode } from './types'

const url = 'v1/transportation/transportation-modes'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getListTrasportationMode = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<TrasportationMode>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createConfigTrasportationMode = async (
  params: any,
): Promise<CommonListResponse<TrasportationMode>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateConfigTrasportationMode = async (
  params: any,
): Promise<CommonListResponse<TrasportationMode>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusTrasportationMode = async (
  params: any,
  driver_id: any,
): Promise<CommonListResponse<TrasportationMode>> => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${url}/${driver_id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteTrasportationMode = async (
  params: any,
): Promise<CommonListResponse<TrasportationMode>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
