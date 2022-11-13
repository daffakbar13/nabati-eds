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
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3002/'

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