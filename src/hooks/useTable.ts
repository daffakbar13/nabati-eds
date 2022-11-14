/* eslint-disable no-unused-expressions */
import React from 'react'
import { CommonListParams } from 'src/api/types'

interface haveCheckBox {
  headCell: string
  member: string[]
}

interface useTableProps {
  funcApi?: (body: any) => Promise<any>
  haveCheckbox?: haveCheckBox | 'All'
  columns: any[]
}

export default function useTable(props: useTableProps) {
  const { haveCheckbox, funcApi } = props
  const [data, setData] = React.useState([])
  const [body, setBody] = React.useState({
    filters: [],
    limit: 20,
    page: 1,
  })
  const [total, setTotal] = React.useState(0)
  const [columns, setColumns] = React.useState(props.columns)
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [selected, setSelected] = React.useState([])
  const [hiddenColumns, setHiddenColumns] = React.useState([])
  const isHaveCheckbox = (key: string) => haveCheckbox !== 'All' && !haveCheckbox.member.includes(key)

  const updateData = (newData: any[]) => {
    setData([])
    setData(newData)
    setLoading(false)
  }

  const handleHideShowColumns = (event, newData: any) => {
    // eslint-disable-next-line no-unused-expressions
    event.checked
      ? setHiddenColumns(hiddenColumns.filter((e) => e !== newData))
      : setHiddenColumns([...hiddenColumns, newData])
  }

  const handleResetHideShowColumns = () => {
    setHiddenColumns([])
  }

  const handlePagination = (page: number, limit: number) => {
    setBody((current) => ({ ...current, page, limit }))
  }

  const handleFilter = (newBody: any[]) => {
    setBody((current) => ({ ...current, filters: newBody, page: 1 }))
  }

  const defineRowSelection = {
    onChange: (selectedRowKeys) => {
      setSelected(selectedRowKeys)
    },
    ...(haveCheckbox !== 'All' && {
      getCheckboxProps: (record) => ({
        style: { ...(isHaveCheckbox(record[haveCheckbox.headCell]) && { display: 'none' }), p: 5 },
        disabled: isHaveCheckbox(record[haveCheckbox.headCell]),
        // Column configuration not to be checked
        name: record[haveCheckbox.headCell],
      }),
    }),
    fixed: 'left',
  }

  React.useEffect(() => {
    if (haveCheckbox) {
      setRowSelection(defineRowSelection)
    }
    async function getApi() {
      if (funcApi) {
        setLoading(true)
        funcApi(body)
          .then((response) => {
            response.data.result
              ? updateData(response.data.result)
              : updateData(response.data.results)
            setTotal(response.data.total_rows)
          })
          .catch((_) => updateData([]))
      }
    }

    getApi()
  }, [body])

  React.useEffect(() => {
    setColumns(props.columns.filter((e) => !hiddenColumns.includes(e.title)))
  }, [hiddenColumns, props.columns])

  return {
    data,
    total,
    selected,
    rowSelection,
    loading,
    updateData,
    hiddenColumns,
    handleHideShowColumns,
    columns,
    handleResetHideShowColumns,
    handlePagination,
    handleFilter,
  }
}
