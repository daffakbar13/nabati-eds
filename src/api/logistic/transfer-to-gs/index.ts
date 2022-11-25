import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
    CommonListResponse,
    CommonDetailResponse,
    CommonListParams,
    CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { TransgerToGSList, TransgerToGSDetail } from './types'

const url = 'v1/canvas/transfer_goodstock'

const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3002/'

export const getListTransferGS = async (
    params: CommonListParams = {},
): Promise<CommonListResponse<TransgerToGSList>> => {
    const response = await call({
        method: METHODS.POST,
        subUrl: `${url}/list`,
        overrideBaseUrl,
        data: params,
    })
    return response.data
}

// export const getDetailRequestIntraSloc = async (
//     params: CommonDetailParams,
// ): Promise<CommonDetailResponse<TransgerToGSDetail>> => {
//     const response = await call({
//         method: METHODS.GET,
//         overrideBaseUrl,
//         subUrl: `${url}/${params.id}/detail`,
//     })
//     return response.data
// }