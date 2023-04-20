import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'
import { CommonDetailResponse, CommonListParams } from 'src/api/types'
import { getCustomerByFilterProps } from './types'

const subUrl = {
  getCompany: 'v1/master/get-company',
  getCustomerByCompany: 'v1/master/get-customer/PP01',
  getCustomerList: 'v1/master/list/customer',
  getSalesOrgByCompany: 'v1/master/get-sales-org/PP01',
  getSalesGroupByCompany: 'v1/master/get-sales-group/PP01',
  getSalesOfficeCompany: 'v1/master/get-sales-office',
  getSalesmanGroupByCompany: '/v1/master/get-salesman-group/PP01',
  getSalesmanByCompany: 'v1/master/get-salesman/PP01',
  getSalesOrgByCompanyDynamic: 'v1/master/get-sales-org',
  getBranch: 'v1/master/get-branch/PP01',
  getProductByCompany: 'v1/master/get-product/PP01',
  getUom: 'v1/master/get-uom',
  getListProduct: '/v1/master/list/product',
  getProductById: '/v1/master/get-product/PP01/',
  getPricing: 'v1/master/get-pricing-group/PP01',
  getOrderType: 'v1/master/get-order-type/PP01',
  getReason: 'v1/master/get-reason/PP01/',
  getCustomerByFilter: 'v1/master/get-customer-branch-salesman-salesorg/PP01',
  getDocTypeByCategory: 'v1/master/get-doc-type/category',
  getConfigSloc: 'v1/master/get-config-sloc/PP01',
  getRouteByCompany: 'v1/master/get-route/PP01',
  getRouteIntraChannel: 'v1/intra-channel',
  getDriverByCompanyId: 'v1/master/get-driver/PP01',
  getVehicleByCompany: 'v1/master/get-vehicle/PP01',
  getDocFlow: 'v1/master/get-doc-flow/PP01',
  getCustomerGroupCompany: 'v1/master/get-customer-group/PP01',
  getChannelByCompany: '/v1/master/get-channel',
  getProductMasterData: '/v1/master/list/product',
  getCustomerGroupCompanyDynamic: 'v1/master/get-customer-group',
  getConfigSlocCompanyDynamic: 'v1/master/get-config-sloc',
  getSlocbyConfigLogistic: 'v1/configuration/get_config_sloc',
  getTermByCompanyId: 'v1/master/get-term',
  getPaymentMethod: 'v1/master/get-payment-method',
  getStatusBlock: 'v1/master/get-status-block',
  getPriceGroupByCompanyId: 'v1/master/get-pricing-group',
  getDivisionByCompanyId: 'v1/master/get-division',
  getDistrictByCompanyId: 'v1/master/get-district',
  getProductConversionByProductId: 'v1/master/get-product-conversion/PP01',
  getRegion: '/v1/master/get-region',
  getWeightGroup: '/v1/master/get-weight-group/PP01',
  getTransporationZone: '/v1/master/get-transportation-zone/PP01/ID',
  getSlocbyConfigSlocSalesman: '/v1/configuration/sloc_salesman',
  getInco: '/v1/master/get-inco',
  getRules: '/v1/master/get-rules',
  getCountry: 'v1/master-data/list_country',
  getCompanybyCountry: '/v1/master-data/list_company',
  getTaxbyCompany: '/v1/master-data/list_tax',
  getConditionType: 'v1/master/get-cond-type/PP01',
}
const overrideBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_1
const BaseUrl2 = process.env.NEXT_PUBLIC_API_BASE_URL_2

export const getCompanies = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: '/v1/master/get-company',
  })

  return response.data
}

export const getCustomerByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getCustomerByCompany,
  })

  return response.data
}

export const getCustomerList = async (
  payload: CommonListParams,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: subUrl.getCustomerList,
    data: payload,
  })

  return response.data
}

export const getCustomerById = async (id: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getCustomerByCompany}/${id}`,
  })

  return response.data
}

export const getOrderTypeByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getOrderType,
  })

  return response.data
}

export const getSalesOrgByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getSalesOrgByCompany,
  })

  return response.data
}

export const getSalesGroupByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getSalesGroupByCompany,
  })

  return response.data
}

export const getSalesmanByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getSalesmanByCompany,
  })

  return response.data
}

export const getSalesOfficeByCompany = async (
  companyId: string = 'PP01',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getSalesOfficeCompany}/${companyId}`,
  })

  return response.data
}

export const getBranch = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getBranch,
  })

  return response.data
}

export const getListProduct = async (
  params: CommonListParams,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    data: params,
    subUrl: subUrl.getListProduct,
  })

  return response.data
}

export const getListProductBySalesman = async (
  salesman_id: string,
  params: CommonListParams,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    data: params,
    subUrl: `${subUrl.getListProduct}/${salesman_id}`,
  })

  return response.data
}

export const getProductByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getProductByCompany,
  })

  return response.data
}

export const getProductById = async (id: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getProductById + id,
  })

  return response.data
}

export const getPricingByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getPricing}/z2`,
  })

  return response.data
}

export const getPricingByProductId = async (
  product_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getPricing}/z2/${product_id}`,
  })

  return response.data
}

