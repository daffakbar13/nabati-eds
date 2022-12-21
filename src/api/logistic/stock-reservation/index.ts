import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { stocReservationList, stocReservationDetail } from './types'

const url = 'v1/canvas/stock_reservation'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListStockReservation = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<stocReservationList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createRequestStockReservation = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}`,
    data: payload,
  })
  return response.data
}

export const getListStockReservationDetail = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<stocReservationDetail>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/detail`,
  })
  return response.data
}
