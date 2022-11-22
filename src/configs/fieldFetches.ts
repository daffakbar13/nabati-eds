import { getCustomerByCompany, getSalesOrgByCompany, getSalesmanByCompany, getProductByCompany, getPricingByIdAndUom, getProductById, getBranch, getOrderTypeByCompany, getPricingByCompany, getPricingByProductId, getReason, getCustomerByFilter, getConfigSloc, getRouteByCompany, getProductByBranch, getItemReceiver } from 'src/api/master-data';
import { getCustomerByFilterProps } from 'src/api/master-data/types';
import { getListPoSto } from 'src/api/logistic/po-sto'
import { getListDoSto } from 'src/api/logistic/do-sto'

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
/* eslint-disable max-len */

export function fieldQuotationType(search: string) {
    return getOrderTypeByCompany()
        .then((result) =>
            result.data
                .filter(({ order_type_id, doc_type_name }) =>
                    order_type_id.toLowerCase().includes(search.toLowerCase())
                    || doc_type_name.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ order_type_id, doc_type_name }) => ({
                    label: [order_type_id, ' - ', doc_type_name.split('-').join(' - ')].join(''),
                    value: order_type_id,
                })))
}

export function fieldSoldToCustomer(search: string) {
    return getCustomerByCompany()
        .then((result) =>
            result.data
                .filter(({ sold_to_customer_id, name, branch_id }) =>
                (sold_to_customer_id.toLowerCase().includes(search.toLowerCase())
                    || name.toLowerCase().includes(search.toLowerCase())))
                // && branch === branch_id)
                .splice(0, 10)
                .map(({ sold_to_customer_id, name }) => ({
                    label: [sold_to_customer_id, name].join(' - '),
                    value: [sold_to_customer_id, name].join(' - '),
                })))
}

export function fieldShipToCustomer(search: string) {
    return getCustomerByCompany()
        .then((result) =>
            result.data
                .filter(({ ship_to_customer_id, name, branch_id }) =>
                (ship_to_customer_id.toLowerCase().includes(search.toLowerCase())
                    || name.toLowerCase().includes(search.toLowerCase())))
                // && branch === branch_id)
                .splice(0, 10)
                .map(({ ship_to_customer_id, name }) => ({
                    label: [ship_to_customer_id, name].join(' - '),
                    value: [ship_to_customer_id, name].join(' - '),
                })))
}

export function fieldSalesOrg(search: string) {
    return getSalesOrgByCompany()
        .then((result) =>
            result.data
                .filter(({ id }) => id.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ id, name }) => ({
                    label: [id, name].join(' - '),
                    value: [id, name].join(' - '),
                })))
}

export function fieldBranch(payload: getCustomerByFilterProps) {
    return getCustomerByFilter(payload)
        .then((res) => res.data)
    // return getBranch()
    //     .then((result) =>
    //         result.data
    //             .filter(({ id, name }) =>
    //                 id.toLowerCase().includes(search.toLowerCase())
    //                 || name.toLowerCase().includes(search.toLowerCase()))
    //             .splice(0, 10)
    //             .map(({ id, name }) => ({
    //                 label: [id, name].join(' - '),
    //                 value: id,
    //             })))
}

export function fieldSalesman(search: string, branch: string) {
    return getSalesmanByCompany()
        .then((result) =>
            result.data
                .filter(({ id, name, branch_id }) =>
                    (id.toLowerCase().includes(search.toLowerCase())
                        || name.toLowerCase().includes(search.toLowerCase()))
                    && branch_id === branch)
                .splice(0, 10)
                .map(({ id, name }) => ({
                    label: [id, name].join(' - '),
                    value: id,
                })))
}

