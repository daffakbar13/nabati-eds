import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { GeneralSetting } from './types'

const url = 'v1/config-sales/general-setting'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_1

export const getListGeneralSetting = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<GeneralSetting>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createGeneralSetting = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/create`,
    data: payload,
  })
  return response.data
}

export const updateGeneralSetting = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl,
    subUrl: `${url}/update`,
    data: payload,
  })
  return response.data
}

export const updateStatusGeneralSetting = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl,
    subUrl: `${url}/update-status`,
    data: payload,
  })
  return response.data
}
