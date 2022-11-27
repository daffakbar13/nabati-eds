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

const url = 'v1/good_receipt'

const overrideBaseUrl = API_BASE_URL_2

export const getGoodReceiptList = async (
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

export const createGoodReceipt = async (
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

export const getGoodReceiptDetail = async (
  id: string,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${id}/detail`,
    overrideBaseUrl,
    data: params,
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
