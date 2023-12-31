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
    subUrl: `${url}/update_status_approval/config_credit_limit`,
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

export const UpdateCreditLimit = async (
  company_id: string,
  customer_id: string,
  valid_from: string,
  payload: any,
) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/config_credit_limit/${company_id}/${customer_id}/${valid_from}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const getDetailCreditLimit = async (company_id, customer_id, valid_from) => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/detail/config_credit_limit/${company_id}/${customer_id}/${valid_from}`,
    overrideBaseUrl,
  })
  return response.data
}
