/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { Children } from 'react'
import { addColumn } from 'src/utils/createColumns'

export const column = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (text: string, record: any, index: number) => index + 1,
    width: 50,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text: string, record: any) =>
      `${record.product_id || ''} - ${record.description || ''}`,
    width: 400,
  }),
  addColumn({
    title: 'Po',
    dataIndex: 'po',
    width: 400,
    children: [
      {
        title: 'Qty',
        dataIndex: 'qty',
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
    title: 'PO Outstanding',
    dataIndex: 'outstanding',
    width: 400,
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
    title: 'DO',
    dataIndex: 'received',
    width: 400,
    children: [
      {
        title: 'Qty',
        dataIndex: 'received_qty',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'received_uom_id',
        width: 75,
      },
    ],
  }),
  addColumn({
    title: 'SLoc',
    dataIndex: 'sloc_id',
    render: (text: string, record: any) => `${record.sloc_id || ''} - ${record.sloc_name || ''}`,
    width: 200,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    render: (text: string, record: any) => `${record.batch || '-'}`,
    width: 300,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    render: (text: string, record: any) => `${record.remarks || '-'}`,
    width: 300,
  }),
]
