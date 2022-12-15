import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { GoodIssueIntraChannelItem, GoodIssueIntraChannelItemDetail } from './types'

const subUrl = 'v1/material-doc'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getRequestIntraChannel = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<GoodIssueIntraChannelItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}/intra-channel/issue/list`,
    data: params,
  })
  return response.data
}

export const getGoodIssueIntraChannelDetail = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<GoodIssueIntraChannelItemDetail>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl}/intra-channel/issue/${params.id}/detail?doc_type=${params.doc_type}`,
  })
  return response.data
}