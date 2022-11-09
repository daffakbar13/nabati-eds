/* eslint-disable camelcase */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
// import { QuotationItem } from './types'

const subUrl = {
  getCustomerByCompany: 'v1/master/get-customer/PP01',
  getSalesOrgByCompany: 'v1/master/get-sales-org/PP01',
  getBranch: 'v1/master/get-branch/PP01',
  getSalesmanByCompany: 'v1/master/get-salesman/PP01',
  getProductByCompany: 'v1/master/get-product/PP01',
  getUom: 'v1/master/get-uom',
  getProductById: '/v1/master/get-product/PP01/',
  getPricingByIdAndUom: 'v1/master/get-pricing-group/PP01',
  getOrderType: 'v1/master/get-order-type/PP01',
}
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getCustomerByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getCustomerByCompany,
  })

  return response.data
}

export const getOrderTypeByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getOrderType,
  })

  return response.data
}

export const getSalesOrgByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getSalesOrgByCompany,
  })

  return response.data
}

export const getSalesmanByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getSalesmanByCompany,
  })

  return response.data
}

export const getBranch = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getBranch,
  })

  return response.data
}

export const getProductByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getProductByCompany,
  })

  return response.data
}

export const getProductById = async (id: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getProductById + id,
  })

  return response.data
}

export const getPricingByIdAndUom = async (
  product_id: string,
  uom_id: string,
): Promise<CommonDetailResponse<any>> => {
  const now = new Date().toISOString()
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getPricingByIdAndUom}/${product_id}/15/${uom_id}/${now}`,
  })

  return response.data
}