/* eslint-disable function-paren-newline */
import {
  getCustomerByCompany,
  getSalesOrgByCompany,
  getSalesmanByCompany,
  getProductByCompany,
  getPricingByIdAndUom,
  getBranch,
  getOrderTypeByCompany,
  getPricingByCompany,
  getPricingByProductId,
  getReason,
  getCustomerByFilter,
  getConfigSloc,
  getRouteByCompany,
  getProductByBranch,
  getCustomerList,
  getDriverByCompanyId,
  getVehicleByCompany,
  getDocTypeByCategory,
  getCompanyList,
  getCustomerGroupCompany,
  getChannelByCompany,
  getSalesmanGroupByCompany,
  getUomList,
  getSalesOrgByCompanyDynamic,
  getCustomerGroupCompanyDynamic,
  getConfigSlocCompanyDynamic,
  getProductMasterData,
  getListProduct,
  getSlocbyConfigLogistic,
  getProductConversionByProductId,
  getDistrictByCompanyId,
  getDivisionByCompanyId,
  getPaymentMethod,
  getSalesOfficeByCompany,
  getTermByCompanyId,
  getSalesGroupByCompany,
  getRegion,
  getSlocbyConfigSlocSalesman,
  getTransportationZone,
  getInco,
  getRules,
  getWeightGroup,
  getCountry,
  getCompanybyCountry,
  getTaxbyCompany,
  getVehicle,
} from 'src/api/master-data'
import { getListPoSto } from 'src/api/logistic/po-sto'
import { getListDoSto } from 'src/api/logistic/do-sto'
import { getDetailProductIntraChannel } from 'src/api/logistic/config-mapping-product-intra'
import { CommonListParams } from 'src/api/types'
import { concatString } from 'src/utils/concatString'
import { getPoNumberList, getGoodReceiptList } from 'src/api/logistic/good-receipt'
import { getDeliveryOrderList } from 'src/api/delivery-order'
import { getListGISloc } from 'src/api/logistic/good-issue-intra-sloc'
import { getSalesmanDivision } from 'src/api/salesman-division'
import { getListSlocByMultipleBranch } from 'src/api/logistic/configuration-sloc'
import { getListTrasportationMode } from 'src/api/transportation/transportation-mode'
import { getListVehicleType } from 'src/api/transportation/vehicle-type'
import { getListDriver } from 'src/api/transportation/driver'

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
/* eslint-disable max-len */

export function fieldQuotationType(search: string) {
  return getOrderTypeByCompany().then((result) =>
    result.data
      .filter(
        ({ order_type_id, doc_type_name }) =>
          order_type_id.toLowerCase().includes(search.toLowerCase()) ||
          doc_type_name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ order_type_id, doc_type_name }) => ({
        label: [order_type_id, ' - ', doc_type_name.split('-').join(' - ')].join(''),
        value: order_type_id,
      })),
  )
}

export function fieldCustomer(search: string) {
  async function runApi(field: 'id' | 'eds_customer.name') {
    return getCustomerList({
      filters: [
        {
          field,
          option: 'CP',
          from_value: `%${search}%`,
        },
      ],
      limit: 10,
      page: 1,
    })
      .then((result) => result.data)
      .then((data) =>
        data.results.map(({ id, name }) => ({
          label: [id, name].join(' - '),
          value: [id, name].join(' - '),
        })),
      )
  }
  return runApi('id').then((arr) => {
    if (arr.length > 0) {
      return arr
    }
    return runApi('eds_customer.name')
  })
}

