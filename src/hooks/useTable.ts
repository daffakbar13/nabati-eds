import React from 'react'

interface haveCheckBox {
  headCell: string
  member: string[]
}

interface useTableProps {
  api: string,
  haveCheckbox?: haveCheckBox | 'All',
  columns: any[]
}

export default function useTable(props: useTableProps) {
  const { api, haveCheckbox } = props
  const [data, setData] = React.useState([])
  const [columns, setColumns] = React.useState(props.columns)
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [selected, setSelected] = React.useState([])
  const [hiddenColumns, setHiddenColumns] = React.useState([])
  const isHaveCheckbox = (key: string) => haveCheckbox !== 'All' && !haveCheckbox.member.includes(key)

  const updateData = (newData: any[]) => {
    setLoading(true)
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

  const defineRowSelection = {
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
    fixed: true,
    preserveSelectedRowKeys: true,
  };

  React.useEffect(() => {
    if (haveCheckbox) { setRowSelection(defineRowSelection) }
    async function getApi() {
      fetch(api)
        .then((response) => response.json())
        .then((result) => updateData(result.data.result))
        .catch((_) => updateData([]))
    }

    getApi()
  }, [])

  React.useEffect(() => {
    setColumns(props.columns.filter((e) => !hiddenColumns.includes(e.title)))
  }, [hiddenColumns, props.columns])

  return {
    data,
    selected,
    rowSelection,
    loading,
    updateData,
    hiddenColumns,
    handleHideShowColumns,
    columns,
    handleResetHideShowColumns,
  }
}
