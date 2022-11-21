/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { Children } from 'react'
import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'

export const column = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1),
  CreateColumns(
    'Item',
    'product_id',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.description || ''}`,
  ),
  CreateColumns(
    'Po',
    'po',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.product_name || ''}`,
    150,
    false,
    '',
    [
      {
        title: 'Qty',
        dataIndex: 'qty',
        key: 'qty_po',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'uom_id',
        key: 'uom_po',
        width: 75,
      },
    ],
  ),
  CreateColumns(
    'Outstanding',
    'outstanding',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.product_name || ''}`,
    150,
    false,
    '',
    [
      {
        title: 'Qty',
        dataIndex: 'qty',
        key: 'qty_outstanding',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'uom_id',
        key: 'uom_outstanding',
        width: 75,
      },
    ],
  ),
  CreateColumns(
    'Received',
    'received',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.product_name || ''}`,
    150,
    false,
    '',
    [
      {
        title: 'Qty',
        dataIndex: 'qty',
        key: 'qty_received',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'uom_id',
        key: 'uom_received',
        width: 75,
      },
    ],
  ),
  CreateColumns(
    'Storage Location',
    'sloc_id',
    false,
    (text: string, record: any) => `${record.sloc_id || ''} - ${record.sloc_name || ''}`,
  ),
  CreateColumns('Batch', 'batch', false),
  CreateColumns('Remarks', 'remarks', false),
]
