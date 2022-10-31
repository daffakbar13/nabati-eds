import CreateColumns from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const StockRealTimeColumns = [
  CreateColumns('Branch ', 'branch_id', true),
  CreateColumns('Sloc', 'slocId', true),
  CreateColumns('Material', 'dfg', true),
  CreateColumns('Large', 'dfg', true),
  CreateColumns('Middle', 'dfg', true),
  CreateColumns('Small', 'dfg', true),
  CreateColumns('Total', 'dfg', true),
]
