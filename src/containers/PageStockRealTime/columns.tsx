import React from 'react'
import CreateColumns from 'src/utils/createColumns'

export const StockRealTimeColumns = [
  CreateColumns(
    'Branch',
    'branch_id',
    true,
    (branchId, record) => <>{`${branchId} - ${record.branch_name}`}</>,
    300,
  ),
  CreateColumns(
    'Sloc',
    'sloc_id',
    true,
    (text) => <>{text}</>,
    100,
  ),
  CreateColumns(
    'Material',
    'product_id',
    true,
    (productId, record) => <>{`${productId} - ${record.product_name}`}</>,
    400,
  ),
  CreateColumns(
    'Large',
    'large',
    true,
    (text) => <>{text}</>,
    100,
  ),
  CreateColumns(
    'Middle',
    'middle',
    true,
    (text) => <>{text}</>,
    100,
  ),
  CreateColumns(
    'Small',
    'small',
    true,
    (text) => <>{text}</>,
    100,
  ),
  CreateColumns(
    'Total In Small',
    'total_in_small',
    true,
    (text) => <>{text}</>,
    // 100,
  ),
  CreateColumns(
    'Total In Large',
    'total_in_large',
    true,
    (text) => <>{text}</>,
    // 100,
  ),
]
