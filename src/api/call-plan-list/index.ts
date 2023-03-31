import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
// import { CommonListResponse, CommonListParams } from 'src/api/types'

const url = 'v1/callplan-patterns'
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_4

interface CreateCallPlanList {
  company_id: string
  customer_id: string
  salesman_id: string
  visit_day: string
  week_1: string
  week_2: string
  week_3: string
  week_4: string
  cycle: string
  sequence: string
  is_active: string
  is_default: string
  visit_day_name: string
}

export const createCallPlanList = async (params: CreateCallPlanList): Promise<any> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${url}/list`,
    data: params,
  })
  return response.data
}
