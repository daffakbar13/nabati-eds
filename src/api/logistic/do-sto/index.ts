import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { API_BASE_URL_2 } from 'src/configs/env'
import { StockRealTime } from './types'

const url = 'v1/sto-delivery'
const urlBooking = 'v1/inventory'

const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getListDoSto = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/list`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const getPoStoDetail = async (params: any): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${params.id}/detail`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createDoSto = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const updateDoSto = async (id: string, payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/data/edit/${id}`,
    overrideBaseUrl,
    data: payload,
  })
  return response.data
}

export const updateStatusPoSto = async (
  id: string,
  params: {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/edit/${id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateBookingStock = async (params: {}): Promise<
  CommonListResponse<StockRealTime>
> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${urlBooking}/update/booking_stock/doc_id_status`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateBookingStockPGI = async (params: {}): Promise<
  CommonListResponse<StockRealTime>
> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${urlBooking}/pgi_update/booking_stock`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updateTotalBookingStock = async (params: {}): Promise<
  CommonListResponse<StockRealTime>
> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${urlBooking}/update/booking_stock`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const updatePGIinventoryBooking = async (
  id: string,
  params: {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/update/pgi_booking/${id}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const AutoCreateGR = async (
  delivery_number: string,
  po_number: string,
  params: {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/create/good/receipt_issue/${delivery_number}/${po_number}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const CancelProcessDOSTO = async (
  delivery_number: string,
  params: {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `${url}/cancel_process/${delivery_number}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}
