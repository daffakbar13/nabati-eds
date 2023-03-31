import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ListApprovalBlock } from './types'

const url = 'v1/configuration/approval_so_block'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getConfigSoBlock = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<ListApprovalBlock>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteConfigSoBlock = async (
  params = {},
): Promise<CommonListResponse<ListApprovalBlock>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/delete`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createConfigSoBlock = async (
  params = {},
): Promise<CommonListResponse<ListApprovalBlock>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateConfigSoBlock = async (
  company_id: string,
  params = {},
): Promise<CommonListResponse<ListApprovalBlock>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/${company_id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusConfigSoBlock = async (
  company_id: string,
  params = {},
): Promise<CommonListResponse<ListApprovalBlock>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update_status_company/${company_id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
