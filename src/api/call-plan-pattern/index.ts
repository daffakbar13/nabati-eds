import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
//import { CommonListResponse, CommonListParams } from 'src/api/types'

const url = 'v1/callplan-patterns'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_4

interface CreateCallPlanPattern {
  branch_id: string
  company_id: string
  customer_id: string
  salesman_id: string
  visit_day: string
  cycle: string
  is_active: string
}

export const createCallPlanPattern = async (params: CreateCallPlanPattern): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/create`,
    data: params,
  })
  return params
}

export const getCallPlanPattern = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${url}/download-template`,
    data: params,
  })
  return response.data
}
