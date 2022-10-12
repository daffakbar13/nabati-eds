import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { QuotationItem } from './types'

const subUrl = 'v1/quotations'

export const getQuotation = async (
  params: CommonListParams,
): Promise<CommonListResponse<QuotationItem>> => {
  const response = await call({ method: METHODS.GET, subUrl, data: params })
  return response.data
}

export const getDetailQuotation = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<QuotationItem>> => {
  const response = await call({ method: METHODS.GET, subUrl, data: params })
  return response.data
}
