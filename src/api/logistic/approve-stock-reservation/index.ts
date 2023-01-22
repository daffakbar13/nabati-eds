import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { listApproval, listApprovalDetail } from './types'

const url = 'v1/canvas/approval'
const urlReject = 'v1/canvas/reject'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListApprovalReservation = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<listApproval>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getListApprovalReservationDetail = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<listApprovalDetail>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/detail`,
  })
  return response.data
}

export const UpdateApprovalReservation = async (id: string, payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/edit/${id}`,
    data: payload,
  })
  return response.data
}

export const UpdateApprovalReservationMultiple = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl,
    subUrl: `${url}/multiple_edit`,
    data: payload,
  })
  return response.data
}

export const UpdateRejectReservationMultiple = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl,
    subUrl: `${urlReject}/multiple_edit`,
    data: payload,
  })
  return response.data
}
