import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { Product } from './types'

const url = 'v1/master'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const getDataProduct = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<Product>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list/product`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createProduct = async (params: any): Promise<CommonListResponse<Product>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create/transportation-zone`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateProduct = async (params: any): Promise<CommonListResponse<Product>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/transportation-zone`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateStatusProduct = async (params: any): Promise<CommonListResponse<Product>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/transportation-zone-status`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const deleteProduct = async (params: any): Promise<CommonListResponse<Product>> => {
  const response = await call({
    method: METHODS.DELETE,
    subUrl: `${url}/delete/transportation-zone`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
