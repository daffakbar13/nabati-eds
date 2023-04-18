import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse } from '../types'

const url = 'v1/callplans'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_4

interface GenerateNonCallPlanPayload {
  company_id: string
  branch_id: string
  generate_date: string
}

export const getNonCallPlanList = async (
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

export const generateNonCallPlan = async (params: GenerateNonCallPlanPayload): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/create`,
    data: params,
  })
  return response.data
}
