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

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getConfigCompanyList = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list_company`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createConfigCompany = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create_company`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateConfigCompany = async (
  params: any,
  companyId: string,
  key: string = '1',
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update_company/${companyId}/${key}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getConfigCompanyDetail = async (
  companyId: string,
  key: string = '1',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/detail_company/${companyId}/${key}`,
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
    subUrl: `${url}/update_company/status/${options.company_id}/${options.key || '1'}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
