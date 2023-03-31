import React from 'react'
import { Table, Button } from 'pink-lava-ui'
import { Row, Typography } from 'antd'
import Total from 'src/components/Total'
import { concatString } from 'src/utils/concatString'
import { useTableProduct } from './hooks'
import Popup from '../Popup'

interface TableProductProps {
  TableProps: ReturnType<typeof useTableProduct>
  hideData?: boolean
  withDiscount?: boolean
  withItemCategory?: boolean
}

export default function TableProduct(props: TableProductProps) {
  const {
    TableProps: {
      state: { data, columns, isLoading, confirmRemove },
      handler: { addItem, handleDeleteRows, unShowConfirmRemove },
    },
    hideData,
    withDiscount,
    withItemCategory,
  } = props
  const subTotal = data.map((d) => d.sub_total).reduce((prev, curr) => prev + curr)

  function configColumns() {
    if (!withDiscount && !withItemCategory) {
      return columns.filter((c) => c.dataIndex !== 'discount' && c.dataIndex !== 'item_category')
    }
    if (!withDiscount) {
      return columns.filter((c) => c.dataIndex !== 'discount')
    }
    if (!withItemCategory) {
      return columns.filter((c) => c.dataIndex !== 'item_category')
    }
    return columns
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ overflow: 'scroll' }}>
        <Table
          data={hideData ? [] : data}
          columns={configColumns()}
          loading={isLoading}
          scroll={{ x: 'max-content' }}
        />
      </div>
      {!hideData && (
        <Row>
          <Button size="small" variant="tertiary" onClick={() => addItem()}>
            + Add Item
          </Button>
        </Row>
      )}
      <div style={{ justifyContent: 'end' }}>
        <Total label="Total Amount" value={subTotal.toLocaleString()} />
      </div>
      {confirmRemove && (
        <Popup>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Confirm Delete
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
            Are you sure to delete {concatString(confirmRemove.product_id, confirmRemove.name)} at
            rows {confirmRemove.index + 1} ?
          </Typography.Title>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="secondary"
              onClick={() => {
                unShowConfirmRemove()
              }}
            >
              No
            </Button>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="primary"
              onClick={() => {
                handleDeleteRows(confirmRemove.index, true)
              }}
            >
              Yes
            </Button>
          </div>
        </Popup>
      )}
    </div>
  )
}
