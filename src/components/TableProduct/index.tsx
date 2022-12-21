import React from 'react'
import { Table, Button } from 'pink-lava-ui'
import { Row } from 'antd'
import Total from 'src/components/Total'
import { useTableProduct } from './hooks'

interface TableProductProps {
  state: ReturnType<typeof useTableProduct>['state']
  handler: ReturnType<typeof useTableProduct>['handler']
  hideData?: boolean
}

export default function TableProduct(props: TableProductProps) {
  const {
    handler: { addItem },
    state: { data, columns, isLoading },
    hideData,
  } = props
  const subTotal = data.map((d) => d.sub_total).reduce((prev, curr) => prev + curr)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {!hideData && (
        <Row>
          <Button size="small" variant="tertiary" onClick={() => addItem()}>
            + Add Item
          </Button>
        </Row>
      )}
      <div style={{ overflow: 'scroll' }}>
        <Table
          data={hideData ? [] : data}
          columns={columns}
          loading={isLoading}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <div style={{ justifyContent: 'end' }}>
        <Total label="Total Amount" value={subTotal.toLocaleString()} />
      </div>
    </div>
  )
}
