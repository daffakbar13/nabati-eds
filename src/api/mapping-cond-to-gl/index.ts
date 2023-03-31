import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { MappingCondToGL } from './types'

const url = '/v1/config-sales/mapping-condition'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getLisMappingCondToGL = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<MappingCondToGL>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createMappingCondToGL = async (
  params: any,
): Promise<CommonListResponse<MappingCondToGL>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateMappingCondToGL = async (
  params: any,
): Promise<CommonListResponse<MappingCondToGL>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusMappingCondToGL = async (
  params: any,
): Promise<CommonListResponse<MappingCondToGL>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/status`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteMappingCondToGL = async (
  params: any,
): Promise<CommonListResponse<MappingCondToGL>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}/delete`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
