import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { RouteDetermination } from './types'

const url = 'v1/master'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getLisRouteDetermination = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<RouteDetermination>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/route-determination`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createRouteDetermination = async (
  params: any,
): Promise<CommonListResponse<RouteDetermination>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create/route-determination`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateRouteDetermination = async (
  params: any,
): Promise<CommonListResponse<RouteDetermination>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/route-determination`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusRouteDetermination = async (
  params: any,
): Promise<CommonListResponse<RouteDetermination>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/route-determination-status`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteRouteDetermination = async (
  params: any,
): Promise<CommonListResponse<RouteDetermination>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}/delete/route-determination`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
