/* eslint-disable camelcase */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { getCustomerByFilterProps } from './types'
// import { QuotationItem } from './types'

const subUrl = {
  getCompany: 'v1/master/get-company',
  getCustomerByCompany: 'v1/master/get-customer/PP01',
  getCustomerList: 'v1/master/list/customer',
  getSalesOrgByCompany: 'v1/master/get-sales-org/PP01',
  getBranch: 'v1/master/get-branch/PP01',
  getSalesmanByCompany: 'v1/master/get-salesman/PP01',
  getProductByCompany: 'v1/master/get-product/PP01',
  getUom: 'v1/master/get-uom',
  getProductById: '/v1/master/get-product/PP01/',
  getPricing: 'v1/master/get-pricing-group/PP01',
  getOrderType: 'v1/master/get-order-type/PP01',
  getReason: 'v1/master/get-reason/PP01/',
  getCustomerByFilter: 'v1/master/get-customer-branch-salesman-salesorg/PP01',
  getDocTypeByCategory: 'v1/master/get-doc-type/category',
  getConfigSloc: 'v1/master/get-config-sloc/PP01',
  getRouteByCompany: 'v1/master/get-route/PP01',
  getRouteIntraChannel: 'v1/intra-channel',
  getDriverByCompanyId: 'v1/master/get-driver/PP01',
  getVehicleByCompany: 'v1/master/get-vehicle/PP01',
  getDocFlow: 'v1/master/get-doc-flow/PP01',
  getSalesOrgByCompanyDynamic: 'v1/master/get-sales-org',
  getCustomerGroupCompanyDynamic: 'v1/master/get-customer-group',
  getConfigSlocCompanyDynamic: 'v1/master/get-config-sloc',
}
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3
const BaseUrl2 = 'https://dist-system.nabatisnack.co.id:3002/'

export const getCompanies = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: '/v1/master/get-company',
  })

  return response.data
}

export const getCustomerByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getCustomerByCompany,
  })

  return response.data
}

export const getCustomerList = async (payload: CommonListParams)
  : Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: subUrl.getCustomerList,
    data: payload,
  })

  return response.data
}

export const getCustomerById = async (id: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getCustomerByCompany}/${id}`,
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

export const getPricingByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getPricing,
  })

  return response.data
}

export const getPricingByProductId = async (
  product_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getPricing}/z2/${product_id}`,
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
    subUrl: `${subUrl.getPricing}/${product_id}/z2/${uom_id}/${now}`,
  })

  return response.data
}

export const getReason = async (doc_category_id: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getReason + doc_category_id,
  })

  return response.data
}

export const getCustomerByFilter = async (
  payload: getCustomerByFilterProps,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: subUrl.getCustomerByFilter,
    data: payload,
  })

  return response.data
}

export const getDocTypeByCategory = async (
  category_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getDocTypeByCategory}/${category_id}`,
  })

  return response.data
}

export const getConfigSloc = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getConfigSloc}`,
  })

  return response.data
}

export const getRouteByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getRouteByCompany}`,
  })

  return response.data
}

export const getProductByBranch = async (
  idbranch: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${BaseUrl2}${subUrl.getRouteIntraChannel}/product-branch/${idbranch}/list`,
  })

  return response.data
}

export const getItemReceiver = async (
  idProduct: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${BaseUrl2}${subUrl.getRouteIntraChannel}/product/${idProduct}/detail`,
  })

  return response.data
}

export const getUomList = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getUom,
  })

  return response.data
}

export const getDriverByCompanyId = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getDriverByCompanyId,
  })

  return response.data
}

export const getVehicleByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getVehicleByCompany,
  })

  return response.data
}

export const getDocFlow = async (
  document_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getDocFlow}/-/${document_id}`,
  })

  return response.data
}

export const getCompanyList = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getCompany,
  })

  return response.data
}

export const getSalesOrgByCompanyDynamic = async (company_id: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getSalesOrgByCompanyDynamic}/${company_id}`,
  })

  return response.data
}


export const getCustomerGroupCompanyDynamic = async (company_id: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getCustomerGroupCompanyDynamic}/${company_id}`,
  })

  return response.data
}

export const getConfigSlocCompanyDynamic = async (company_id: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getConfigSlocCompanyDynamic}/${company_id}`,
  })

  return response.data
}