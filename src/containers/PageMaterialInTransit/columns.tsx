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
    'item',
    true,
  ),
  CreateColumns(
    'Receiving Branch',
    'item',
    true,
  ),
  CreateColumns(
    'Supplying Branch',
    'supplying_branch_id',
    // (branchId, record) => <>{`${branchId} - ${record.branch_name}`}</>,
    true,
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
