import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListParams,
  CommonListResponse,
  CommonDetailParams,
  CommonDetailResponse,
} from 'src/api/types'
import { Approval } from './types'

const url = 'v1/master'
const subUrl = 'v1/approvals'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

export const getApprovalNOOList = async (
  params: CommonListParams,
): Promise<CommonListResponse<Approval>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list/customer-noo`,
    data: params,
  })
  return response.data
}

export const getApprovalDetail = async (
  params: CommonDetailParams,
  payload: any,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    data: payload,
    subUrl: `v1/master/get-customer/${params.company_id || 'PP01'}/${params.id}/detail`,
  })
  return response.data
}

export const multipleSubmitApprovalNOO = async (
  params: CommonDetailParams,
  payload: any,
): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/${params.id}/update/customer-noo`,
    data: payload,
  })
  return response.data
}

export const downloadApproval = async () => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/export-excel`,
  })
  return response.data
}
