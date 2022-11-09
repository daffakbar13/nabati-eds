import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  CreateColumns(
    'Request Document',
    'request_document',
    true,
  ),
  CreateColumns(
    'Delivery Order Document',
    'delivery_order_document',
    true,
    (a) => <>{a}</>,
    250,
  ),
  CreateColumns(
    'Transaction Type',
    'transaction_type',
    true,
  ),
  CreateColumns(
    'Item',
    'item',
    true,
  ),
  CreateColumns(
    'Material',
    'product_id',
    true,
    (branchId, record) => <>{`${record.product_id} - ${record.product_description}`}</>,
  ),
  CreateColumns(
    'Receiving Branch',
    'item',
    true,
  ),
  CreateColumns(
    'Supplying Branch',
    'supplying_branch_id',
    true,
    (branchId, record) => <>{`${branchId} - ${record.supplying_branch_name}`}</>,
    250,
  ),
  CreateColumns(
    'Large',
    'large',
    true,
  ),
  CreateColumns(
    'Middle',
    'middle',
    true,
  ),
  CreateColumns(
    'Small',
    'small',
    true,
  ),
]
