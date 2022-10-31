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

// const url = 'v1/stocks'
const url = 'v1/sales-orders'

const overrideBaseUrl = API_BASE_URL_2

export const getStockRealtimeList = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    // overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getDetailStockRealTime = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${params.id}/detail`,
    // overrideBaseUrl,
  })
  return response.data
}
