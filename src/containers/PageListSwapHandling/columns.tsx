import { addColumn } from 'src/utils/createColumns'
import moment from 'moment'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  addColumn({
    title: 'Material Document',
    dataIndex: 'material_document',
    fixed: true,
    sorter: true,
    width: 250,
  }),
  addColumn({
    title: 'Movement Type',
    dataIndex: 'movement_type_name',
    width: 200,
  }),
  addColumn({
    title: 'From',
    dataIndex: 'from_sloc',
    width: 100,
  }),
  addColumn({
    title: 'To',
    dataIndex: 'to_sloc',
    width: 100,
  }),
  addColumn({
    title: 'Material Date',
    dataIndex: 'material_date',
    width: 200,
  }),
  addColumn({
    title: 'No. Reference',
    dataIndex: 'no_reference',
  }),
  addColumn({
    title: 'Material',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text || ''} - ${record.product_description || ''}`,
  }),
  addColumn({
    title: 'Large',
    dataIndex: 'large',
  }),
  addColumn({
    title: 'Middle',
    dataIndex: 'middle',
  }),
  addColumn({
    title: 'Small',
    dataIndex: 'small',
  }),
  addColumn({
    title: 'No. Ref. Cancel',
    dataIndex: 'no_reference_cancel',
  }),
]
