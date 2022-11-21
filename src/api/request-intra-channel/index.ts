import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { RequestIntraChannelItem, RequestIntraChannelItemDetail, slocList } from './types'

const subUrl = 'v1/intra-channel'
const subUrlMaster = 'v1/master'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3002/'
const overrideBaseUrlMaster = 'https://dist-system.nabatisnack.co.id:3001/'

export const getRequestIntraChannel = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<RequestIntraChannelItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}/list`,
    data: params,
  })
  return response.data
}

export const getDetailRequestIntraChannel = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<RequestIntraChannelItemDetail>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl}/${params.id}/detail`,
  })
  return response.data
}

export const getSloc = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${overrideBaseUrlMaster}${subUrlMaster}/get-config-sloc/${params.id}`,
  })
  return response.data
}

export const createRequestIntraChannel = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}`,
    data: payload,
  })
  return response.data
}

export const ChangeStatus = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}/edit/${payload.id}`,
    data: {
      status_id: payload.status_id
    },
  })
  return response.data
}

export const getBranchLocation = async (params: any) => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl}/branch/${params.id}/detail`,
  })
  return response.data
}