export function fieldSoldToCustomer(search: string) {
  return getCustomerByCompany().then((result) =>
    result.data
      .filter(
        ({ sold_to_customer_id, name, branch_id }) =>
          sold_to_customer_id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // && branch === branch_id)
      .splice(0, 10)
      .map(({ sold_to_customer_id, name }) => ({
        label: [sold_to_customer_id, name].join(' - '),
        value: [sold_to_customer_id, name].join(' - '),
      })),
  )
}

export function fieldShipToCustomer(search: string) {
  return getCustomerByCompany().then((result) =>
    result.data
      .filter(
        ({ ship_to_customer_id, name }) =>
          ship_to_customer_id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // && branch === branch_id)
      .splice(0, 10)
      .map(({ ship_to_customer_id, name }) => ({
        label: [ship_to_customer_id, name].join(' - '),
        value: [ship_to_customer_id, name].join(' - '),
      })),
  )
}

export function fieldSalesOrg(search: string) {
  return getSalesOrgByCompany().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 1)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldBranch(search: string) {
  return getCustomerByFilter({
    branch_id: '',
    customer_id: '',
    sales_org_id: '',
    salesman_id: '',
  }).then((result) =>
    result.data
      .filter(
        ({ branch_id, branch_name }) =>
          branch_id.toLowerCase().includes(search.toLowerCase()) ||
          branch_name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 1)
      .map(({ sales_org_id, sales_org_name, branch_id, branch_name }) => ({
        label: [branch_id, branch_name].join(' - '),
        value: [branch_id, branch_name].join(' - '),
        key: [sales_org_id, sales_org_name].join(' - '),
      })),
  )
}

export function fieldSalesman(search: string, branch: string) {
  return getSalesmanByCompany().then((result) =>
    result.data
      .filter(
        ({ id, name, branch_id }) =>
          (id.toLowerCase().includes(search.toLowerCase()) ||
            name.toLowerCase().includes(search.toLowerCase())) &&
          branch_id === branch,
      )
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldItem(search: string) {
  const now = new Date().toISOString()
  return getPricingByCompany()
    .then((result) =>
      result.data
        .filter(({ valid_from, valid_to }) => now > valid_from && now < valid_to)
        .map(({ product_id }) => product_id),
    )
    .then((allPricing) =>
      getProductByCompany().then((result) =>
        result.data
          .filter(
            ({ name, product_id }) =>
              (name.toLowerCase().includes(search.toLowerCase()) ||
                product_id.toLowerCase().includes(search.toLowerCase())) &&
              allPricing.includes(product_id),
          )
          .splice(0, 10)
          .map(({ name, product_id }) => ({
            label: [product_id, name].join(' - '),
            value: product_id,
          })),
      ),
    )
}

export function fieldListProduct(search: string) {
  const bodyProduct = (type: 'product_id' | 'name'): CommonListParams => ({
    filters: [
      {
        field: type,
        option: 'CP',
        from_value: `%${search}%`,
      },
    ],
    page: 1,
    limit: 10,
  })
  return getListProduct(bodyProduct('name'))
    .then((res) => res.data.results)
    .then((arr) =>
      getListProduct(bodyProduct('product_id')).then((res) => {
        const { results } = res.data
        const additionalData = [...results].filter(
          ({ product_id }) => !arr.map((e) => e.product_id).includes(product_id),
        )
        return [...arr, ...additionalData]
          .sort((a, b) => a.product_id - b.product_id)
          .slice(0, 10)
          .map(({ product_id, name }) => ({
            label: concatString(product_id, name),
            value: concatString(product_id, name),
          }))
      }),
    )
    .catch(() => [])
}

export function fieldUom(product_id: string): Promise<any> {
  const now = new Date().toISOString()
  return getPricingByProductId(product_id)
    .then((result) => result.data)
    .then((data) =>
      data
        .filter(({ valid_from, valid_to }) => now >= valid_from && now <= valid_to)
        .map(({ uom_id, price }) => ({
          label: uom_id,
          value: uom_id,
          key: price,
        })),
    )
}

export function fieldPrice(product_id: string, uom: string) {
  return getPricingByIdAndUom(product_id, uom).then((result) => result.data?.price)
}

export function fieldReason(doc_category_id: string): Promise<any> {
  return getReason(doc_category_id)
    .then((result) => result.data)
    .then((data) =>
      data.map(({ Name, ID }) => ({
        label: Name,
        value: ID,
      })),
    )
}

export function fieldBranchAll(search: string) {
  return getBranch().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, name, branch_type }) => ({
        label: [id, name].join(' - '),
        value: id,
        key: branch_type,
      })),
  )
}

