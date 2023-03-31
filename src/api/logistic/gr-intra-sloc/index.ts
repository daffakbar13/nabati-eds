import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { SlocGRList, SlocGRDetail } from './types'

const url = 'v1/intra-sloc/good-receipt'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListGRSloc = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<SlocGRList>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getDetailGRIntraSloc = async (
  params: any = {},
): Promise<CommonDetailResponse<SlocGRDetail>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params?.id}/detail?request_number=${params?.requestNumber}`,
  })
  return response.data
}
