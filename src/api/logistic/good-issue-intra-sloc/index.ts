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

const url = 'v1/material-doc/intra-sloc/issue'

const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3002/'

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
    params: CommonDetailParams,
): Promise<CommonDetailResponse<SlocGIDetail>> => {
    const response = await call({
        method: METHODS.GET,
        overrideBaseUrl,
        subUrl: `${url}/${params.id}/detail?doc_type=${params.doc_type}`,
    })
    return response.data
}
