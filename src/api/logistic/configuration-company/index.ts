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
    method: METHODS.POST,
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

export const getGoodReceiptByPo = async (
  poNumber: string,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/request-data/${poNumber}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getGrReturnByRefDocNo = async (
  refDocNo: string,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/return/request-data/${refDocNo}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getPoNumberList = async (
  poNumber?: string | null,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/get_purchase_id/:po_number`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getRefDocNoList = async (
  poNumber?: string | null,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/get_purchase_id/:ref_doc_number`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getSlocListByBranch = async (
  branchId: string,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/get_sloc/${branchId}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const doCancelProcess = async (
  id: string,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/update_status/${id}`,
    overrideBaseUrl,
    data: { ...params, status_id: '02' },
  })
  return response.data
}
