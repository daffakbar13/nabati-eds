import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
    CommonListResponse,
    CommonDetailResponse,
    CommonListParams,
    CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { SlocGRList, SlocGRDetail } from './types'

const url = 'v1/material-doc/intra-sloc/receipt'

const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3002/'

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
    params: CommonDetailParams,
): Promise<CommonDetailResponse<SlocGRDetail>> => {
    const response = await call({
        method: METHODS.GET,
        overrideBaseUrl,
        subUrl: `${url}/${params.id}/detail`,
    })
    return response.data
}
