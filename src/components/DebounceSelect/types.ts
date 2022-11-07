import type { SelectProps } from 'antd/es/select'
import React from 'react'

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>
  debounceTimeout?: number
  label?: React.ReactNode
  required?: boolean
}
