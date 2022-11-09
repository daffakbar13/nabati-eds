import { getCustomerByCompany, getSalesOrgByCompany, getSalesmanByCompany, getProductByCompany, getPricingByIdAndUom, getProductById, getBranch, getOrderTypeByCompany } from 'src/api/master-data';

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
                .filter(({ sold_to_customer_id, name }) =>
                    sold_to_customer_id.toLowerCase().includes(search.toLowerCase())
                    || name.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ sold_to_customer_id, name }) => ({
                    label: [sold_to_customer_id, '-', name].join(''),
                    value: sold_to_customer_id,
                })))
}

export function fieldShipToCustomer(search: string) {
    return getCustomerByCompany()
        .then((result) =>
            result.data
                .filter(({ ship_to_customer_id, name }) =>
                    ship_to_customer_id.toLowerCase().includes(search.toLowerCase())
                    || name.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ ship_to_customer_id, name }) => ({
                    label: [ship_to_customer_id, '-', name].join(''),
                    value: ship_to_customer_id,
                })))
}

export function fieldSalesOrg(search: string) {
    return getSalesOrgByCompany()
        .then((result) =>
            result.data
                .filter(({ id }) => id.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ id }) => ({
                    label: id,
                    value: id,
                })))
}

export function fieldBranch(search: string) {
    return getBranch()
        .then((result) =>
            result.data
                .filter(({ id }) => id.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ id }) => ({
                    label: id,
                    value: id,
                })))
}

export function fieldSalesman(search: string) {
    return getSalesmanByCompany()
        .then((result) =>
            result.data
                .filter(({ id }) => id.toLowerCase().includes(search.toLowerCase()))
                .splice(0, 10)
                .map(({ id }) => ({
                    label: id,
                    value: id,
                })))
}

export function fieldItem(search: string) {
    return getProductByCompany()
        .then((result) => result.data
            .map(({ product_id }) => product_id))
        .then((havePricing) => getProductByCompany()
        .then((result) =>
            result.data
                .filter(({ name, product_id }) =>
                    name.toLowerCase().includes(search.toLowerCase())
                    && havePricing.includes(product_id))
                .splice(0, 10)
                .map(({ name, product_id }) => ({
                    label: name,
                    value: product_id,
                }))))
}

export function fieldUom(product_id: string): Promise<any> {
    return getProductById(product_id)
        .then((result) => result.data)
        .then(({ base_uom_id, middle_uom_id, high_uom_id }) => ([
            { label: base_uom_id, value: base_uom_id },
            { label: middle_uom_id, value: middle_uom_id },
            { label: high_uom_id, value: high_uom_id },
        ]))
}

export function fieldPrice(product_id: string, uom: string) {
    return getPricingByIdAndUom(product_id, uom)
        .then((result) => result.data?.price)
}