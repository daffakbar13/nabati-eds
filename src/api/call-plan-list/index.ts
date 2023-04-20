import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonListParams, CommonListResponse } from '../types'

const url = 'v1/callplans'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_4

interface GenerateCallPlanPayload {
  company_id: string
  branch_id: string
  generate_date: string
}

export const getCallPlanList = async (
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

export const generateCallPlan = async (params: GenerateCallPlanPayload): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/create`,
    data: params,
  })
  return response.data
}

export const uploadCallPlanListData = async (file: File): Promise<any> => {
  const formData = new FormData()
  formData.append('call_plan_upload', file, file.name)

  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/upload`,
    data: formData,
  })
  return response.data
}
