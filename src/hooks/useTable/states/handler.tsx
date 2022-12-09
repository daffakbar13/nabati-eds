/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-globals */
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { CommonListParams } from 'src/api/types'
import useTable from '..'
import HideShowColumns from '../HideShowColumns'
import { DispatchType } from './reducer'
import { StateType } from './state'

export function baseHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
  function updateData(payload: any[]) {
    let result: any[]
    if (Array.isArray(payload) && payload.length > 0) {
      result = payload
    } else {
      result = []
    }
    dispatch({
      type: 'data',
      payload: result,
    })
    dispatch({
      type: 'loading',
      payload: false,
    })
  }
  function handleTightColumns(columns: Parameters<typeof useTable>['0']['columns']) {
    function getWidth(id: string) {
      return document.getElementById(id)?.clientWidth
    }
    function canSetWidth(props: any) {
      return props?.id && getWidth(props.id)
    }
    function result(col: typeof columns) {
      return col.map((obj) => ({
        ...obj,
        ...(canSetWidth(obj.title.props) && {
          width: getWidth(obj.title.props.id) + 32 + (obj.sorter ? 20 : 0),
        }),
        ...(obj.children && { children: result(obj.children) }),
      }))
    }

    if (Array.isArray(state.data) && state.columns.find((e) => e.width === 0)) {
      dispatch({
        type: 'columnsAreSetted',
        payload: result(columns),
      })
      dispatch({
        type: 'columns',
        payload: result(state.columnsAreSetted),
      })
    }
  }
  function handleHideShowColumns(target: CheckboxChangeEvent['target'], index: number) {
    const arr = [...state.hiddenColumns]
    if (target.checked) {
      arr.splice(arr.indexOf(index), 1)
    } else {
      arr.push(index)
    }
    dispatch({
      type: 'hiddenColumns',
      payload: arr,
    })
    dispatch({
      type: 'columns',
      payload: state.columnsAreSetted.filter((_, i) => !arr.includes(i)),
    })
  }
  function handleResetHideShowColumns() {
    dispatch({
      type: 'columns',
      payload: state.columnsAreSetted,
    })
    dispatch({
      type: 'hiddenColumns',
      payload: [],
    })
  }
  function handlePagination(page: number, limit: number) {
    dispatch({
      type: 'body',
      payload: { ...state.body, page, limit },
    })
  }
  function handleFilter(filters: CommonListParams['filters']) {
    dispatch({
      type: 'body',
      payload: { ...state.body, filters, page: 1 },
    })
  }
  function handleSelected(payload: string[]) {
    dispatch({
      type: 'selected',
      payload,
    })
  }
  function handleRowSelection(haveCheckBox?: Parameters<typeof useTable>['0']['haveCheckBox']) {
    function isHaveCheckbox(key: string) {
      return haveCheckBox !== 'All' && !haveCheckBox.member.includes(key)
    }
    if (haveCheckBox) {
      const defineRowSelection = {
        selectedRowKeys: state.selected,
        onChange: (selectedRowKeys) => {
          handleSelected(selectedRowKeys)
        },
        ...(haveCheckBox !== 'All' && {
          getCheckboxProps: (record) => ({
            style: { ...(isHaveCheckbox(record[haveCheckBox.rowKey]) && { display: 'none' }) },
            disabled: isHaveCheckbox(record[haveCheckBox.rowKey]),
            name: record[haveCheckBox.rowKey],
          }),
        }),
        fixed: 'left',
        preserveSelectedRowKeys: true,
      }
      dispatch({
        type: 'rowSelection',
        payload: defineRowSelection,
      })
    }
  }
  function handleLoading(payload: boolean) {
    dispatch({
      type: 'loading',
      payload,
    })
  }
  function handleTotal(payload: number) {
    dispatch({
      type: 'total',
      payload,
    })
  }
  function handleTotalPage(payload: number) {
    dispatch({
      type: 'totalPage',
      payload,
    })
  }
  function handleColumns(payload: any[]) {
    dispatch({
      type: 'columns',
      payload,
    })
  }
  function handleDefineDescription() {
    const isOneSelected = state.selected.length === 1
    const firstSelected = state.selected[0]
    const result = {
      text: isOneSelected ? firstSelected : `${firstSelected}, +${state.selected.length - 1} more`,
      content: <div style={{ textAlign: 'center' }}>{state.selected.join(', ')}</div>,
    }

    dispatch({
      type: 'description',
      payload: result,
    })
  }
  function handleDefineTableProps(
    haveCheckBox: Parameters<typeof useTable>['0']['haveCheckBox'],
    removeHideShowColums: Parameters<typeof useTable>['0']['removeHideShowColums'],
    columns: Parameters<typeof useTable>['0']['columns'],
  ) {
    const hideShowColumnsToggle = {
      title: (
        <HideShowColumns
          columns={columns}
          handleHideShowColumns={handleHideShowColumns}
          handleResetHideShowColumns={handleResetHideShowColumns}
          hiddenColumns={state.hiddenColumns}
        />
      ),
      fixed: 'right',
      width: 50,
    }
    function defineColumns() {
      const result = [...state.columns]
      if (!removeHideShowColums) {
        result.push(hideShowColumnsToggle)
      }
      return result
    }
    const result = {
      scroll: { x: 'max-content', y: 600 },
      loading: state.loading,
      columns: defineColumns(),
      dataSource: state.data,
      showSorterTooltip: false,
      ...(haveCheckBox && { rowSelection: state.rowSelection }),
    }
    dispatch({
      type: 'tableProps',
      payload: result,
    })
  }
  function handleDefinePaginationProps() {
    const result = {
      defaultPageSize: 20,
      pageSizeOptions: [20, 50, 100],
      total: state.total,
      totalPage: state.totalPage,
      onChange: (page, limit) => {
        handlePagination(page, limit)
      },
    }
    dispatch({
      type: 'paginationProps',
      payload: result,
    })
  }
  function getApi(funcApi?: Parameters<typeof useTable>['0']['funcApi']) {
    if (funcApi) {
      handleLoading(true)
      funcApi(state.body)
        .then((response) => response.data)
        .then((resdata) => {
          if (resdata.result) {
            updateData(resdata.result)
          } else {
            updateData(resdata.results)
          }
          handleTotal(resdata.total_rows)
          handleTotalPage(resdata.total_page)
        })
        .catch(() => updateData([]))
    }
  }
  return {
    updateData,
    handleHideShowColumns,
    handleResetHideShowColumns,
    handlePagination,
    handleFilter,
    handleSelected,
    handleRowSelection,
    handleLoading,
    handleTotal,
    handleTotalPage,
    handleColumns,
    handleTightColumns,
    handleDefineDescription,
    handleDefineTableProps,
    handleDefinePaginationProps,
    getApi,
  }
}
