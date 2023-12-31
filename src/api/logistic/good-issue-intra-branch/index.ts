import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { GoodIssueList, GoodIssueDetail } from './type'

const url = 'v1/material-doc/sto-delivery/issue'
const urlDetail = 'v1/material-doc/goodIssue'
const urlDelivery = 'v1/sto-delivery/good-issue'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getGoodIssueList = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<GoodIssueList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getGoodIssueListStoDelivery = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<GoodIssueList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${urlDelivery}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getGoodIssueDetail = async (
  params: any = {},
): Promise<CommonListResponse<GoodIssueDetail>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${urlDetail}/${params.id}/detail?doc_type=${params.doc_type}`,
    overrideBaseUrl,
  })
  return response.data
}

export const getGoodIssueDetailStoDelivery = async (
  params: any = {},
): Promise<CommonListResponse<GoodIssueDetail>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${urlDelivery}/${params.id}/detail?request_number=${params.requestNumber}&doc_type=${params.doc_type}`,
    overrideBaseUrl,
  })
  return response.data
}
