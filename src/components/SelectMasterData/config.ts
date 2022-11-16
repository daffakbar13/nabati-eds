import {
    getBranch,
    getConfigSloc,
    getProductByCompany,
    getCustomerByCompany,
    getSalesOrgByCompany,
    getSalesmanByCompany,
    getPricingByIdAndUom,
    getProductById,
    getOrderTypeByCompany,
    getPricingByCompany,
    getPricingByProductId,
    getReason,
    getCustomerByFilter,
} from 'src/api/master-data';

export const MASTER_DATA_TYPES = {
    PLANT: {
        api: getBranch,
        placeholder: 'Select Plant',
        responseHandler: (res) => res.data
            .map(({ id, name }) => ({
                label: [id, name].join(' - '),
                value: id,
            })),
    },
    SLOC: {
        api: getConfigSloc,
        placeholder: 'Select Sloc',
        responseHandler: (res) => res.data
            .map((item: any) => ({
                label: item.sloc_id,
                value: item.sloc_id,
                key: item.sloc_id + item.branch_id + item.doc_type_id,
            })),
    },
    MATERIAL: {
        api: getProductByCompany,
        placeholder: 'Select Material',
        responseHandler: (res) => res.data
            .map((item: any) => ({
                label: `${item.product_id} - ${item.name}`,
                value: item.product_id,
            })),
    },
}