export function fieldBranchAllSalesOrg(search: string) {
  return getBranch().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, name, sales_org_id }) => ({
        label: [id, name].join(' - '),
        value: id,
        key: sales_org_id,
      })),
  )
}

export function fieldBranchSupply(search: string, channel = '', supplybranch = '') {
  return getBranch().then((result) =>
    result.data
      .filter(
        ({ id, name, branch_type }) =>
          (id.toLowerCase().includes(search.toLowerCase()) ||
            name.toLowerCase().includes(search.toLowerCase())) &&
          branch_type !== channel &&
          id !== supplybranch,
      )
      .splice(0, 10)
      .map(({ id, name, branch_type }) => ({
        label: [id, name].join(' - '),
        value: id,
        key: branch_type,
      })),
  )
}

export function fieldBranchSupplyDOSTO(search: string, channel = '', supplybranch = '') {
  return getBranch().then((result) =>
    result.data
      .filter(
        ({ id, name, branch_type }) =>
          (id.toLowerCase().includes(search.toLowerCase()) ||
            name.toLowerCase().includes(search.toLowerCase())) &&
          branch_type !== channel &&
          id !== supplybranch,
      )
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldBranchBySalesOrgId(search: string, salesOrgId: string = 'PID2') {
  return getBranch().then((result) =>
    result.data
      .filter(
        ({ id, name, sales_org_id }) =>
          (id.toLowerCase().includes(search.toLowerCase()) ||
            name.toLowerCase().includes(search.toLowerCase())) &&
          sales_org_id === salesOrgId,
      )
      // .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: [id, name].join(' - '),
        key: 'PID2 - PMA - MT',
      })),
  )
}

// export function fieldBranchAll(search: string) {
//   return getBranch().then((result) =>
//     result.data
//       .filter(
//         ({ id, name }) =>
//           id.toLowerCase().includes(search.toLowerCase()) ||
//           name.toLowerCase().includes(search.toLowerCase()),
//       )
//       // .splice(0, 10)
//       .map(({ id, name, branch_type }) => ({
//         label: [id, name].join(' - '),
//         value: id,
//         key: branch_type,
//       })),
//   )
// }

export function fieldRoute(search: string) {
  return getRouteByCompany().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: [id, name].join(' - '),
      })),
  )
}

export function productBranch(search: string, branchId: string) {
  return getProductByBranch(branchId).then((result) => {
    return result.data
      ?.filter(
        ({ product_id, product_name }) =>
          product_id.toLowerCase().includes(search.toLowerCase()) ||
          product_name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ product_id, product_name }) => ({
        label: [product_id, product_name].join(' - '),
        value: product_id,
      }))
  })
}

export function itemReceiver(productId: string, transType: string) {
  return getDetailProductIntraChannel(productId, transType).then((result) => result.data)
}

export function fieldPoSto(search: string) {
  return getListDoSto({
    filters: [
      {
        field: 'id',
        option: 'CP',
        from_value: `%${search}%`,
        data_type: 'S',
      },
    ],
    limit: 20,
    page: 1,
  })
    .then((result) => result.data.result.map(({ purchase_id }) => purchase_id))
    .then((allDo) =>
      getListPoSto({
        filters: [
          {
            field: 'id',
            option: 'CP',
            from_value: `%${search}%`,
            data_type: 'S',
          },
          {
            field: 'status_id',
            option: 'EQ',
            from_value: '01',
            data_type: 'S',
          },
        ],
        limit: 20,
        page: 1,
      }).then((result) =>
        result.data.result.splice(0, 10).map(({ id }) => ({
          label: id,
          value: id,
        })),
      ),
    )
}

export function fieldSloc(search: string, doc_type_id?: string) {
  return getConfigSloc().then((result) =>
    result.data
      // .filter(({ doc_type_id }) => doc_type_id === doc_type)
      .filter(({ sloc_id }) => sloc_id.toLowerCase().includes(search.toLowerCase()))
      // .splice(0, 10)
      .map(({ sloc_id }) => ({
        label: sloc_id,
        value: sloc_id,
      })),
  )
}

