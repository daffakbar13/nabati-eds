import React from 'react'

export interface CommonSelectValue {
  label?: string
  value?: string
  key?: string
}

export interface antdColumns {
  title: React.ReactNode
  dataIndex: string
  editable?: boolean
  render?: any
  inputNode?: React.ReactNode
  onCell?: any
  width?: number | string
}
