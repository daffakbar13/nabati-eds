import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { Vehicle } from './types'

const url = 'v1/transportation/vehicles'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getListVehicle = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<Vehicle>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createConfigVehicle = async (
  params: any,
): Promise<CommonListResponse<Vehicle>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateConfigVehicle = async (
  params: any,
): Promise<CommonListResponse<Vehicle>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusVehicle = async (
  params: any,
  driver_id: any,
): Promise<CommonListResponse<Vehicle>> => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${url}/${driver_id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteVehicle = async (params: any): Promise<CommonListResponse<Vehicle>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
