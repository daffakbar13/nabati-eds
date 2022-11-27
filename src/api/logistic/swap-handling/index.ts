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

const url = 'v1/swap-handling'

const overrideBaseUrl = API_BASE_URL_2

export const getListSwapHandling = async (
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

export const getDetailSwapHandling = async (
  id: string,
  params: CommonListParams = {},
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${url}/${id}/detail`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

export const createSwapHandling = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<StockRealTime>> => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}`,
    overrideBaseUrl,
    data: params,
  })
  return response.data
}

const a = {
  company_id: 'PP01',
  company_name: 'Pinus Merah Abadi, PT',
  id: '1041000000001',
  doc_number: '1041000000001',
  posting_date: '2022-11-27T00:00:00Z',
  document_date: '2022-11-25T00:00:00Z',
  branch_id: 'P104',
  branch_name: 'PMA Bandung Selatan',
  from_sloc: 'TR00',
  from_sloc_name: 'Transit',
  to_sloc: 'GS00',
  to_sloc_name: 'Good Stock',
  movement_type_id: '311',
  movement_type_name: 'TF trfr within plant',
  header_text: '',
  status_id: '01',
  status: 'Done',
  created_at: '2022-11-24T07:31:55Z',
  created_by: 'SYSTEM',
  modified_at: null,
  modified_by: null,
}