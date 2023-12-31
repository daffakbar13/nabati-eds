import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { StockRealTime, StockRealTimeDetailResult } from './types'

const url = 'v1/sto-purchase'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListPoSto = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getPoStoDetail = async (
  params: CommonDetailParams = {},
): Promise<CommonDetailResponse<StockRealTimeDetailResult>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${params.id}/detail`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createPoSto = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const updateStatusPoSto = async (
  params: any = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/edit/${params.id}`,
    overrideBaseUrl,
    data: {
      status_id: params.status_id,
    },
  })
  return response.data
}

export const ApproveMultiplePoSto = async (
  params: any = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/multiple_approve`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
