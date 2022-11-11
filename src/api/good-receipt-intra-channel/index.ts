import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
    CommonListResponse,
    CommonDetailResponse,
    CommonListParams,
    CommonDetailParams,
} from 'src/api/types'
import { GoodReceiptIntraChannelItem } from './types'

const subUrl = 'v1/material-doc'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3002/'

export const getGoodReceiptIntraChannel = async (
    params: CommonListParams = {},
): Promise<CommonListResponse<GoodReceiptIntraChannelItem>> => {
    const response = await call({
        method: METHODS.POST,
        overrideBaseUrl,
        subUrl: `${subUrl}/intra-channel/receipt/list`,
        data: params,
    })
    return response.data
}

// export const getDetailRequestIntraChannel = async (
//   params: CommonDetailParams,
// ): Promise<CommonDetailResponse<RequestIntraChannelItemDetail>> => {
//   const response = await call({
//     method: METHODS.GET,
//     overrideBaseUrl,
//     subUrl: `${subUrl}/${params.id}/detail`,
//   })
//   return response.data
// }