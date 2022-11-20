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

const url = 'v1/sto-purchase'

const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3002/'

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
): Promise<CommonDetailResponse<StockRealTime>> => {
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
      status_id: params.status_id
    },
  })
  return response.data
}

