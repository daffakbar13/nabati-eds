import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { QuotationItem } from './types'

const subUrl = 'v1/quotations/list'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getQuotation = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<QuotationItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl,
    data: params,
  })
  return response.data
}

export const getDetailQuotation = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<QuotationItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `v1/quotations/${params.id}/detail`,
  })
  return response.data
}
