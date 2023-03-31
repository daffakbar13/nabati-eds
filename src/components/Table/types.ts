import { PaginationProps, TableProps as TableAntdProps } from 'antd'

export interface TableProps {
  tableProps: TableAntdProps<any>
  paginationProps: PaginationProps
  withPagination?: boolean
}
