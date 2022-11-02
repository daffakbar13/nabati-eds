import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { SalesOrderItem } from './types'

const url = 'v1/sales-orders'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getSalesOrder = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<SalesOrderItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list`,
    // data: params,
  })
  return response.data
}

export const getDetailSalesOrder = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<SalesOrderItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/${params.id}/detail`,
  })
  return response.data
}
