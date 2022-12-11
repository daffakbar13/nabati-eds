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

const url = 'v1/tax-regulator'

const overrideBaseUrl = API_BASE_URL_2

export const getConfigTaxRegulatorList = async (
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

export const createConfigTaxRegulator = async (
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

export const updateConfigTaxRegulator = async (
  params: any,
  taxSubject: string,
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/update/${taxSubject}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getConfigTaxRegulatorDetail = async (
  companyId: string,
  taxSubject: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/detail/${companyId}/${taxSubject}`,
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