import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { CreditLimitList } from './types'

const url = 'v1/configuration'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getCreditLimitList = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<CreditLimitList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/config_credit_limit`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createCreditLimit = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create/config_credit_limit`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const ApproveCreditLimit = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/config_credit_limit`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const UpdateStatusCreditLimit = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update_is_active/config_credit_limit`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const DeleteCreditLimit = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/delete/config_credit_limit`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}
