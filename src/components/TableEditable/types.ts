import React from 'react'
import { antdColumns } from 'src/configs/commonTypes'

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  record: object
  index: number
  children: React.ReactNode
  inputNode?: React.ReactNode
}

export interface TableEditableProps {
  columns: antdColumns[]
  data: object[]
  setData: (a) => void
}

export interface recordType {
  key: React.Key
}
