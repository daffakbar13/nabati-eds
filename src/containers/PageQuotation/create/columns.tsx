import React from 'react'
import { Text } from 'pink-lava-ui'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { CommonSelectValue } from 'src/configs/commonTypes'
import { fieldItem, fieldUom } from 'src/configs/fieldFetches'

export const columns = () => [
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Item
      </Text>
    ),
    dataIndex: 'product_id',
    key: 'product_id',
    editable: true,
    inputNode: <DebounceSelect allowClear fetchOptions={fieldItem} />,
    render: (obj: CommonSelectValue) => obj?.label,
  },
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Uom
      </Text>
    ),
    dataIndex: 'uom_id',
    key: 'uom_id',
    editable: true,
    inputNode: <DebounceSelect allowClear fetchOptions={fieldUom} />,
    render: (obj: CommonSelectValue) => obj?.label,
  },
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Quantity
      </Text>
    ),
    dataIndex: 'order_qty',
    key: 'order_qty',
    editable: true,
    inputNode: <InputNumber />,
  },
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Based Price
      </Text>
    ),
    dataIndex: 'price',
    key: 'price',
    editable: true,
    inputNode: <InputNumber />,
  },
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Sub Total
      </Text>
    ),
    dataIndex: 'sub_total',
    key: 'sub_total',
    editable: true,
    inputNode: <InputNumber />,
  },
]
