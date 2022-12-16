/* eslint-disable camelcase */
import { MinusCircleFilled } from '@ant-design/icons'
import { Input, InputNumber } from 'antd'
import React from 'react'
import DebounceSelect from 'src/components/DebounceSelect'
import { concatString } from 'src/utils/concatString'
import { addColumn } from 'src/utils/createColumns'
import { useTableProductStates } from './states/useTableProductStates'

const styleInputNumber = {
  border: '1px solid #AAAAAA',
  borderRadius: 8,
  height: 46,
  minHeight: 46,
  display: 'flex',
  alignItems: 'center',
}

const styleDisabledInput: React.CSSProperties = {
  ...styleInputNumber,
  flexDirection: 'row-reverse',
  backgroundColor: '#F4F4F4F4',
  padding: 10,
}

export function useTableProduct() {
  const {
    state: { data },
    handler: {
      bookingProduct,
      getAllProduct,
      getOptionsUom,
      fieldListProduct,
      handleChangeQty,
      handleChangeRemarks,
      handleDeleteRows,
    },
  } = useTableProductStates()
  const [focus, setFocus] = React.useState('')
  // const columns =

  React.useEffect(() => {
    getAllProduct()
  }, [])

  return {
    data,
    columns: [
      addColumn({
        render: (_, __, index) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MinusCircleFilled
              style={{ color: 'red', margin: 'auto' }}
              onClick={() => {
                handleDeleteRows(index)
              }}
            />
          </div>
        ),
        width: 55,
        fixed: true,
      }),
      addColumn({
        title: 'Item',
        dataIndex: 'product_id',
        render: (_, { product_id, name }, index) => (
          <DebounceSelect
            type="select"
            value={concatString(product_id, name) as any}
            fetchOptions={fieldListProduct}
            onClick={() => setFocus('')}
            onChange={(e) => {
              bookingProduct(e.value, index)
            }}
          />
        ),
        width: 550,
      }),
      addColumn({
        title: 'Uom',
        dataIndex: 'uom_id',
        render: (uom_id, __, index) => (
          <DebounceSelect
            type="select"
            value={uom_id as any}
            options={getOptionsUom(index)}
            // disabled={isNullProductId(index)}
            // onChange={(e) => {
            //   handleChangeData('uom_id', e.value, index)
            //   setFetching('uom')
            // }}
          />
        ),
        width: 150,
      }),
      addColumn({
        title: 'Quantity',
        dataIndex: 'order_qty',
        render: (_, { product_id, order_qty, price }, index) => (
          <InputNumber
            disabled={product_id === ''}
            min={product_id === '' ? '0' : '1'}
            // onClick={() => setFocus(`order-qty-${index}`)}
            // autoFocus={focus === `order-qty-${index}`}
            value={order_qty?.toLocaleString()}
            // value={data[index].order_qty}
            onChange={(newVal) => {
              // setFocus(`order-qty-${index}`)
              handleChangeQty(newVal, index)
            }}
            style={styleInputNumber}
          />
        ),
        width: 130,
      }),
      addColumn({
        title: 'Based Price',
        dataIndex: 'price',
        render: (price) => <div style={styleDisabledInput}>{price?.toLocaleString()}</div>,
        width: 130,
      }),
      addColumn({
        title: 'Sub Total',
        dataIndex: 'sub_total',
        render: (sub_total) => (
          <Input.TextArea
            style={{ ...styleInputNumber, padding: '10px', textAlign: 'right' }}
            rows={1}
            autoSize={{ minRows: 1 }}
            value={sub_total?.toLocaleString()}
            disabled
            // onChange={(e) => {
            //   handleChangeData('remarks', e.target.value, index)
            // }}
          />
        ),
        width: 130,
      }),
      addColumn({
        title: 'Remarks',
        dataIndex: 'remarks',
        render: (remarks, _, index) => (
          <Input.TextArea
            style={{ ...styleInputNumber, padding: '10px' }}
            rows={1}
            autoSize={{ minRows: 1 }}
            // onClick={() => setFocus(`remarks-${index}`)}
            // autoFocus={focus === `remarks-${index}`}
            value={remarks}
            onChange={(e) => {
              handleChangeRemarks(e.target.value, index)
            }}
          />
        ),
        width: 200,
      }),
    ],
  }
}
