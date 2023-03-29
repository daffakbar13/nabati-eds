import React from 'react'
import { Row } from 'antd'
import { Button, Table } from 'pink-lava-ui'
import Total from 'src/components/Total'
import { payloadCreate } from '..'
import { useTableProduct } from '../columns'
import { ICPlusWhite } from 'src/assets'

interface SectionTableProps {
  dataForm: payloadCreate
  tableProduct: ReturnType<typeof useTableProduct>
}

export default function SectionTable(props: SectionTableProps) {
  const { dataForm, tableProduct } = props

  return (
    <>
      <Row style={{ overflow: 'scroll' }}>
        <Table
          data={dataForm.sold_to_customer && tableProduct.data}
          columns={tableProduct.columns}
        />
      </Row>
      {dataForm.sold_to_customer && (
        // <Button size="small" variant="primary" onClick={tableProduct.handleAddItem}>
        //   Add Item
        // </Button>
        <Button
          size="big"
          variant="primary"
          onClick={tableProduct.handleAddItem}
          style={{ margin: '32px 0 20px', border: 'transparent' }}
        >
          <ICPlusWhite /> Add New
        </Button>
      )}
      <Row justify="end">
        <Total label="Total Amount" value={tableProduct.total_amount.toLocaleString()} />
      </Row>
    </>
  )
}
