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

export const columns2 = () => [
    {
        title: 'Name',
        dataIndex: 'name',
        editable: true,
        inputNode: <DebounceSelect allowClear fetchOptions={fakeApi} />,
        render: (obj: CommonSelectValue) => obj.label,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
        inputNode: <InputNumber />,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: '40%',
        editable: true,
        inputNode: <Input />,
    },
]
