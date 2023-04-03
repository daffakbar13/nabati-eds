import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { Collector } from './types'

const url = 'v1/master'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getListCollector = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<Collector>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/collectors`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createCollector = async (params: any): Promise<CommonListResponse<Collector>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create/collectors`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateCollector = async (params: any): Promise<CommonListResponse<Collector>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/collectors`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusCollector = async (
  params: any,
): Promise<CommonListResponse<Collector>> => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${url}/update/collectors`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteCollector = async (params: any): Promise<CommonListResponse<Collector>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}/delete/collectors`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
