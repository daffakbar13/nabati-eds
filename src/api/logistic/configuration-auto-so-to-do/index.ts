import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
    CommonListResponse,
    CommonDetailResponse,
    CommonListParams,
    CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ListAutoSotoDO } from './types'

const url = 'v1/auto-sodo'

const overrideBaseUrl = API_BASE_URL_2

export const getListSOtoDO = async (
    params: CommonListParams = {},
): Promise<CommonListResponse<ListAutoSotoDO>> => {
    const response = await call({
        method: METHODS.POST,
        subUrl: `${url}/list`,
        overrideBaseUrl,
        data: params,
    })
    return response.data
}

export const CreateSOtoDO = async (payload: any) => {
    const response = await call({
        method: METHODS.POST,
        subUrl: `${url}`,
        overrideBaseUrl,
        data: payload,
    })
    return response.data
}

export const getDetailSOtoDO = async (sales_org_id: string) => {
    const response = await call({
        method: METHODS.GET,
        subUrl: `${url}/${sales_org_id}/detail`,
        overrideBaseUrl,
    })
    return response.data
}

export const updateSOtoDO = async (sales_org_id: string, payload: any) => {
    const response = await call({
        method: METHODS.POST,
        subUrl: `${url}/update/${sales_org_id}`,
        overrideBaseUrl,
        data: payload,
    })
    return response.data
}

export const UpdateStatusSOtoDO = async (sales_org_id: string, payload: any) => {
    const response = await call({
        method: METHODS.POST,
        subUrl: `${url}/status/${sales_org_id}`,
        overrideBaseUrl,
        data: payload,
    })
    return response.data
}