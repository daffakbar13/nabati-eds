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
  getSalesmanByCompany: 'v1/master/get-salesman/PP01',
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