/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
import { MoreOutlined } from '@ant-design/icons'
import { Checkbox, Divider, Popover } from 'antd'
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
  const [totalPage, setTotalPage] = React.useState(0)
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [selected, setSelected] = React.useState([])
  const [hiddenColumns, setHiddenColumns] = React.useState([])
  const isHaveCheckbox = (key: string) =>
    haveCheckbox !== 'All' && !haveCheckbox.member.includes(key)

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

  const handleSelected = (newData: object[]) => {
    setSelected(newData)
  }

  const defineRowSelection = {
    selectedRowKeys: selected,
    onChange: (selectedRowKeys) => {
      setSelected(selectedRowKeys)
    },
    ...(haveCheckbox !== 'All' && {
      getCheckboxProps: (record) => ({
        style: { ...(isHaveCheckbox(record[haveCheckbox.headCell]) && { display: 'none' }) },
        disabled: isHaveCheckbox(record[haveCheckbox.headCell]),
        // Column configuration not to be checked
        name: record[haveCheckbox.headCell],
      }),
    }),
    fixed: 'left',
    preserveSelectedRowKeys: true,
  }

  const HideShowColumns = () => {
    const content = (
      <div style={{ fontWeight: 'bold' }}>
        <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>Hide/Show Columns</h4>
        <Divider style={{ margin: '10px 0' }} />
        {props.columns.map(({ title }, index) => (
          <div key={index} style={{ display: 'flex', gap: 10 }}>
            <Checkbox
              defaultChecked={!hiddenColumns.includes(title)}
              onChange={(event) => {
                handleHideShowColumns(event.target, title)
              }}
            />
            {title}
          </div>
        ))}
        <Divider style={{ margin: '10px 0' }} />
        <h4
          onClick={handleResetHideShowColumns}
          style={{ fontWeight: 'bold', textAlign: 'center', cursor: 'pointer', color: '#EB008B' }}
        >
          Reset
        </h4>
      </div>
    )
    return (
      <Popover placement="bottomRight" content={content} trigger="click">
        <MoreOutlined style={{ cursor: 'pointer' }} />
      </Popover>
    )
  }
  const [columns, setColumns] = React.useState([
    ...props.columns,
    { title: <HideShowColumns />, fixed: 'right', width: 50 },
  ])

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
            setTotalPage(response.data.total_page)
          })
          .catch((_) => updateData([]))
      }
    }

    getApi()
  }, [body])

  React.useEffect(() => {
    setColumns(props.columns.filter((e) => !hiddenColumns.includes(e.title)))
    setColumns((old) => [...old, { title: <HideShowColumns />, fixed: 'right', width: 50 }])
  }, [hiddenColumns, props.columns])

  React.useEffect(() => {
    setRowSelection(defineRowSelection)
  }, [selected])

  return {
    data,
    total,
    totalPage,
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
    handleSelected,
  }
}
