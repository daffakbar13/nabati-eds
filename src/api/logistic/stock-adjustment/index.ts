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

const url = 'v1/stock-adjustment'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListStockAdjustment = async (
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

export const getDetailStockAdjustment = async (
  params: CommonDetailParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${params.id}/detail`,
    overrideBaseUrl,
    data: { ...params, doc_type: 'WA' },
  })
  return response.data
}

export const createStockAdjustment = async (
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

export const updateStatusStockAdjustment = async (
  docNumber: string,
  params: any = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update_status/${docNumber}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const checkIsFreezeList = async (
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: 'v1/sloc/check/freeze',
    overrideBaseUrl,
    data: { ...params },
  })
  return response.data
}

export const freezeSlocIdByBranchId = async (
  params: any,
  branchId: string,
): Promise<CommonListResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `v1/sloc/edit/${branchId}`,
    overrideBaseUrl,
    data: { ...params },
  })
  return response.data
}

export const updateStockAdjustment = async (
  id: string,
  params: any = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/edit/${id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getListStockAdjustmentByBranchSloc = async (
  branchId: string,
  slocId: string,
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `v1/stocks/list`,
    // subUrl: `${url}/list`,
    overrideBaseUrl,
    data: {
      filters: [
        {
          field: 'branch_id',
          option: 'EQ',
          from_value: branchId,
          data_type: 'S',
        },
        {
          field: 'sloc_id',
          option: 'EQ',
          from_value: slocId,
          data_type: 'S',
        },
      ],
      limit: 20,
      page: 1,
    },
  })
  return response.data
}

export const approvalStockAdjustment = async (
  docNumber: string,
  params: any = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/approval/${docNumber}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
