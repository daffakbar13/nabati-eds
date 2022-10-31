import CreateColumns from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const StockRealTimeColumns = [
  CreateColumns('Branch ', 'branch_id', true),
  CreateColumns('Material', 'dfg', true),
  CreateColumns('Sloc', 'slocId', true),
  CreateColumns('Status Data', 'dfg', true),
  CreateColumns('L', 'dfg', true),
]
