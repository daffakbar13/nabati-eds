/* eslint-disable camelcase */
import { MinusCircleFilled } from '@ant-design/icons'
import { Form, Input, InputNumber, InputRef } from 'antd'
import React from 'react'
import DebounceSelect from 'src/components/DebounceSelect'
import { EditableCellProps } from 'src/components/TableEditable/types'
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
  color: 'black',
  '::placeholder': { color: 'black' },
}

const styleDisabledInput: React.CSSProperties = {
  ...styleInputNumber,
  flexDirection: 'row-reverse',
  backgroundColor: '#F4F4F4F4',
  padding: 10,
}

export function useTableProduct() {
  const {
    state: { data, focus, isEdit },
    handler: {
      bookingProduct,
      getAllProduct,
      getOptionsUom,
      fieldListProduct,
      handleChangeQty,
      handleChangeRemarks,
      handleDeleteRows,
      handleChangeUom,
      isNullProduct,
      handleFocus,
      handleUnFocus,
      handleTyping,
      handleEdit,
    },
  } = useTableProductStates()
  const [width, setWidth] = React.useState(0)

  // const columns =
  // function isNullProduct(index: number) {
  //   const { product_id } = data[index]
  //   return ![...new Set(...allProduct.map((p) => p.product_id))].includes(product_id)
  // }

  // console.log([...new Set(allProduct.map((p) => p.product_id))])

  React.useEffect(() => {
    getAllProduct()
  }, [])

  React.useEffect(() => {
    const getWidth = Math.max(...data.map((d) => d.sub_total)).toString().length * 14
    setWidth(getWidth)
  }, [data])

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
            // onClick={() => setFocus('')}
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
            disabled={isNullProduct(index)}
            onChange={(e) => {
              handleChangeUom(e.value, index)
            }}
          />
        ),
        width: 150,
      }),
      addColumn({
        title: 'Quantity',
        dataIndex: 'order_qty',
        render: (_, { product_id, order_qty, price }, index) => (
          <InputNumber
            id={`order-qty-${index}`}
            disabled={isNullProduct(index)}
            controls={false}
            min={product_id === '' ? '0' : '1'}
            max={'999999'}
            value={data[index].order_qty as any}
            onBlur={(e) => {
              handleChangeQty(e.target.value, index)
            }}
            onPressEnter={(e) => {
              handleChangeQty(e.target.value, index)
            }}
            onClick={(e) => e.currentTarget.focus()}
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
            style={{
              ...styleInputNumber,
              padding: '10px',
              textAlign: 'right',
              minWidth: 80,
              width,
            }}
            rows={1}
            autoSize={{ minRows: 1 }}
            value={sub_total?.toLocaleString()}
            // value={width.toLocaleString()}
            disabled
            // onChange={(e) => {
            //   handleChangeData('remarks', e.target.value, index)
            // }}
          />
        ),
        width: 110,
      }),
      addColumn({
        title: 'Remarks',
        dataIndex: 'remarks',
        render: (remarks, _, index) => (
          <Input.TextArea
            style={{ ...styleInputNumber, padding: '10px' }}
            rows={1}
            autoSize={{ minRows: 1 }}
            id={`remarks-${index}`}
            placeholder={data[index].remarks}
            color="black"
            onBlur={(e) => {
              handleChangeRemarks(e.target.value, index)
            }}
            onPressEnter={(e) => {
              handleChangeRemarks(e.target.value, index)
            }}
            onChange={(e) => {
              e.target.setAttribute('placeholder', e.target.value)
            }}
            onFocus={(e) => {
              e.currentTarget.innerHTML = data[index].remarks
            }}
          />
        ),
        width: 200,
      }),
    ],
  }
}
