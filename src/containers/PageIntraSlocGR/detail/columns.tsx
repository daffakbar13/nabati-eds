/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'

export const column = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1),
  CreateColumns(
    'Item Sender',
    'product_id',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.product_name || ''}`,
  ),
  CreateColumns(
    'Item Receiver',
    'product_receiver_id',
    false,
    (text: string, record: any) =>
      `${record.product_receiver_id || ''} - ${record.product_receiver_name || ''}`,
  ),
  CreateColumns('Qty', 'qty', false),
  CreateColumns('UoM', 'uom_id', false),
  CreateColumns('Batch', 'batch', false),
  CreateColumns('Remarks', 'remarks', false),
]
