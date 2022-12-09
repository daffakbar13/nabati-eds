import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
    CommonListResponse,
    CommonDetailResponse,
    CommonListParams,
    CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ListSalesORGCustomerGroupMaterial } from './types'

const url = 'v1/configuration/list_so_customer_group_mat'
const urlSO = 'v1/configuration/so_customer_group_mat'
const urlCreateSO = 'v1/configuration/create_so_customer_group_mat'

const overrideBaseUrl = API_BASE_URL_2

export const getListSalesORGCustomerGroupMaterial = async (
    params: CommonListParams = {},
): Promise<CommonListResponse<ListSalesORGCustomerGroupMaterial>> => {
    const response = await call({
        method: METHODS.POST,
        subUrl: `${url}`,
        overrideBaseUrl,
        data: params,
    })
    return response.data
}

export const createSalesORGCustomerGroupMaterial = async (payload: any) => {
    const response = await call({
        method: METHODS.POST,
        subUrl: `${urlCreateSO}`,
        overrideBaseUrl,
        data: payload,
    })
    return response.data
}

export const getDetailSalesORGCustomerGroupMaterial = async (company_id: string, sales_org_id: string, customer_group_id: string, product_id: string) => {
    const response = await call({
        method: METHODS.GET,
        subUrl: `${urlSO}/detail/${company_id}/${sales_org_id}/${customer_group_id}/${product_id}`,
        overrideBaseUrl,
    })
    return response.data
}

export const updateSalesORGCustomerGroupMaterial = async (company_id: string, sales_org_id: string, customer_group_id: string, product_id: string, payload: any) => {
    const response = await call({
        method: METHODS.PUT,
        subUrl: `${urlSO}/edit/${company_id}/${sales_org_id}/${customer_group_id}/${product_id}`,
        overrideBaseUrl,
        data: payload,
    })
    return response.data
}

export const UpdateStatusSalesORGCustomerGroupMaterial = async (company_id: string, sales_org_id: string, customer_group_id: string, product_id: string, payload: any) => {
    const response = await call({
        method: METHODS.PUT,
        subUrl: `${urlSO}/edit_status/${company_id}/${sales_org_id}/${customer_group_id}/${product_id}`,
        overrideBaseUrl,
        data: payload,
    })
    return response.data
}