export function fieldSlocFromBranch(branch = '', branch_to = '') {
  if (branch_to !== '') {
    return getListSlocByMultipleBranch({
      filters: [
        {
          field: 'branch_id',
          option: 'BT',
          from_value: branch,
          to_value: branch_to,
          data_type: 'S',
        },
      ],
      limit: 10,
      page: 1,
    }).then((result) =>
      result?.data?.splice(0, 10).map((item: any, index) => ({
        label: `${item.sloc_id || ''} - ${item.sloc_name || ''}`,
        value: item.sloc_id || '',
        key: item.branch_id || '',
      })),
    )
  } else {
    return getListSlocByMultipleBranch({
      filters: [
        {
          field: 'branch_id',
          option: 'EQ',
          from_value: branch,
          data_type: 'S',
        },
      ],
      limit: 20,
      page: 1,
    }).then((result) =>
      result?.data?.splice(0, 10).map((item: any, index) => ({
        label: `${item.sloc_id || ''} - ${item.sloc_name || ''}`,
        value: item.sloc_id || '',
      })),
    )
  }
}

export async function fieldVehicle(search: string) {
  return getDriverByCompanyId()
    .then((result) => result.data)
    .then((allDriver) =>
      getVehicleByCompany().then((result) =>
        result.data
          .map((obj) => ({
            ...obj,
            driver_name: allDriver.find(({ id }) => id === obj.DriverID).name,
          }))
          .filter(
            ({ VehicleID, driver_name }) =>
              VehicleID.toLowerCase().includes(search.toLowerCase()) ||
              driver_name.toLowerCase().includes(search.toLowerCase()),
          )
          .splice(0, 10)
          .map(({ VehicleID, driver_name, VehicleCubication }) => ({
            key: VehicleCubication,
            label: [VehicleID, driver_name].join(' - '),
            value: [VehicleID, driver_name].join(' - '),
          })),
      ),
    )
}

export async function fieldVehicle_v2(search: string) {
  return getVehicle().then((result) =>
    result.data.results
      .filter(
        ({ vehicle_id, driver_name }) =>
          vehicle_id.toLowerCase().includes(search.toLowerCase()) ||
          driver_name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ vehicle_id, driver_name, vehicle_cubication }) => ({
        key: vehicle_cubication,
        label: [vehicle_id, driver_name].join(' - '),
        value: [vehicle_id, driver_name].join(' - '),
      })),
  )
}

export function fieldOrderType(doc_type: string, search = '') {
  return getDocTypeByCategory(doc_type).then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name.split('-').join(' - ')].join(' - '),
        value: id,
      })),
  )
}

