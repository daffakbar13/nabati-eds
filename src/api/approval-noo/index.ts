import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse, CommonDetailParams } from 'src/api/types'
import { Approval } from './types'

const url = 'v1/master'
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
): Promise<CommonListResponse<Approval>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${params.id}/detail`,
  })
  return response.data
}

export const multipleSubmitApprovalNOO = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/submit`,
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
