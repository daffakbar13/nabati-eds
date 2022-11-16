import React from 'react'
import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
import moment from 'moment'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  CreateColumns(
    'No',
    'branch_id',
    true,
    (text, record, index) => <>{index + 1}</>,
    100,
  ),
  CreateColumns(
    'Branch',
    'branch_id',
    true,
    (branchId, record) => <>{`${branchId} - ${record.branch_name}`}</>,
    300,
  ),
  CreateColumns(
    'Material',
    'product_id',
    true,
    (text, record) => <>{`${text} - ${record.product_description}`}</>,
    400,
  ),
  CreateColumns(
    'Sloc',
    'sloc',
    true,
  ),
  CreateColumns(
    'Date From',
    'date_from',
    true,
    (text) => <>{moment(text).format('DD-MMM-YYYY')}</>,
  ),
  CreateColumns(
    'Date To',
    'date_to',
    true,
    (text) => <>{moment(text).format('DD-MMM-YYYY')}</>,
  ),
  CreateColumns(
    'Stock Awal',
    'first_stock',
    true,
  ),
  CreateColumns(
    'Total GoodS Received',
    'total_good_received',
    true,
  ),
  CreateColumns(
    'Total Stock Out',
    'total_stock_out',
    true,
  ),
  CreateColumns(
    'Last Stock',
    'last_stock',
    true,
  ),
  CreateColumns(
    'UOM',
    'uom_id',
    true,
  ),
]
