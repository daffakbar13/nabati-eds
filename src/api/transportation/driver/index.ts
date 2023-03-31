import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { Drivers } from './types'

const url = 'v1/transportation/drivers'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getListDriver = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<Drivers>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createConfigDriver = async (params: any): Promise<CommonListResponse<Drivers>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateConfigDriver = async (
  params: any,
  driversId: any,
): Promise<CommonListResponse<Drivers>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/${driversId}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusDriver = async (
  params: any,
  driver_id: any,
): Promise<CommonListResponse<Drivers>> => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${url}/${driver_id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteDriver = async (
  params: any,
): Promise<CommonListResponse<Drivers>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
