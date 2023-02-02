import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { GoodRecepitList, GoodRecepitListDetail } from './type'

const url = 'v1/material-doc'
const urlDelivery = 'v1/sto-delivery/good-receipt'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getGoodReceiptList = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<GoodRecepitList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/receipt/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getGoodReceiptListStoDelivery = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<GoodRecepitList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${urlDelivery}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getGoodReceiptDetail = async (
  params: any,
): Promise<CommonListResponse<GoodRecepitListDetail>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/goodReceipt/${params.id}/detail`,
    overrideBaseUrl,
  })
  return response.data
}

export const updateReceipt = async (id: any, params: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/goodReceipt/${id}/update`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const confitmGoodReceipt = async (id: string, params: {}) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/good_receipt/${id}/confirm`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
