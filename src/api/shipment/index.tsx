import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { ShipmentItem } from './types'

const url = 'v1/shipments'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getShipment = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<ShipmentItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/lists`,
    data: params,
  })
  return response.data
}

export const getDetailShipment = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<ShipmentItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/detail`,
  })
  return response.data
}

export const getShipmentBpb = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<ShipmentItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/bpb`,
  })
  return response.data
}