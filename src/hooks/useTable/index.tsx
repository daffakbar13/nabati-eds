/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useAppContext } from 'src/contexts'
import { addColumn } from 'src/utils/createColumns'
import { baseHandler, baseReducer } from './states'
import { StateType } from './states/state'

interface HaveCheckBoxType {
  rowKey: string
  member: string[]
}

interface useTableProps {
  // eslint-disable-next-line no-unused-vars
  funcApi?: (body: any) => Promise<any>
  haveCheckBox?: HaveCheckBoxType[] | 'All'
  columns: any[]
  data?: any[]
  removeHideShowColums?: boolean
}

export default function useTable(props: useTableProps) {
  const { haveCheckBox, columns, data, funcApi, removeHideShowColums } = props
  const app = useAppContext()
  const isValueFromPrev = app.state.isRequestPrevious && app.state.readyFor === funcApi?.name
  const defaultBody = {
    filters: [],
    limit: 20,
    page: 1,
  }
  const initialValue: StateType = {
    body: isValueFromPrev ? app.state.table_log : defaultBody,
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

  React.useEffect(() => {
    handler.getApi(funcApi)
    handler.handleSaveTableLog(funcApi, app)
  }, [state.body])

  React.useEffect(() => {
    handler.handleDefineTableProps(haveCheckBox, removeHideShowColums, columns)
    handler.handleDefineDescription()
  }, [state.body, state.loading, state.data, state.hiddenColumns, state.rowSelection])

  React.useEffect(() => {
    handler.handleRowSelection(haveCheckBox)
  }, [state.selected])

  React.useEffect(() => {
    handler.handleDefinePaginationProps()
  }, [state.page, state.limit, state.total, state.totalPage])

  React.useEffect(() => {
    handler.handleTightColumns(columns)
  }, [state.columns])

  return { state, handler }
}

useTable.addColum = addColumn
