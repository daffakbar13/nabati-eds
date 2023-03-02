import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ListSlocman } from './types'

const url = 'v1/sloc-salesman'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListSlocman = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<ListSlocman>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createSlocman = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const getDetailSlocman = async (idSloc: string) => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${idSloc}/detail`,
    overrideBaseUrl,
  })
  return response.data
}

export const updateSlocman = async (id: string, sloc_id: string, payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/data/${id}/${sloc_id}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const UpdateStatusSlocman = async (id: string, payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/status/${id}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const DeleteSlocman = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/multiple_delete`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}
