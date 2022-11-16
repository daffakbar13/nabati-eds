import React from 'react'
import { Text } from 'pink-lava-ui'
import { InputNumber, Input } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { CommonSelectValue } from 'src/configs/commonTypes'
import { fakeApi } from 'src/api/fakeApi'

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
    inputNode: <DebounceSelect allowClear type='select' fetchOptions={fakeApi} />,
    render: (obj: CommonSelectValue) => obj?.label,
  },
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Qty
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
        UoM
      </Text>
    ),
    dataIndex: 'uom',
    key: 'uom',
    editable: true,
    inputNode: <DebounceSelect allowClear type='select' fetchOptions={fakeApi} />,
    render: (obj: CommonSelectValue) => obj?.label,
  },
  {
    title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Batch
      </Text>
    ),
    dataIndex: 'batch',
    key: 'batch',
    editable: true,
    inputNode: <Input type="text" />,
  },
]
