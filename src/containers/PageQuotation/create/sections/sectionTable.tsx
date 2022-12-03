import React from 'react'
import { Row } from 'antd'
import { Button, Table } from 'pink-lava-ui'
import Total from 'src/components/Total'
import { payloadCreate } from '..'
import { useTableProduct } from '../columns'

interface SectionTableProps {
  dataForm: payloadCreate
  tableProduct: ReturnType<typeof useTableProduct>
}

export default function SectionTable(props: SectionTableProps) {
  const { dataForm, tableProduct } = props

  return (
    <>
      <Row style={{ overflow: 'scroll' }}>
        <Table data={dataForm.customer_id && tableProduct.data} columns={tableProduct.columns} />
      </Row>
      {dataForm.customer_id && (
        <Button size="small" variant="primary" onClick={tableProduct.handleAddItem}>
          Add Item
        </Button>
      )}
      <Row justify="end">
        <Total label="Total Amount" value={tableProduct.total_amount.toLocaleString()} />
      </Row>
    </>
  )
}
