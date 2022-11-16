import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { GoodRecepitList } from './type'

const url = 'v1/material-doc/receipt'

const overrideBaseUrl = API_BASE_URL_2

export const getGoodReceiptList = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<GoodRecepitList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

// export const createGoodReceipt = async (
//   params: CommonListParams = {},
// ): Promise<CommonListResponse<StockRealTime>> => {
//   const response = await call({
//     method: METHODS.POST,
//     subUrl: `${url}`,
//     overrideBaseUrl,
//     data: params,
//   })
//   return response.data
// }

// export const getGoodReceiptDetail = async (
//   id: string,
//   params: CommonListParams = {},
// ): Promise<CommonListResponse<StockRealTime>> => {
//   const response = await call({
//     method: METHODS.POST,
//     subUrl: `${url}/${id}/detail_return`,
//     overrideBaseUrl,
//     data: params,
//   })
//   return response.data
// }