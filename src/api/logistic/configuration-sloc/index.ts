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

const url = 'v1/configuration'

const overrideBaseUrl = API_BASE_URL_2

export const getConfigSlocList = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list_config_sloc`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createConfigSloc = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create_sloc`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateConfigSloc = async (
  params: any,
  companyId: string,
  branchId: string,
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update_config_sloc/${companyId}/${branchId}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getConfigSlocDetail = async (
  companyId: string,
  branchId: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/detail_config_sloc/${companyId}/${branchId}`,
    overrideBaseUrl,

  })
  return response.data
}

export const updateStatus = async (
  params: any,
  options: any,
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update_sloc_company/status/${options.company_id}/${options.key}/${options.sloc_id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}