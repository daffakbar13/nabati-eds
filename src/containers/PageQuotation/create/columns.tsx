import React from 'react'
import { Text } from 'pink-lava-ui'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { CommonSelectValue } from 'src/configs/commonTypes'
import { fieldItem, fieldPrice, fieldUom } from 'src/configs/fieldFetches'

export const useColumns = () => {
  const [basedPrice, setBasedPrice] = React.useState(0)
  const [price, setPrice] = React.useState(0)
  const [quantity, setQuantity] = React.useState(0)
  const [product, setProduct] = React.useState('')
  const [uom, setUom] = React.useState('')

  React.useEffect(() => {
    if (product !== '' && uom !== '') {
      fieldPrice(product, uom).then((val) => { if (!Number.isNaN(val)) setBasedPrice(val) })
    }
  }, [product, uom])

  React.useEffect(() => {
    setPrice(basedPrice * quantity)
  }, [basedPrice, price, quantity])

  return [
    {
      title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Item
      </Text>
      ),
      dataIndex: 'product_id',
      key: 'product_id',
      editable: true,
      inputNode: (
        <DebounceSelect
          allowClear
          fetchOptions={fieldItem}
          onChange={(val) => setProduct(val.value)} />
      ),
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
      inputNode: (
        <DebounceSelect
          allowClear
          disabled={product === ''}
          fetchOptions={(search) => fieldUom(search, product)}
          onChange={(val) => setUom(val.value)}
        />
      ),
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
      inputNode: <InputNumber min={1} onChange={(val: number) => setQuantity(val)} />,
    },
    {
      title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Based Price
      </Text>
      ),
      dataIndex: 'price',
      key: 'price',
      render: () => <InputNumber disabled value={basedPrice.toLocaleString() || 0} />,
    },
    {
      title: (
      <Text variant="headingRegular" style={{ fontWeight: 600 }}>
        Sub Total
      </Text>
      ),
      dataIndex: 'sub_total',
      key: 'sub_total',
      render: () => <InputNumber disabled value={price.toLocaleString() || 0} />,
    },
  ]
}