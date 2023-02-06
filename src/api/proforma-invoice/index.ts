import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse, CommonDetailParams } from 'src/api/types'
import { ProformaInvoice } from './types'

// const subUrl = 'v1/collection'
const subUrl = 'v1/proforma-invoices'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

export const getProformaInvoiceList = async (
  params: CommonListParams,
): Promise<CommonListResponse<ProformaInvoice>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}/list`,
    data: params,
  })
  return response.data
}

export const getCollectionDetail = async (
  params: CommonDetailParams,
): Promise<CommonListResponse<ProformaInvoice>> => {
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

export const editCollection = async (payload: ProformaInvoice) => {
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
