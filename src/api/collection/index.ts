import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse, CommonDetailParams } from 'src/api/types'
import { Collection } from './types'

const subUrl = 'v1/collection'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

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

export const getCollectionListGT = async (
  params: CommonListParams,
): Promise<CommonListResponse<Collection>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}/list`,
    data: {
      filters: [
        {
          field: 'sales_org_id',
          option: 'EQ',
          from_value: 'PID1',
        },
        ...params.filters,
      ],
      limit: params.limit,
      page: params.page,
    },
  })
  return response.data
}

export const getCollectionListMT = async (
  params: CommonListParams,
): Promise<CommonListResponse<Collection>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}/list`,
    data: {
      filters: [
        {
          field: 'sales_org_id',
          option: 'EQ',
          from_value: 'PID2',
        },
        ...params.filters,
      ],
      limit: params.limit,
      page: params.page,
    },
  })
  return response.data
}

export const getCollectionDetail = async (
  params: CommonDetailParams,
): Promise<CommonListResponse<Collection>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${subUrl}/${params.id}`,
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

export const finishCollection = async (payload: any) => {
  const response = await call({ method: METHODS.POST, subUrl: `${subUrl}/finish`, data: payload })
  return response.data
}
