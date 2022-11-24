/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { Children } from 'react'
import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'

export const column = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1, 60),
  CreateColumns(
    'Item',
    'product_id',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.product_name || ''}`,
  ),
  CreateColumns(
    'Po',
    'po',
    false,
    (text: string, record: any) => `${record.base_qty || ''} - ${record.base_uom_id || ''}`,
    150,
    false,
    '',
    [
      {
        title: 'Qty',
        dataIndex: 'base_qty',
        key: 'qty_po',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'base_uom_id',
        key: 'uom_po',
        width: 75,
      },
    ],
  ),
  CreateColumns(
    'DO',
    'do',
    false,
    (text: string, record: any) => `${record.base_qty || ''} - ${record.base_uom_id || ''}`,
    150,
    false,
    '',
    [
      {
        title: 'Qty',
        dataIndex: 'qty',
        key: 'base_qty',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'uom_id',
        key: 'base_uom_id',
        width: 75,
      },
    ],
  ),
  CreateColumns(
    'GR',
    'gr',
    false,
    (text: string, record: any) => `${record.qty || ''} - ${record.uom_id || ''}`,
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
    'SLoc',
    'sloc_id',
    false,
    (text: string, record: any) => `${record.sloc_id || ''} - ${record.sloc_name || ''}`,
  ),
  CreateColumns('Batch', 'batch', false),
  CreateColumns('Remarks', 'remarks', false),
]
