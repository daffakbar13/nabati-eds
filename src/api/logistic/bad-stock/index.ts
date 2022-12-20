import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { BadStockList, BadStockDetail } from './types'

const url = 'v1/bad_stock'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListBadStock = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<BadStockList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createBadStock = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}`,
    data: payload,
  })
  return response.data
}

export const getDetailBadStock = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<BadStockDetail>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/detail/${params.id}`,
  })
  return response.data
}

export const updateStatusBadStock = async (id: string, payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl,
    subUrl: `${url}/edit/${id}`,
    data: payload,
  })
  return response.data
}
