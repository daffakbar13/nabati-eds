import React from 'react'
import { Table, Button } from 'pink-lava-ui'
import { Row } from 'antd'
import Total from 'src/components/Total'
import { useTableProduct } from './hooks'

interface TableProductProps {
  TableProps: ReturnType<typeof useTableProduct>
  hideData?: boolean
  withDiscount?: boolean
}

export default function TableProduct(props: TableProductProps) {
  const {
    TableProps: {
      state: { data, columns, isLoading },
      handler: { addItem },
    },
    hideData,
    withDiscount,
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
          columns={!withDiscount ? columns.filter((c) => c.dataIndex !== 'discount') : columns}
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
