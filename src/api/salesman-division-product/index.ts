import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListResponse, CommonListParams } from 'src/api/types'

const url = 'v1/master'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

interface CreateSalesmanDivisionProduct {
  division_id: string
  product_id: string
}

export const getSalesmanDivisionProduct = async (
  params: CommonListParams = {},
): Promise<CommonListResponse> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list/salesman-division-product`,
    data: params,
  })
  return response.data
}

export const createSalesmanDivisionProduct = async (
  params: CreateSalesmanDivisionProduct,
): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/create/salesman-division-product`,
    data: params,
  })
  return response.data
}

export const updateSalesmanDivisionProduct = async (
  params: CreateSalesmanDivisionProduct,
): Promise<any> => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl,
    subUrl: `${url}/update/salesman-division-product`,
    data: params,
  })
  return response.data
}

export const deleteSalesmanDivisionProduct = async (id: string): Promise<any> => {
  const response = await call({
    method: METHODS.DELETE,
    overrideBaseUrl,
    subUrl: `${url}/delete/salesman-division-product/${id}`,
  })
  return response.data
}
