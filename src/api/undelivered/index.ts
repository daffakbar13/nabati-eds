import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse, CommonDetailParams } from 'src/api/types'
import { Undelivered } from './types'

const subUrl = 'v1/undelivered'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

export const getUndeliveredList = async (
  params: CommonListParams,
): Promise<CommonListResponse<Undelivered>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}/list`,
    data: params,
  })
  return response.data
}

export const getUndeliveredDetail = async (
  params: CommonDetailParams,
): Promise<CommonListResponse<Undelivered>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${subUrl}/${params.id}`,
  })
  return response.data
}

export const multipleSubmitUndelivered = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/update`,
    data: payload,
  })
  return response.data
}

export const downloadUndelivered = async () => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/generate`,
  })
  return response.data
}
