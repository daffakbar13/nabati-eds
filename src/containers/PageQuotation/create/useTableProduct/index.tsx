/* eslint-disable camelcase */
import { MinusCircleFilled } from '@ant-design/icons'
import { Input, InputNumber, Select } from 'antd'
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
  color: 'black',
}

const styleDisabledInput: React.CSSProperties = {
  ...styleInputNumber,
  flexDirection: 'row-reverse',
  backgroundColor: '#F4F4F4F4',
  padding: 10,
}

export function useTableProduct() {
  const {
    state: { data, size },
    handler: {
      bookingProduct,
      getAllProduct,
      getOptionsUom,
      fieldListProduct,
      handleChangeQty,
      handleChangeDiscount,
      handleChangeRemarks,
      handleDeleteRows,
      handleChangeUom,
      isNullProduct,
      handleSize,
    },
  } = useTableProductStates()

  React.useEffect(() => {
    getAllProduct()
  }, [])

  React.useEffect(() => {
    handleSize()
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
            onChange={(e) => {
              bookingProduct(e.value, index)
            }}
          />
        ),
        width: size.product,
        fixed: true,
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
        fixed: true,
      }),
      addColumn({
        title: 'Quantity',
        dataIndex: 'order_qty',
        render: (_, __, index) => (
          <InputNumber
            disabled={isNullProduct(index)}
            controls={false}
            min={'1'}
            max={'999999'}
            value={data[index].order_qty.toLocaleString() as any}
            onBlur={(e) => {
              handleChangeQty(e.target.value, index)
            }}
            onPressEnter={(e) => {
              handleChangeQty(e.target.value, index)
            }}
            onClick={(e) => {
              e.target.value = data[index].order_qty.toString()
              e.currentTarget.focus()
            }}
            onChange={(e) => e.toLocaleString('fullwide', { useGrouping: false })}
            style={{ ...styleInputNumber, width: '100%' }}
          />
        ),
        width: size.quantity,
      }),
      addColumn({
        title: 'Based Price',
        dataIndex: 'price',
        render: (price) => <div style={styleDisabledInput}>{price?.toLocaleString()}</div>,
        // width: 130,
      }),
      addColumn({
        title: 'Discount',
        dataIndex: 'discount',
        render: (_, __, index) => (
          <Input.Group compact style={{ ...styleInputNumber }}>
            <Select defaultValue="Rp" bordered={false}>
              <Select.Option value="Rp">Rp</Select.Option>
              <Select.Option value="%">%</Select.Option>
            </Select>
            <InputNumber
              controls={false}
              min={'0'}
              max={'999999'}
              value={data[index].discount.toLocaleString() as any}
              disabled={isNullProduct(index)}
              onBlur={(e) => {
                handleChangeDiscount(e.target.value, index)
              }}
              onPressEnter={(e) => {
                handleChangeDiscount(e.target.value, index)
              }}
              onClick={(e) => {
                e.target.value = data[index].discount
                e.currentTarget.focus()
              }}
              style={{
                width: size.discount,
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'right',
              }}
            />
          </Input.Group>
        ),
        width: 130,
      }),
      addColumn({
        title: 'Sub Total',
        dataIndex: 'sub_total',
        render: (sub_total) => <div style={styleDisabledInput}>{sub_total.toLocaleString()}</div>,
        // width: 110,
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
