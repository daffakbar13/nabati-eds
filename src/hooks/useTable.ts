/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
import { useRouter } from 'next/router'
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
  const [defaultPage, setDefaultPage] = React.useState(1)
  const [defaultLimit, setDefaultLimit] = React.useState(20)
  const [columns, setColumns] = React.useState(props.columns)
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [selected, setSelected] = React.useState([])
  const [hiddenColumns, setHiddenColumns] = React.useState([])
  const isHaveCheckbox = (key: string) => haveCheckbox !== 'All' && !haveCheckbox.member.includes(key)
  const router = useRouter()

  const updateData = (newData: any[]) => {
    setData([])
    setData(newData)
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
    setLoading(true)
    if (haveCheckbox) {
      setRowSelection(defineRowSelection)
    }
    funcApi(body)
      .then((res) => res.data)
      .then((datas) => {
        updateData(datas.results.map((obj) => ({
          ...obj,
          page: datas.current_page,
          limit: datas.limit_per_page,
        })))
        setTotal(datas.total_rows)
      })
      .then(() => setLoading(false))
      .catch((_) => updateData([]))
  }, [body])

  React.useEffect(() => {
    if (router.query.page && router.query.limit) {
      const { page, limit } = router.query as NodeJS.Dict<string>
      // setData([])
      setDefaultLimit(parseInt(limit))
      setDefaultPage(parseInt(page))
    }
  }, [router])

  React.useEffect(() => {
    // if (defaultPage > 0 && defaultLimit > 0) {
    setBody({
      filters: [],
      limit: defaultLimit,
      page: defaultPage,
    })
    // handlePagination(defaultPage, defaultLimit)
    // }
  }, [defaultPage, defaultLimit])

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
    defaultPage,
    defaultLimit,
    handleFilter,
  }
}
