import React from 'react'
import { Table as TableAntd, Pagination } from 'antd'
import { TableProps } from './types'

export default function Table(props: TableProps) {
  const { withPagination, tableProps, paginationProps } = props

  return (
    <>
      <TableAntd {...tableProps} pagination={false} />
      {withPagination && <Pagination {...paginationProps} />}
    </>
  )
}
