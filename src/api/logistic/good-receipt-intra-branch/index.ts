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

const url = 'v1/material-doc/receipt'
const urlGoodReceipt = 'v1/material-doc/goodReceipt'

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

export const getGoodReceiptDetail = async (params: any): Promise<CommonListResponse<GoodRecepitListDetail>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${urlGoodReceipt}/${params.id}/detail`,
    overrideBaseUrl,
  })
  return response.data
}

export const updateReceipt = async (id: any, params: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${urlGoodReceipt}/${id}/update`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}