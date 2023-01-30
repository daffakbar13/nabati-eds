/* eslint-disable */
import { addColumn } from 'src/utils/createColumns'
export const columns = [
  {
    title: 'SLoc',
    dataIndex: 'sloc',
    fixed: 'left',
    sorter: true,
  },
  // addColumn({
  //   title: 'SLoc',
  //   dataIndex: 'sloc',
  //   fixed: true,
  //   sorter: true,
  // }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch',
    fixed: true,
    // width: 950,
  }),
  addColumn({
    title: 'Material',
    dataIndex: 'material',
    fixed: true,
  }),
  addColumn({
    title: 'Large',
    dataIndex: 'large',
  }),
  addColumn({
    title: 'Middle',
    dataIndex: 'middle',
  }),
  addColumn({
    title: 'Small',
    dataIndex: 'small',
  }),
  addColumn({
    title: 'Total in Small',
    dataIndex: 'total_in_small',
  }),
  addColumn({
    title: 'Total in Large',
    dataIndex: 'total_in_large',
  }),
]
