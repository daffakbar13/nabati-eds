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

export const getConfigSlocCompanyList = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list_sloc_company`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createConfigSlocCompany = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create_sloc_company`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateConfigSlocCompany = async (
  params: any,
  companyId: string,
  slocId: string,
  key: string = '1',
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update_sloc_company/${companyId}/${key}/${slocId}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getConfigSlocCompanyDetail = async (
  companyId: string,
  slocId: string,
  key: string = '1',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/detail_sloc_company/${companyId}/${key}/${slocId}`,
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

export const deleteMultpileSlocCompany = async (params: any): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/sloc_company/multiple_delete`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
