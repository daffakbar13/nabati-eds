import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse, CommonDetailParams } from 'src/api/types'
import { Collection } from './types'

const subUrl = 'v1/collection/list'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getCollectionList = async (
    params: CommonListParams,
): Promise<CommonListResponse<Collection>> => {
    const response = await call({
        method: METHODS.POST,
        overrideBaseUrl,
        subUrl: `${subUrl}/list`,
        data: params,
    })
    return response.data
}

export const getCollectionDetail = async (
    params: CommonDetailParams,
): Promise<CommonListResponse<Collection>> => {
    const response = await call({
        method: METHODS.GET,
        subUrl: `${subUrl}/${params.id}/detail`,
    })
    return response.data
}

export const createCollection = async (payload: any) => {
    const response = await call({ method: METHODS.POST, subUrl, data: payload })
    return response.data
}

export const editCollection = async (payload: Collection) => {
    const response = await call({
        method: METHODS.PATCH,
        subUrl: `${subUrl}/${payload.id}`,
        data: payload,
    })
    return response.data
}
