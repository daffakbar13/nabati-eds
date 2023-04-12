import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListResponse, CommonListParams } from 'src/api/types'

const url = 'v1/callplan-patterns'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_4

interface CreateCallPlanPattern {
  salesman_id: string
  customer_id: string
  company_id: string
  branch_id: string
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

export const callPlanPatternList = async (
  params: CommonListParams,
): Promise<CommonListResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list`,
    data: params,
  })
  return response.data
}

export const uploadCallPlanPatternData = async (params: CreateCallPlanPattern) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: `${url}/upload`,
    data: params,
  })
  return response.data
}

export const updateCallPlanActivation = async (params: CreateCallPlanPattern): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/active`,
    data: params,
  })
  return response.data
}
