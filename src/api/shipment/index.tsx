import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import {
    CommonListResponse,
    CommonDetailResponse,
    CommonListParams,
    CommonDetailParams,
} from 'src/api/types'
import { ShipmentItem } from './types'

const subUrl = 'v1/shipments/list'
const overrideBaseUrl = 'https://dist-system.nabatisnack.co.id:3001/'

export const getShipment = async (
    params: CommonListParams = {},
): Promise<CommonListResponse<ShipmentItem>> => {
    const response = await call({ method: METHODS.POST, overrideBaseUrl, subUrl })
    return response.data
}

export const getDetailShipment = async (
    params: CommonDetailParams,
): Promise<CommonDetailResponse<ShipmentItem>> => {
    const response = await call({ method: METHODS.GET, overrideBaseUrl, subUrl: 'v1/shipments/' + params.id + '/detail' })
    return response.data
}
