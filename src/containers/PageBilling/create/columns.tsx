import { Text } from 'pink-lava-ui'

export const columns = () => [
    {
        title: '',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: (
            <Text variant="headingRegular" style={{ fontWeight: 600 }}>
                Item
            </Text>
        ),
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: (
            <Text variant="headingRegular" style={{ fontWeight: 600 }}>
                Uom
            </Text>
        ),
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: (
            <Text variant="headingRegular" style={{ fontWeight: 600 }}>
                Quantity
            </Text>
        ),
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: (
            <Text variant="headingRegular" style={{ fontWeight: 600 }}>
                Base Price
            </Text>
        ),
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: (
            <Text variant="headingRegular" style={{ fontWeight: 600 }}>
                Gross
            </Text>
        ),
        dataIndex: 'item',
        key: 'item',
    },
]
