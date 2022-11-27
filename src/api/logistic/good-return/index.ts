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

export const getListGrReturn = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/return`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

// export const getGrReturnDetail = async (
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

export const getGrReturnDetail = async (
  id: string,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${id}/detail_return`,
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

export const createGrReturn = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/return`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
