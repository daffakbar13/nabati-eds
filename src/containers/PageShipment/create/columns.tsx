/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React from 'react'
import { Text } from 'pink-lava-ui'
import { InputNumber, Row } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { CommonSelectValue } from 'src/configs/commonTypes'
import { fakeApi } from 'src/api/fakeApi'
import CreateColumns from 'src/utils/createColumns'
import TaggedStatus from 'src/components/TaggedStatus'
import { MinusCircleFilled } from '@ant-design/icons'
import dateFormat from 'src/utils/dateFormat'

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
  CreateColumns(
    'Delivery Order ',
    'delivery_order_id',
    true,
    undefined,
    170,
    true,
    'have-checkbox',
  ),
  CreateColumns(
    'Create Date',
    'order_date',
    false,
    (date) => dateFormat(date, 'DD MMMM YYYY'),
    120,
  ),
  CreateColumns('Order Type', 'order_type', false, undefined, 200),
  CreateColumns('Ship To Customer', 'ship_to_customer', false, undefined, 250),
  CreateColumns('Salesman', 'salesman_id', false, undefined, 200),
  CreateColumns('Route', '', false, undefined, 120),
  CreateColumns('Status', 'status_name', false, (status) => <TaggedStatus status={status} />),
  CreateColumns('Size M', '', false, undefined, 120),
  CreateColumns('Missing Size M', '', false, undefined, 200),
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
