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

const url = 'v1/item-category'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getConfigSlocCompanyList = async (
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

export const createConfigItemCategory = async (
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

export const updateConfigItemCategory = async (
  params: any,
  salesOrgId: string,
  orderTypeId: string,
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/update/${salesOrgId}/${orderTypeId}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getConfigItemCategoryDetail = async (
  salesOrgId: string,
  orderTypeId: string = '1',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/detail/${salesOrgId}/${orderTypeId}`,
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