import {
  getBranch,
  getConfigSloc,
  getProductByCompany,
  getCompanies,
  getUomList,
} from 'src/api/master-data'

import { getPoNumberList } from 'src/api/logistic/good-receipt'

export const MASTER_DATA_TYPES = {
  COMPANY: {
    api: getCompanies,
    placeholder: 'Select Company',
    responseHandler: (res) =>
      res.data.map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  },
  PLANT: {
    api: getBranch,
    placeholder: 'Select Plant',
    responseHandler: (res) =>
      res.data.map(({ id, name }) => ({
        label: [id, name].join(' - '),
        value: id,
      })),
  },
  SLOC: {
    api: getConfigSloc,
    placeholder: 'Select Sloc',
    responseHandler: (res) =>
      res.data.map((item: any) => ({
        label: item.sloc_id,
        value: item.sloc_id,
        key: item.sloc_id + item.branch_id + item.doc_type_id,
      })),
  },
  MATERIAL: {
    api: getProductByCompany,
    placeholder: 'Select Material',
    responseHandler: (res) =>
      res.data.map((item: any) => ({
        label: `${item.product_id} - ${item.name}`,
        value: item.product_id,
      })),
  },
  UOM: {
    api: getUomList,
    placeholder: 'Select UOM',
    responseHandler: (res) =>
      res.data.map((item: any) => ({
        label: `${item.id}`,
        value: item.id,
      })),
  },
  PO_NUMBER: {
    api: getPoNumberList,
    placeholder: 'Select PO Number',
    responseHandler: (res) =>
      res?.data?.po_id.map((item: any) => ({
        label: `${item}`,
        value: item,
      })),
  },
}
