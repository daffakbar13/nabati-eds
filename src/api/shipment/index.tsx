/* eslint-disable camelcase */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { DeliveryOrder } from '../delivery-order/types'
import { ShipmentItem } from './types'

const url = 'v1/shipments'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

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

export const createShipment = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create`,
    data: payload,
  })
  return response.data
}

export const PGIShipment = async (shipment_id: string, payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/${shipment_id}/pgi`,
    data: payload,
  })
  return response.data
}

export const getCompletedDeliveryOrderList = async (
  params: CommonListParams,
): Promise<CommonListResponse<DeliveryOrder>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: 'v1/delivery-orders/list',
    data: {
      filters: [
        {
          field: 'eds_delivery.status_id',
          option: 'EQ',
          from_value: '9',
        },
        ...params.filters,
      ],
      limit: params.limit,
      page: params.page,
    },
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

export const getShipmentHph = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<ShipmentItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/hph`,
  })
  return response.data
}

export const getShipmentBstf = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<ShipmentItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/bstf`,
  })
  return response.data
}
