import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'

export const StockRealTimeColumns = [
  {
    title: 'Branch',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Branch',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Sloc',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Material',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Large',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Middle',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Small',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Total',
    ...dataIndexWithSorter('branch_id'),
  },
]