export const getPricingByIdAndUom = async (
  product_id: string,
  uom_id: string,
): Promise<CommonDetailResponse<any>> => {
  const now = new Date().toISOString()
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getPricing}/${product_id}/z2/${uom_id}/${now}`,
  })

  return response.data
}

export const getReason = async (
  doc_category_id: string = 'C',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    // subUrl: subUrl.getReason + doc_category_id ? doc_category_id : 'C',
    subUrl: `v1/master/get-reason/PP01/${doc_category_id || 'C'}`,
  })

  return response.data
}

export const getCustomerByFilter = async (
  payload: getCustomerByFilterProps,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: subUrl.getCustomerByFilter,
    data: payload,
  })

  return response.data
}

export const getDocTypeByCategory = async (
  category_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getDocTypeByCategory}/${category_id}`,
  })

  return response.data
}

export const getConfigSloc = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getConfigSloc}`,
  })

  return response.data
}

export const getRouteByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getRouteByCompany}`,
  })

  return response.data
}

export const getProductByBranch = async (idbranch: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${BaseUrl2}${subUrl.getRouteIntraChannel}/product-branch/${idbranch}/list`,
  })

  return response.data
}

export const getItemReceiver = async (idProduct: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${BaseUrl2}${subUrl.getRouteIntraChannel}/product/${idProduct}/detail`,
  })

  return response.data
}

export const getUomList = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getUom,
  })

  return response.data
}

export const getDriverByCompanyId = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getDriverByCompanyId,
  })

  return response.data
}

export const getVehicleByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getVehicleByCompany,
  })

  return response.data
}

export const getVehicle = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: 'v1/transportation/vehicles/list',
    data: {
      filters: [
        {
          field: 'status',
          option: 'EQ',
          from_value: true,
        },
      ],
    },
  })

  return response.data
}

export const getDocFlow = async (document_id: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getDocFlow}/-/${document_id}`,
  })

  return response.data
}

export const getCompanyList = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getCompany,
  })

  return response.data
}

export const getCustomerGroupCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getCustomerGroupCompany}`,
  })

  return response.data
}

export const getChannelByCompany = async (
  companyId: string = 'PP01',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getChannelByCompany}/${companyId}`,
  })

  return response.data
}

export const getSalesmanGroupByCompany = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getSalesmanGroupByCompany}`,
  })

  return response.data
}

export const getProductMasterData = async (
  payload: CommonListParams,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl,
    subUrl: `${subUrl.getProductMasterData}`,
    data: payload,
  })

  return response.data
}

export const getSalesOrgByCompanyDynamic = async (
  company_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getSalesOrgByCompanyDynamic}/${company_id}`,
  })

  return response.data
}

export const getCustomerGroupCompanyDynamic = async (
  company_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getCustomerGroupCompanyDynamic}/${company_id}`,
  })

  return response.data
}

export const getConfigSlocCompanyDynamic = async (
  company_id: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getConfigSlocCompanyDynamic}/${company_id}`,
  })

  return response.data
}

export const getSlocbyConfigLogistic = async (
  idbranch: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${BaseUrl2}${subUrl.getSlocbyConfigLogistic}/${idbranch}`,
  })

  return response.data
}

export const getTermByCompanyId = async (
  companyId: string = 'PP01',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getTermByCompanyId}/${companyId}`,
  })

  return response.data
}

export const getPaymentMethod = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getPaymentMethod}`,
  })

  return response.data
}

export const getStatusBlock = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getStatusBlock}`,
  })

  return response.data
}

export const getPriceGroupByCompanyId = async (
  companyId: string = 'PP01',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getPriceGroupByCompanyId}/${companyId}`,
  })

  return response.data
}

export const getDivisionByCompanyId = async (
  companyId: string = 'PP01',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getDivisionByCompanyId}/${companyId}`,
  })

  return response.data
}

export const getDistrictByCompanyId = async (
  companyId: string = 'PP01',
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getDistrictByCompanyId}/${companyId}`,
  })

  return response.data
}

export const getProductConversionByProductId = async (
  productId: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: `${subUrl.getProductConversionByProductId}/${productId}`,
  })

  return response.data
}

export const getRegion = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getRegion,
  })

  return response.data
}

export const getWeightGroup = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getWeightGroup,
  })

  return response.data
}

export const getTransportationZone = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getTransporationZone,
  })

  return response.data
}

export const getInco = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getInco,
  })

  return response.data
}

export const getRules = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getRules,
  })

  return response.data
}

export const getConditionType = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl,
    subUrl: subUrl.getConditionType,
  })

  return response.data
}

export const getSlocbyConfigSlocSalesman = async (
  idbranch: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${BaseUrl2}${subUrl.getSlocbyConfigSlocSalesman}/${idbranch}`,
  })

  return response.data
}

export const getCountry = async (): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${BaseUrl2}${subUrl.getCountry}`,
  })

  return response.data
}

export const getCompanybyCountry = async (
  idCountry: string,
): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${BaseUrl2}${subUrl.getCompanybyCountry}/${idCountry}`,
  })

  return response.data
}

export const getTaxbyCompany = async (idCompany: string): Promise<CommonDetailResponse<any>> => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `${BaseUrl2}${subUrl.getTaxbyCompany}/${idCompany}`,
  })

  return response.data
}