export function fieldSalesOrganization(search = '') {
  return getSalesOrgByCompany().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldSalesGroup(search = '') {
  return getSalesGroupByCompany().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldRegion(search = '') {
  return getRegion().then((result) =>
    result.data
      .filter(
        ({ country_id, name }) =>
          country_id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, country_id, name }) => ({
        label: [country_id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldWeightGroup(search = '') {
  return getWeightGroup().then((result) =>
    result.data
      .filter(
        ({ id, description }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          description.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, description }) => ({
        label: [id, description].join(' - '),
        value: id,
      })),
  )
}

export function fieldSalesmanAll(search: string) {
  return getSalesmanByCompany().then((result) =>
    result.data
      .filter(
        ({ id, name, branch_id }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()) ||
          branch_id.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, name, branch_id }) => ({
        label: [id, name].join(' - '),
        value: id,
        key: branch_id,
      })),
  )
}

export function fieldCompanyList(search: string) {
  return getCompanyList().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldCustomerGroupCompany(search = '') {
  return getCustomerGroupCompany().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldChannelCompany(search = '', companyId?: string) {
  return getChannelByCompany(companyId).then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldSalesmanGroup(search = '') {
  return getSalesmanGroupByCompany().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      // .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldUomList(search = '') {
  return getUomList().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldProductMasterData(search = '', oldProduct = '') {
  return getProductMasterData({
    filters: [
      {
        field: 'name',
        option: 'CP',
        from_value: `%${search}%`,
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result.data.results
      .filter(({ product_id, name }) => product_id != oldProduct && name != oldProduct)
      .splice(0, 10)
      .map(({ product_id, name }) => ({
        label: [product_id, name].join(' - '),
        value: product_id,
      })),
  )
}

export function fieldProductByCompany(search: string, oldProduct = '') {
  return getProductByCompany().then((result) =>
    result.data
      .filter(
        ({ name, product_id }) =>
          (name.toLowerCase().includes(search.toLowerCase()) ||
            product_id.toLowerCase().includes(search.toLowerCase())) &&
          name != oldProduct &&
          product_id != oldProduct,
      )
      .splice(0, 10)
      .map(({ name, product_id }) => ({
        label: [product_id, name].join(' - '),
        value: product_id,
      })),
  )
}

export function fieldSalesOrgCompanyDynamic(search = '', company_id = '') {
  return getSalesOrgByCompanyDynamic(company_id as string).then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldCustomerGroupCompanyDynamic(search = '', company_id = '') {
  return getCustomerGroupCompanyDynamic(company_id as string).then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldSlocFromBranchCompanyDynamic(
  company_id: string,
  doc_type: string,
  branch = '',
  branch_to = '',
) {
  return getConfigSlocCompanyDynamic(company_id).then((result) =>
    result.data
      .filter(
        ({ doc_type_id, branch_id }) =>
          doc_type_id === doc_type && (branch_id === branch || branch_id === branch_to),
      )
      .splice(0, 10)
      .map(({ sloc_id }) => ({
        label: sloc_id,
        value: sloc_id,
      })),
  )
}

export function fieldPoGRPrincipal(search: string) {
  return getPoNumberList({
    filters: [
      {
        field: 'po_number',
        option: 'CP',
        from_value: `%${search}%`,
        data_type: 'S',
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result?.data?.result?.splice(0, 10).map(({ po_id }) => ({
      label: po_id,
      value: po_id,
    })),
  )
}

export function fieldSlocByConfigLogistic(branch_id: string) {
  return getSlocbyConfigLogistic(branch_id).then((result) =>
    result.data?.map(({ sloc_id, sloc_name, sloc_type }) => ({
      label: [sloc_id, sloc_name].join(' - '),
      value: sloc_id,
      key: sloc_type,
    })),
  )
}

export function fieldSlocByConfigSlocSalesman(branch_id: string) {
  return getSlocbyConfigSlocSalesman(branch_id).then((result) =>
    result.data?.map(({ sloc_id, salesman_id, salesman_name }) => ({
      label: [sloc_id, salesman_id, salesman_name].join(' - '),
      value: sloc_id,
    })),
  )
}

export function fieldPoStoByBranch(search: string, supplybranch: string, recevingbranch: string) {
  return getListPoSto({
    filters: [
      {
        field: 'id',
        option: 'CP',
        from_value: `%${search}%`,
        data_type: 'S',
      },
      {
        field: 'suppl_branch_id',
        option: 'EQ',
        from_value: supplybranch,
        data_type: 'S',
      },
      {
        field: 'receive_branch_id',
        option: 'EQ',
        from_value: recevingbranch,
        data_type: 'S',
      },
      {
        field: 'status_id',
        option: 'EQ',
        from_value: '01',
        data_type: 'S',
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result.data.result.splice(0, 10).map(({ id }) => ({
      label: id,
      value: id,
    })),
  )
}

export function fieldRefNumberGRfromPrincipal(search: string) {
  return getGoodReceiptList({
    filters: [
      {
        field: 'id',
        option: 'CP',
        from_value: `%${search}%`,
        data_type: 'S',
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result?.data?.result?.splice(0, 10).map(({ gr_number }) => ({
      label: gr_number,
      value: gr_number,
    })),
  )
}

export function fieldRefNumberSwapHandling(search: string, branch_id = '') {
  return getDeliveryOrderList({
    filters: [
      {
        field: 'branch_id',
        option: 'EQ',
        from_value: branch_id,
        data_type: 'S',
      },
      {
        field: 'id',
        option: 'CP',
        from_value: `%${search}%`,
        data_type: 'S',
      },
      {
        field: 'delivery_type_id',
        option: 'EQ',
        from_value: `ZDW1`,
        data_type: 'S',
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result?.data?.results?.splice(0, 10).map((item: any, index) => ({
      label: item.delivery_order_id,
      value: item.delivery_order_id,
    })),
  )
}

export function fieldRequestDocumentMaterialInTransit(search: string) {
  return getListGISloc({
    filters: [
      {
        field: 'id',
        option: 'CP',
        from_value: `%${search}%`,
        data_type: 'S',
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result?.data?.result?.splice(0, 10).map((item: any, index) => ({
      label: item.id,
      value: item.id,
    })),
  )
}

export function FieldOrderType(search: string) {
  return getOrderTypeByCompany().then((result) =>
    result.data
      .filter(
        ({ order_type_id, doc_type_name }) =>
          order_type_id.toLowerCase().includes(search.toLowerCase()) ||
          doc_type_name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ order_type_id, doc_type_name }) => ({
        label: [order_type_id, ' - ', doc_type_name.split('-').join(' - ')].join(''),
        value: order_type_id,
      })),
  )
}

export function fieldSalesmanID(search: string) {
  return getSalesmanDivision({
    filters: [
      {
        field: 'salesman_id',
        option: 'CP',
        from_value: `%${search}%`,
      },
    ],
    limit: 10,
  })
    .then((res) => res.data.results)
    .then((res) =>
      res.map((e) => ({
        label: e.salesman_id,
        value: e.salesman_id,
      })),
    )
}

export function fieldDivisionID(search: string) {
  return getSalesmanDivision({
    filters: [
      {
        field: 'division_id',
        option: 'CP',
        from_value: `%${search}%`,
      },
    ],
    limit: 10,
  })
    .then((res) => res.data.results)
    .then((res) => res.map((e) => e.division_id))
    .then((res) =>
      [...new Set(res)].map((e) => ({
        label: e,
        value: e,
      })),
    )
}

export function fieldUoMConversion(product_id: string): Promise<any> {
  return getProductConversionByProductId(product_id)
    .then((result) => result.data)
    .then((data) =>
      data.map(({ uom_id, numerator }) => ({
        label: uom_id,
        value: uom_id,
        key: numerator,
      })),
    )
}

export async function fieldNewSalesmanDivision(search: string) {
  function isSame(value: any) {
    return value.toLowerCase().includes(search.toLowerCase())
  }
  return getSalesmanByCompany()
    .then((res) => res.data)
    .then((res) => res.splice(0, 10))
    .then((res) =>
      res.filter(async ({ id, name }) => {
        const salesmanExists = await getSalesmanDivision({
          filters: [
            {
              field: 'salesman_id',
              option: 'EQ',
              from_value: id,
            },
          ],
        })
          .then((resp) => resp.data.results || [])
          .then((resp) => resp.map((e) => e.salesman_id))

        return salesmanExists.includes(id) && (isSame(id) || isSame(name))
      }),
    )
    .then((res) =>
      res.map((e) => ({
        label: concatString(e.id, e.name),
        value: e.id,
      })),
    )
}

export function fieldDistrictByCompany(search: string) {
  return getDistrictByCompanyId().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ id, name }) => ({
        label: [id, ' - ', name.split('-').join(' - ')].join(''),
        value: id,
      })),
  )
}

export function fieldDivisionByCompany(search: string) {
  return getDivisionByCompanyId().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ id, name }) => ({
        label: [id, ' - ', name.split('-').join(' - ')].join(''),
        value: id,
      })),
  )
}

export function fieldPaymentMethod(search: string) {
  return getPaymentMethod().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ id, name }) => ({
        label: [id, ' - ', name.split('-').join(' - ')].join(''),
        value: id,
      })),
  )
}

export function fieldPriceGroupByCompanyId(search: string) {
  return getPricingByCompany().then((result) =>
    result.data
      .filter(
        ({ price_group_id, price }) =>
          price_group_id.toLowerCase().includes(search.toLowerCase()) ||
          price.toString().toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ price_group_id, price }) => ({
        label: [price_group_id, ' - ', price.toString().split('-').join(' - ')].join(''),
        value: price_group_id,
      })),
  )
}

export function fieldSalesOfficeByCompany(search: string) {
  return getSalesOfficeByCompany().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ id, name }) => ({
        label: [id, ' - ', name.split('-').join(' - ')].join(''),
        value: id,
      })),
  )
}

export function fieldTermByCompanyId(search: string) {
  return getTermByCompanyId().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ id, name }) => ({
        label: [id, ' - ', name.split('-').join(' - ')].join(''),
        value: id,
      })),
  )
}

export function fieldTransportationZone(search = '') {
  return getTransportationZone().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldInco(search = '') {
  return getInco().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldRules(search = '') {
  return getRules().then((result) =>
    result.data
      .filter(({ id }) => id.toLowerCase().includes(search.toLowerCase()))
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldModeOfTransportation(search = '') {
  return getListTrasportationMode({
    filters: [
      {
        field: 'description',
        option: 'CP',
        from_value: `%${search}%`,
      },
      {
        field: 'status',
        option: 'CP',
        from_value: true,
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result?.data?.results?.splice(0, 10).map(({ id, description }) => ({
      label: [id, description].join(' - '),
      value: id,
    })),
  )
}

export function fieldVehicleType(search = '') {
  return getListVehicleType({
    filters: [
      {
        field: 'description',
        option: 'CP',
        from_value: `%${search}%`,
      },
      {
        field: 'status',
        option: 'CP',
        from_value: true,
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result?.data?.results?.splice(0, 10).map(({ id, description }) => ({
      label: [id, description].join(' - '),
      value: id,
    })),
  )
}

export function fieldTransportationDriver(search = '', branch_id = '') {
  return getListDriver({
    filters: [
      {
        field: 'branch_id',
        option: 'CP',
        from_value: `%${branch_id}%`,
      },
      {
        field: 'name',
        option: 'CP',
        from_value: `%${search}%`,
      },
      {
        field: 'type',
        option: 'EQ',
        from_value: `driver`,
      },
      {
        field: 'status',
        option: 'CP',
        from_value: true,
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result?.data?.results?.splice(0, 10).map(({ driver_id, driver_name }) => ({
      label: [driver_id, driver_name].join(' - '),
      value: driver_id,
    })),
  )
}

export function fieldTransportationHelper(search = '', branch_id = '') {
  return getListDriver({
    filters: [
      {
        field: 'branch_id',
        option: 'CP',
        from_value: `%${branch_id}%`,
      },
      {
        field: 'name',
        option: 'CP',
        from_value: `%${search}%`,
      },
      {
        field: 'type',
        option: 'EQ',
        from_value: `helper`,
      },
      {
        field: 'status',
        option: 'CP',
        from_value: true,
      },
    ],
    limit: 20,
    page: 1,
  }).then((result) =>
    result?.data?.results?.splice(0, 10).map(({ driver_id, driver_name }) => ({
      label: [driver_id, driver_name].join(' - '),
      value: driver_id,
    })),
  )
}

export function fieldCountry(search = '') {
  return getCountry().then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldCompanybyCountry(search = '', country_id = '') {
  return getCompanybyCountry(country_id).then((result) =>
    result.data
      .filter(
        ({ id, name }) =>
          id.toLowerCase().includes(search.toLowerCase()) ||
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldTaxbyCompany(search = '', company_id = '') {
  return getTaxbyCompany(company_id).then((result) =>
    result.data
      .filter(
        ({ company_id, tax_name }) =>
          company_id.toLowerCase().includes(search.toLowerCase()) ||
          tax_name.toLowerCase().includes(search.toLowerCase()),
      )
      .map(({ tax_name }) => ({
        label: tax_name,
        value: tax_name,
      })),
  )
}
