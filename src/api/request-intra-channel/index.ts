import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { RequestIntraChannelItem } from './types'

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

// export const getDetailQuotation = async (
//   params: CommonDetailParams,
// ): Promise<CommonDetailResponse<QuotationItem>> => {
//   const response = await call({
//     method: METHODS.GET,
//     overrideBaseUrl,
//     subUrl: `v1/quotations/${params.id}/detail`,
//   })
//   return response.data
// }