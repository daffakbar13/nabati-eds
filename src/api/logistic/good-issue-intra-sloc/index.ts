import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { SlocGIList, SlocGIDetail } from './types'

const url = 'v1/intra-sloc/good-issue'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListGISloc = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<SlocGIList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getDetailGIIntraSloc = async (
  params: any = {},
): Promise<CommonDetailResponse<SlocGIDetail>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params?.id}/detail?request_number=${params?.requestNumber}`,
  })
  return response.data
}
