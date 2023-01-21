import {
  getCustomerByCompany,
  getSalesOrgByCompany,
  getSalesmanByCompany,
  getProductByCompany,
  getPricingByIdAndUom,
  getProductById,
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
} from 'src/api/master-data'
import { getCustomerByFilterProps } from 'src/api/master-data/types'
import { getListPoSto } from 'src/api/logistic/po-sto'
import { getListDoSto } from 'src/api/logistic/do-sto'
import { getDetailProductIntraChannel } from 'src/api/logistic/config-mapping-product-intra'
import { CommonListParams } from 'src/api/types'
import { concatString } from 'src/utils/concatString'
import { getPoNumberList, getGoodReceiptList } from 'src/api/logistic/good-receipt'

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
      .splice(0, 10)
      .map(({ id, name, branch_type }) => ({
        label: [id, name].join(' - '),
        value: id,
        key: branch_type,
      })),
  )
}

export function fieldBranchSupply(search: string, channel = '', supplybranch = '') {
  // return getConfigSloc()
  //     .then((result) => result.data
  //         .map(({ branch_id }) => branch_id))
  //     .then((allbranch) => getBranch()
  //         .then((result) =>
  //             result.data
  //                 .filter(({ name, id, branch_type }) =>
  //                     (name.toLowerCase().includes(search.toLowerCase())
  //                         || id.toLowerCase().includes(search.toLowerCase()))
  //                     && allbranch.includes(id) && branch_type !== channel)
  //                 .splice(0, 10)
  //                 .map(({ id, name, branch_type }) => ({
  //                     label: [id, name].join(' - '),
  //                     value: id,
  //                     key: branch_type,
  //                 }))))
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
  return getProductByBranch(branchId).then((result) =>
    result.data
      ?.filter(
        ({ product_id, product_name }) =>
          product_id.toLowerCase().includes(search.toLowerCase()) ||
          product_name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ product_id, product_name }) => ({
        label: [product_id, product_name].join(' - '),
        value: product_id,
      })),
  )
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

export function fieldSloc(doc_type: string) {
  return getConfigSloc().then((result) =>
    result.data
      .filter(({ doc_type_id }) => doc_type_id === doc_type)
      .splice(0, 10)
      .map(({ sloc_id }) => ({
        label: sloc_id,
        value: sloc_id,
      })),
  )
}

export function fieldSlocFromBranch(doc_type: string, branch = '', branch_to = '') {
  return getConfigSloc().then((result) =>
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
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
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
          name.toLowerCase().includes(search.toLowerCase()),
      )
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
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
      .splice(0, 10)
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
      .splice(0, 10)
      .map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  )
}

export function fieldChannelCompany(search = '') {
  return getChannelByCompany().then((result) =>
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

export function fieldSalesmanGroup(search = '') {
  return getSalesmanGroupByCompany().then((result) =>
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
        from_value: `${search}`,
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
    result.data?.splice(0, 10).map(({ sloc_id, sloc_name }) => ({
      label: [sloc_id, sloc_name].join(' - '),
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
  return getPoNumberList({
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
