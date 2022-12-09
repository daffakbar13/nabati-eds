/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { addColumn } from 'src/utils/createColumns'
import { baseHandler, baseReducer } from './states'
import { StateType } from './states/state'

interface HaveCheckBoxType {
  rowKey: string
  member: string[]
}

interface useTableProps {
  funcApi?: (body: any) => Promise<any>
  haveCheckBox?: HaveCheckBoxType | 'All'
  columns: any[]
  data?: any[]
  removeHideShowColums?: boolean
}

export default function useTable(props: useTableProps) {
  const { haveCheckBox, columns, data, funcApi, removeHideShowColums } = props
  const initialValue: StateType = {
    body: {
      filters: [],
      limit: 20,
      page: 1,
    },
    columns,
    columnsAreSetted: columns,
    data: data || [],
    hiddenColumns: [],
    loading: false,
    rowSelection: {},
    selected: [],
    total: 0,
    totalPage: 0,
  }
  const [state, dispatch] = React.useReducer(baseReducer, initialValue)
  const handler = baseHandler(state, dispatch)
  console.log('col', columns)

  React.useEffect(() => {
    handler.getApi(funcApi)
  }, [state.body])

  React.useEffect(() => {
    handler.handleDefineTableProps(haveCheckBox, removeHideShowColums, columns)
    handler.handleDefineDescription()
  }, [state.loading, state.data, state.hiddenColumns, state.rowSelection])

  React.useEffect(() => {
    handler.handleRowSelection(haveCheckBox)
  }, [state.selected])

  React.useEffect(() => {
    handler.handleDefinePaginationProps()
  }, [state.total, state.totalPage])

  React.useEffect(() => {
    handler.handleTightColumns(columns)
  }, [state.columns])

  console.log(state.tableProps)

  return { state, handler }
}

useTable.addColum = addColumn
