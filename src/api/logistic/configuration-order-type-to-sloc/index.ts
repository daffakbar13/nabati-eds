import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { ListOrdertypetoSloc } from './types'

const url = 'v1/configuration'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListOrderTypetoSloc = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<ListOrdertypetoSloc>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/config_order_type_sloc`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const CreateOrderTypetoSloc = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create/config_order_type_sloc`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}


export const DeleteOrderTypetoSloc = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/config_order_type_sloc`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}
