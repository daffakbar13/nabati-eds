import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListResponse, CommonListParams } from 'src/api/types'

const url = 'v1/master'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_3

interface CreateSalesmanDivision {
  salesman_id: string
  division_id: string
  is_active: string
}

export const getSalesmanDivision = async (
  params: CommonListParams = {},
): Promise<CommonListResponse> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list/salesman-division`,
    data: params,
  })
  return response.data
}

export const createSalesmanDivision = async (params: CreateSalesmanDivision): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/create/salesman-division`,
    data: params,
  })
  return response.data
}

export const updateSalesmanDivision = async (params: CreateSalesmanDivision): Promise<any> => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl,
    subUrl: `${url}/update/salesman-division`,
    data: params,
  })
  return response.data
}

export const deleteSalesmanDivision = async (id: string): Promise<any> => {
  const response = await call({
    method: METHODS.DELETE,
    overrideBaseUrl,
    subUrl: `${url}/delete/salesman-division/${id}`,
  })
  return response.data
}
