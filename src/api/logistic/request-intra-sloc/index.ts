import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { SlocList, SlocListDetail } from './types'

const url = 'v1/intra-sloc'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListSloc = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<SlocList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getDetailRequestIntraSloc = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<SlocListDetail>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/detail`,
  })
  return response.data
}

export const createRequestIntraSloc = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}`,
    data: payload,
  })
  return response.data
}
