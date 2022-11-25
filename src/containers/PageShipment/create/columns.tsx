/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React from 'react'
import { Text } from 'pink-lava-ui'
import { InputNumber, Row } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { CommonSelectValue } from 'src/configs/commonTypes'
import { fakeApi } from 'src/api/fakeApi'

/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import TaggedStatus from 'src/components/TaggedStatus'
import { MinusCircleFilled } from '@ant-design/icons'

export const columns = () => [
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Item
      </Text>
    ),
    dataIndex: 'item',
    key: 'item',
    editable: true,
    inputNode: <DebounceSelect allowClear fetchOptions={fakeApi} />,
    render: (obj: CommonSelectValue) => obj?.label,
  },
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Uom
      </Text>
    ),
    dataIndex: 'uom',
    key: 'uom',
    editable: true,
    inputNode: <DebounceSelect allowClear fetchOptions={fakeApi} />,
    render: (obj: CommonSelectValue) => obj?.label,
  },
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Quantity
      </Text>
    ),
    dataIndex: 'qty',
    key: 'qty',
    editable: true,
    inputNode: <InputNumber />,
  },
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Base Price
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
        Gross
      </Text>
    ),
    dataIndex: 'gross',
    key: 'gross',
    editable: true,
    inputNode: <InputNumber />,
  },
]

export const ColumnsDeliveryOrder = [
  CreateColumns('Delivery Order ', 'id', true, undefined, 170, true, 'have-checkbox'),
  CreateColumns('Order Type', 'order_type', false, undefined, 200),
  CreateColumns('Order Date', 'order_date', false, undefined, 120),
  CreateColumns('Sales Org.', 'sales_org_id', false, undefined, 110),
  CreateColumns('Branch', 'branch_id', false, undefined, 90),
  CreateColumns('Sold To Customer', 'sold_to_customer', false, undefined, 250),
  CreateColumns('Ship To Customer', 'ship_to_customer', false, undefined, 250),
  CreateColumns('Salesman', 'salesman_id', false, undefined, 360),
  CreateColumns(
    'Total Amount',
    'total_amount',
    false,
    (total_amount) => parseInt(total_amount).toLocaleString(),
    140,
  ),
  CreateColumns('Create From', 'create_from', false, undefined, 125),
  CreateColumns(
    'Availibility',
    'availablity',
    false,
    (availablity) => <TaggedStatus status={availablity} />,
    115,
  ),
  CreateColumns('Status', 'status_name', false, (status) => <TaggedStatus status={status} />),
  CreateColumns('Status Process', 'status_process', false, undefined, 190),
]

export const ColumnsSelectedDeliveryOrder = (handleReduceItem: (removedItem) => void) => [
  CreateColumns('No', '', false, (_, __, index) => ++index, 55),
  CreateColumns('Delivery Order ', 'id'),
  CreateColumns('Sales Org.', 'sales_org_id', false, (val, { id }) => (
    <Row justify="space-between">
      {val}
      <MinusCircleFilled
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => handleReduceItem(id)}
      />
    </Row>
  )),
]
