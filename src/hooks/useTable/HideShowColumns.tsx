import { MoreOutlined } from '@ant-design/icons'
import { Checkbox, Divider, Popover } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import useTable from '.'
import { baseHandler } from './states'
import { StateType } from './states/state'

interface HideShowColumnsProps {
  columns: Parameters<typeof useTable>['0']['columns']
  hiddenColumns: StateType['hiddenColumns']
  handleHideShowColumns: ReturnType<typeof baseHandler>['handleHideShowColumns']
  handleResetHideShowColumns: ReturnType<typeof baseHandler>['handleResetHideShowColumns']
}

export default function HideShowColumns(props: HideShowColumnsProps) {
  const { columns, hiddenColumns, handleHideShowColumns, handleResetHideShowColumns } = props
  const content = (
    <div style={{ fontWeight: 'bold' }}>
      <h4 style={{ fontWeight: 'bold' }}>Hide/Show Columns</h4>
      <Divider style={{ margin: '10px 0' }} />
      {columns.map(({ title }, index) => (
        <div key={index} style={{ display: 'flex', gap: 10 }}>
          <Checkbox
            checked={!hiddenColumns.includes(index)}
            onChange={(event) => {
              handleHideShowColumns(event.target, index)
            }}
          />
          {title}
        </div>
      ))}
      <Divider style={{ margin: '10px 0' }} />
      <h4
        onClick={() => handleResetHideShowColumns()}
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