export function fieldItem(search: string) {
    const now = new Date().toISOString()
    return getPricingByCompany()
        .then((result) => result.data
            .filter(({ valid_from, valid_to }) => now > valid_from && now < valid_to)
            .map(({ product_id }) => product_id))
        .then((allPricing) => getProductByCompany()
            .then((result) =>
                result.data
                    .filter(({ name, product_id }) =>
                        (name.toLowerCase().includes(search.toLowerCase())
                            || product_id.toLowerCase().includes(search.toLowerCase()))
                        && allPricing.includes(product_id))
                    .splice(0, 10)
                    .map(({ name, product_id }) => ({
                        label: name,
                        value: product_id,
                    }))))
}

export function fieldUom(product_id: string): Promise<any> {
    const now = new Date().toISOString()
    return getPricingByProductId(product_id)
        .then((result) => result.data)
        .then((data) => data
            .filter(({ valid_from, valid_to }) => now >= valid_from && now <= valid_to)
            .map(({ uom_id }) => ({
                label: uom_id,
                value: uom_id,
            })))
}

export function fieldPrice(product_id: string, uom: string) {
    return getPricingByIdAndUom(product_id, uom)
        .then((result) => result.data?.price)
}

export function fieldReason(doc_category_id: string): Promise<any> {
    return getReason(doc_category_id)
        .then((result) => result.data)
        .then((data) => data
            .map(({ Name, ID }) => ({
                label: Name,
                value: ID,
            })))
}

export function fieldBranchAll(search: string) {
    return getBranch()
        .then((result) =>
            result.data
                .filter(({ id, name }) =>
                    id.toLowerCase().includes(search.toLowerCase())
                    || name.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ id, name, branch_type }) => ({
                    label: [id, name].join(' - '),
                    value: id,
                    key: branch_type,
                })))
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
    return getBranch()
        .then((result) =>
            result.data
                .filter(({ id, name, branch_type }) =>
                    (id.toLowerCase().includes(search.toLowerCase())
                        || name.toLowerCase().includes(search.toLowerCase())) && branch_type != channel && id != supplybranch)
                .splice(0, 10)
                .map(({ id, name, branch_type }) => ({
                    label: [id, name].join(' - '),
                    value: id,
                    key: branch_type,
                })))
}

export function fieldRoute(search: string) {
    return getRouteByCompany()
        .then((result) =>
            result.data
                .filter(({ id, name }) =>
                    id.toLowerCase().includes(search.toLowerCase())
                    || name.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ id, name }) => ({
                    label: [id, name].join(' - '),
                    value: [id, name].join(' - '),
                })))
}

export function productBranch(search: string, branchId: string) {
    return getProductByBranch(branchId)
        .then((result) =>
            result.data
                .filter(({ product_id, product_name }) =>
                    product_id.toLowerCase().includes(search.toLowerCase())
                    || product_name.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ product_id, product_name }) => ({
                    label: [product_id, product_name].join(' - '),
                    value: product_id,
                })))
}

export function itemReceiver(productId: string) {
    return getItemReceiver(productId)
        .then((result) =>
            result.data
        )
}

export function fieldPoSto(search: string) {
    return getListDoSto({ filters: [], limit: 20, page: 1 })
        .then((result) => result.data.result
            .map(({ purchase_id }) => purchase_id))
        .then((allDo) => getListPoSto({ filters: [], limit: 20, page: 1 })
            .then((result) =>
                result.data.result
                    .filter(({ id }) =>
                        (id.toLowerCase().includes(search.toLowerCase()))
                        && allDo.includes(id))
                    .splice(0, 10)
                    .map(({ id }) => ({
                        label: id,
                        value: id,
                    }))))
    // return getListPoSto()
    //     .then((result) =>
    //         result.data.result
    //             .filter(({ id }) =>
    //                 id.toLowerCase().includes(search.toLowerCase()))
    //             .splice(0, 10)
    //             .map(({ id }) => ({
    //                 label: id,
    //                 value: id,
    //             })))
}

export function fieldSloc(doc_type: string) {
    return getConfigSloc()
        .then((result) =>
            result.data
                .filter(({ doc_type_id }) => doc_type_id == doc_type)
                .splice(0, 10)
                .map(({ sloc_id }) => ({
                    label: sloc_id,
                    value: sloc_id,
                })))
}