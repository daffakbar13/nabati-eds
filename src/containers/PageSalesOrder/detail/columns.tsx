/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import { ColumnsType } from 'antd/lib/table'
import CreateColumns, { addColumn } from 'src/utils/createColumns'

export const ColumnsSalesOrder = [
  CreateColumns('No', 'no', false, (_, __, index) => ++index, 60, true),
  CreateColumns('Item', 'description', false, undefined, 300),
  CreateColumns('Item Category', 'item_category_id', false, undefined, 137),
  CreateColumns('Uom', 'uom_id', false, undefined, 70),
  CreateColumns('Quantity Order', 'order_qty', false, undefined, 170),
  CreateColumns('Quantity Booking', 'confirm_qty', false, undefined, 170),

  // addColumn({
  //   title: 'Quantity Order',
  //   dataIndex: 'order_qty',
  // }),
  // addColumn({
  //   title: 'Quantity Booking',
  //   dataIndex: 'confirm_qty',
  // }),
  CreateColumns('Based Price', 'price', false, (price) => parseInt(price).toLocaleString(), 120),
  // FIXME Sub Total
  CreateColumns(
    'Gross',
    'gross_value',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    80,
  ),
  CreateColumns(
    'Discount',
    'discount_value',
    false,
    (discount_value) => parseInt(discount_value).toLocaleString(),
    100,
  ),
  CreateColumns(
    'Sub Total',
    'sub_total',
    false,
    (sub_total, { price, order_qty }) => (parseInt(price) * parseInt(order_qty)).toLocaleString(),
    110,
  ),
  CreateColumns('Remarks', 'remarks', false, undefined, 120),
]

export const ColumnsDocumentFlow = [
  CreateColumns('Process', 'Process'),
  CreateColumns('Doc. Number', 'Doc. Number'),
  CreateColumns('Created Date', 'Created Date'),
  CreateColumns('Created By', 'Created By'),
  CreateColumns('Modified Date', 'Modified Date'),
  CreateColumns('Modified By', 'Modified By'),
  CreateColumns('Status', 'Status'),
]

export const ColumnsCustomerInfo = [
  CreateColumns('Salesman', 'id', false, (id, { name }) => [id, name].join(' - ')),
  CreateColumns('Salesman Group', 'salesman_group_id', false, (id, { salesman_group_name }) =>
    [id, salesman_group_name].join(' - '),
  ),
]

export const ColumnsPricingCondition = [
  CreateColumns('No', 'no', false, (_, __, index) => ++index, 60, true),
  CreateColumns('Item ID', 'product_id', false, undefined, 85),
  CreateColumns('Item Category', 'item_category_id', false, undefined, 140),
  // FIXME Promotion Type
  CreateColumns('Promotion Type', 'Doc. Number', false, undefined, 150),
  CreateColumns('Name', 'description', false, undefined, 250),
  CreateColumns('Uom', 'uom_id', false, undefined, 80),
  addColumn({
    title: 'Quantity Order',
    dataIndex: 'order_qty',
  }),
  addColumn({
    title: 'Quantity Booking',
    dataIndex: 'confirm_qty',
  }),
  // CreateColumns('Quantity', 'order_qty', false, undefined, 100),
  CreateColumns('Based Price', 'price', false, (price) => parseInt(price).toLocaleString(), 120),
  CreateColumns(
    'Gross',
    'gross_value',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Disc 1
  CreateColumns(
    'Disc 1',
    'discount_base_calc1',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Net 1
  CreateColumns(
    'Net 1',
    'net1',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Disc 2
  CreateColumns(
    'Disc 2',
    'discount_base_calc2',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Net 2
  CreateColumns(
    'Net 2',
    'net2',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Disc 3
  CreateColumns(
    'Disc 3',
    'discount_base_calc3',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Net 3
  CreateColumns(
    'Net 3',
    'net3',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Disc 4
  CreateColumns(
    'Disc 4',
    'discount_base_calc4',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Net 4
  CreateColumns(
    'Net 4',
    'net4',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
]

// (price) => ({ children: price, props: { colspan: 2 } })

export const ColumnsPromotionList: ColumnsType<any> = [
  {
    title: <div style={{ textAlign: 'center' }}>No</div>,
    render: (_, obj, index) => {
      const key = Object.keys(obj)[0]
      let title: string
      switch (key) {
        case 'gross_total_amount':
          title = 'Total Gross'
          break
        case 'dpp_total_amount':
          title = 'Net Before Tax'
          break
        case 'discount_total_amount':
          title = 'Total Discount'
          break
        case 'net_total_amount':
          title = 'Net'
          break
        case 'tax_total_amount':
          title = 'PPN'
          break
        case 'total_amount':
          title = 'Total Amount'
          break
        default:
          break
      }
      if (obj.product_id) {
        return ++index
      }
      return {
        children: title,
        props: { colSpan: 7 },
      }
    },
    width: 70,
    colSpan: 1,
  },
  {
    title: <div style={{ textAlign: 'center' }}>PID</div>,
    dataIndex: 'product_id',
    render: (val, obj) => {
      if (obj.product_id) {
        return val
      }
      return { props: { style: { display: 'none' } } }
    },
  },
  {
    title: <div style={{ textAlign: 'center' }}>Product Name</div>,
    dataIndex: 'description',
    width: 400,
    render: (val, obj) => {
      if (obj.product_id) {
        return val
      }
      return { props: { style: { display: 'none' } } }
    },
  },
  {
    title: <div style={{ textAlign: 'center' }}>UoM</div>,
    dataIndex: 'uom_id',
    render: (val, obj) => {
      if (obj.product_id) {
        return val
      }
      return { props: { style: { display: 'none' } } }
    },
  },
  {
    title: <div style={{ textAlign: 'center' }}>Qty</div>,
    dataIndex: 'order_qty',
    render: (val, obj) => {
      if (obj.product_id) {
        return val
      }
      return { props: { style: { display: 'none' } } }
    },
  },
  {
    title: <div style={{ textAlign: 'center' }}>Price</div>,
    dataIndex: 'price',
    render: (val, obj) => {
      if (obj.product_id) {
        return val
      }
      return { props: { style: { display: 'none' } } }
    },
  },
  {
    title: <div style={{ textAlign: 'center' }}>Discount</div>,
    dataIndex: 'discount_value',
    render: (val, obj) => {
      if (obj.product_id) {
        return val
      }
      return { props: { style: { display: 'none' } } }
    },
  },
  {
    title: <div style={{ textAlign: 'center' }}>Amount</div>,
    dataIndex: 'product_id',
    render: (_, obj) => {
      if (obj.price) {
        return (parseInt(obj.price) * parseInt(obj.order_qty)).toLocaleString()
      }
      return obj[Object.keys(obj)[0]].toLocaleString()
    },
  },
]
