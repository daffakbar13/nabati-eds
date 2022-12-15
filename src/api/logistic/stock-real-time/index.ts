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

const url = 'v1/stocks'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getStockRealtimeList = async (
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

export const exportExcelStockRealTime = async (): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/export_excel`,
    overrideBaseUrl,
    // data: params,
  })
  return response.data
}
