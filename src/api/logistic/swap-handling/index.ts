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

const url = 'v1/swap-handling'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListSwapHandling = async (
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

export const getDetailSwapHandling = async (
  id: string,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${id}/detail`,
    overrideBaseUrl,
    data: { ...params, doc_type: 'ZIW1' },
  })
  return response.data
}

export const createSwapHandling = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
