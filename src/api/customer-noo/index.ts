import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
  CommonListResponse,
  CommonDetailResponse,
  CommonListParams,
  CommonDetailParams,
} from 'src/api/types'
import { CustomerItem } from './types'

const subUrl = 'v1/master/list/customer-noo'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

export const getCustomerList = async (
  params: CommonListParams = {},
): Promise<CommonListResponse<CustomerItem>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl}`,
    data: {
      filters: [
        {
          field: 'eds_customer_sales.sales_org_id',
          option: 'EQ',
          from_value: 'PID1',
        },
        ...params.filters,
      ],
      limit: params.limit,
      page: params.page,
    },
  })
  return response.data
}

export const getDetailQuotation = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<CustomerItem>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `v1/quotations/${params.id}/detail`,
  })
  return response.data
}

export const createQuotation = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/create`,
    data: payload,
  })
  return response.data
}

export const updateQuotation = async (payload: any, id: string) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/${id}/update`,
    data: payload,
  })
  return response.data
}

export const cancelBatchOrder = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/cancel-batch-order`,
    data: payload,
  })
  return response.data
}

export const downloadTemplateQuotation = async () => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${subUrl}/export-excel`,
    // data: payload,
  })
  return response.data
}

export const cancelOrder = async (id: string) => {
  const response = await call({
    method: METHODS.PATCH,
    subUrl: `${subUrl}/${id}/cancel-order`,
  })
  return response.data
}

export const multipleSubmitQuotation = async (payload: { order_list: { id: string }[] }) => {
  const response = await call({
    overrideBaseUrl,
    method: METHODS.POST,
    subUrl: 'v1/sales-orders/submit',
    data: payload,
  })
  return response.data
}

export const createCustomerNOO = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `v1/master/create/customer-noo`,
    data: payload,
  })
  return response.data
}

// export const getDetailCustomerNOO = async (companyId: string = 'PP01', customerId: string) => {
//   const response = await call({
//     method: METHODS.GET,
//     subUrl: `v1/master/get-customer/${companyId}/${customerId}/detail`,
//   })
//   return response.data
// }

export const getDetailCustomerNOO = async (
  params: CommonDetailParams,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    // subUrl: `v1/quotations/${params.id}/detail`,
    subUrl: `v1/master/get-customer/${params.company_id || 'PP01'}/${params.id}/detail`,
  })
  return response.data
}
