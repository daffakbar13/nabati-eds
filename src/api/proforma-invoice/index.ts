import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListParams,
  CommonListResponse,
  CommonDetailParams,
  CommonDetailResponse,
} from 'src/api/types'
import { ProformaInvoice } from './types'

const url = 'v1/proforma-invoices'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

export const getProformaInvoiceList = async (
  params: CommonListParams,
): Promise<CommonListResponse<ProformaInvoice>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list`,
    data: {
      filters: [
        {
          field: 'status_id',
          option: 'EQ',
          from_value: '10',
        },
        ...params.filters,
      ],
      limit: params.limit,
      page: params.page,
    },
  })
  return response.data
}

export const getDetailProformaInvoiceByShipment = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<ProformaInvoice>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/detail`,
  })
  return response.data
}

export const getDetailProformaInvoiceByShipmentAndDevlivery = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<ProformaInvoice | any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.shipment_id}/detail/delivery-order/${params.delivery_id}`,
  })
  return response.data
}

export const PGIProformaInvoice = async (shipment_id: string, payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/${shipment_id}/pgi`,
    data: payload,
  })
  return response.data
}

export const getDetailProformaInvoice = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<ProformaInvoice>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/detail`,
  })
  return response.data
}

export const getProformaInvoiceBpb = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<ProformaInvoice>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/bpb`,
  })
  return response.data
}

export const getProformaInvoiceBstf = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<ProformaInvoice>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/bsts`,
  })
  return response.data
}
