import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { RequestIntraChannelItem, RequestIntraChannelItemDetail } from './types'

const subUrl = 'v1/intra-channel'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3002/'

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