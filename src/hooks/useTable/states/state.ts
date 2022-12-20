import React from 'react'
import { CommonListParams } from 'src/api/types'

export interface StateType {
  data?: any[]
  columns?: any[]
  columnsAreSetted?: any[]
  body?: CommonListParams
  page?: number
  limit?: number
  total?: number
  totalPage?: number
  rowSelection?: any
  loading?: boolean
  selected?: string[]
  hiddenColumns?: number[]
  description?: { text: string; content: React.ReactNode }
  tableProps?: any
  paginationProps?: any
}
