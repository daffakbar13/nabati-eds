/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { Children } from 'react'
import { addColumn } from 'src/utils/createColumns'

export const column = [
  addColumn({
    title: 'No',
    dataIndex: 'po_number',
    render: (text, record, index) => index + 1,
    fixed: true,
    width: 50,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text || ''} - ${record.product_name || ''}`,
  }),
  addColumn({
    title: 'PO',
    dataIndex: 'po',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty',
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'uom_id',
      }),
    ],
  }),
  addColumn({
    title: 'Outstanding',
    dataIndex: 'outstanding',
    children: [
      {
        title: 'Qty',
        dataIndex: 'received_base_qty',
        render: (text, record, index) => (
          <>
            {record.uom_id == 'CTN'
              ? Math.round((parseFloat(record.qty) - parseFloat(record.received_qty)) * 100) / 100
              : Math.round(
                  (parseFloat(record.base_qty) - parseFloat(record.received_base_qty)) * 100,
                ) / 100}
          </>
        ),
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'uom_id',
        width: 75,
      },
    ],
  }),
  addColumn({
    title: 'Received',
    dataIndex: 'received',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'received_qty',
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'received_uom_id',
      }),
    ],
  }),
  addColumn({
    title: 'Storage Location',
    dataIndex: 'sloc_id',
    render: (text, record, index) => `${text || ''} - ${record.sloc_name || ''}`,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 150,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    width: 150,
  }),
]
