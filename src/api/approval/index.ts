import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse, CommonDetailParams } from 'src/api/types'
import { Approval } from './types'

const subUrl = 'v1/approval/ist'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getApprovalList = async (
    params: CommonListParams,
): Promise<CommonListResponse<Approval>> => {
    const response = await call({
        method: METHODS.POST,
        overrideBaseUrl,
        subUrl: `${subUrl}/list`,
        data: params,
    })
    return response.data
}

export const getApprovalDetail = async (
    params: CommonDetailParams,
): Promise<CommonListResponse<Approval>> => {
    const response = await call({
        method: METHODS.GET,
        subUrl: `${subUrl}/${params.id}/detail`,
    })
    return response.data
}

export const createApproval = async (payload: any) => {
    const response = await call({ method: METHODS.POST, subUrl, data: payload })
    return response.data
}

export const editApproval = async (payload: Approval) => {
    const response = await call({
        method: METHODS.PATCH,
        subUrl: `${subUrl}/${payload.id}`,
        data: payload,
    })
    return response.data
}
