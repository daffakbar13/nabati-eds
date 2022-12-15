import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { StockRealTime } from './types'

const url = 'v1/sto-delivery'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListDoSto = async (
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
  params: any,
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${params.id}/detail`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createDoSto = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const updateStatusPoSto = async (
  id: string,
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/${id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
