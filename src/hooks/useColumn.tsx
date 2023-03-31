import { MoreOutlined } from '@ant-design/icons'
import { Checkbox, Divider, Popover } from 'antd'
import React from 'react'

export default function useColumn(
  columns: any[],
  data: any[],
  withHideShowColumns: boolean = false,
) {
  const [result, setResult] = React.useState([])
  const [hiddenColumns, setHiddenColumns] = React.useState([])
  function handleHideShowColumns(event, newData: any) {
    if (event.checked) {
      setHiddenColumns(hiddenColumns.filter((e) => e !== newData))
    } else {
      setHiddenColumns([...hiddenColumns, newData])
    }
  }

  function handleResetHideShowColumns() {
    setHiddenColumns([])
  }

  function getWidth(id: string, sorter: boolean) {
    return document.getElementById(id)?.clientWidth + 32 + (sorter ? 20 : 0)
  }

  function format() {
    return columns.map((obj) => ({
      ...obj,
      ...(obj.title.props.id && { width: getWidth(obj.title.props.id, obj.sorter) }),
    }))
  }

  function HideShowColumns() {
    const content = (
      <div style={{ fontWeight: 'bold' }}>
        <h4 style={{ fontWeight: 'bold' }}>Hide/Show Columns</h4>
        <Divider style={{ margin: '10px 0' }} />
        {columns.map(({ title }, index) => (
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

  React.useEffect(() => {
    setResult(format())
  }, [data])

  return result
}
