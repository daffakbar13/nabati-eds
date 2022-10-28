import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { SalesOrderItem } from './types'

const urlList = 'v1/sales-orders/list'
const urlDetail = 'v1/sales-orders/detail'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getSalesOrder = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<SalesOrderItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: urlList,
    data: params,
  })
  return response.data
}

export const getDetailSalesOrder = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<SalesOrderItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: ['v1/sales-orders/', params.id, '/detail'].join(''),
  })
  return response.data
}
