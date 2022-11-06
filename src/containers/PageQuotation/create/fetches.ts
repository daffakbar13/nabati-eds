import { getCustomerByCompany, getSalesOrgByCompany, getSalesmanByCompany } from 'src/api/master-data';

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
/* eslint-disable max-len */

export function fieldQuotationType(search: string) {
    return getCustomerByCompany()
        .then((_) =>
            [
                { order_type: 'ZOP1 - TO' },
                { order_type: 'ZOP3 - SO Non Reguler' },
                { order_type: 'ZWE1 - Return - Swap' },
                { order_type: 'ZRP1 - Return - Sales' },
                { order_type: 'ZRP1 - Return - FOC' },
                { order_type: 'ZCE1 - Canvas' },
            ]
                .filter(({ order_type }) => order_type.toLowerCase().includes(search.toLowerCase()))
                // .splice(0, 5)
                .map(({ order_type }) => ({
                    label: order_type,
                    value: order_type,
                })))
}

export function fieldSoldToCustomer(search: string) {
    return getCustomerByCompany()
        .then((result) =>
            result.data
                .filter(({ sold_to_customer_id }) => sold_to_customer_id.toLowerCase().includes(search.toLowerCase()))
                // .splice(0, 5)
                .map(({ sold_to_customer_id }) => ({
                    label: sold_to_customer_id,
                    value: sold_to_customer_id,
                })))
}

export function fieldShipToCustomer(search: string) {
    return getCustomerByCompany()
        .then((result) =>
            result.data
                .filter(({ ship_to_customer_id }) => ship_to_customer_id.toLowerCase().includes(search.toLowerCase()))
                // .splice(0, 5)
                .map(({ ship_to_customer_id }) => ({
                    label: ship_to_customer_id,
                    value: ship_to_customer_id,
                })))
}

export function fieldSalesOrg(search: string) {
    return getSalesOrgByCompany()
        .then((result) =>
            result.data
                .filter(({ id }) => id.toLowerCase().includes(search.toLowerCase()))
                // .splice(0, 5)
                .map(({ id }) => ({
                    label: id,
                    value: id,
                })))
}

export function fieldBranch(search: string) {
    return getSalesmanByCompany()
        .then((result) =>
            result.data
                .filter(({ branch_id }) => branch_id.toLowerCase().includes(search.toLowerCase()))
                // .splice(0, 5)
                .map(({ branch_id }) => ({
                    label: branch_id,
                    value: branch_id,
                })))
}

export function fieldSalesman(search: string) {
    return getSalesmanByCompany()
        .then((result) =>
            result.data
                .filter(({ id }) => id.toLowerCase().includes(search.toLowerCase()))
                // .splice(0, 5)
                .map(({ id }) => ({
                    label: id,
                    value: id,
                })))
}