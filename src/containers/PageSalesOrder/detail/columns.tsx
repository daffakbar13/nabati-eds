import { ColumnsType } from 'antd/lib/table'
import { concatString } from 'src/utils/concatString'
import { addColumn } from 'src/utils/createColumns'
import currency from 'src/utils/currencyFormat'

export const ColumnsSalesOrder = [
  addColumn({
    title: 'No',
    render: (_, __, i) => i + 1,
    fixed: true,
  }),
  addColumn({
    title: 'Item',
    render: (_, { product_id, description }) => concatString(product_id, description),
    fixed: true,
  }),
  addColumn({
    title: 'Item Category',
    dataIndex: 'item_category_id',
    fixed: true,
  }),
  addColumn({
    title: 'Uom',
    dataIndex: 'uom_id',
    fixed: true,
  }),
  addColumn({
    title: 'Quantity Order',
    dataIndex: 'order_qty',
    align: 'center',
  }),
  addColumn({
    title: 'Quantity Booking',
    dataIndex: 'confirm_qty',
    align: 'center',
  }),
  addColumn({
    title: 'Based Price',
    render: (_, { price }) => currency(price),
  }),
  addColumn({
    title: 'Gross',
    render: (_, { gross_value }) => currency(gross_value),
  }),
  addColumn({
    title: 'Discount',
    render: (_, { discount_value }) => currency(discount_value),
  }),
  addColumn({
    title: 'Sub Total',
    render: (_, { price, order_qty }) => currency(price * order_qty),
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
  }),
]

export const ColumnsPricingCondition = [
  addColumn({
    title: 'No',
    render: (_, __, index) => index + 1,
    fixed: true,
  }),
  addColumn({
    title: 'Item ID',
    dataIndex: 'product_id',
    fixed: true,
  }),
  addColumn({
    title: 'Item Category',
    dataIndex: 'item_category_id',
    fixed: true,
  }),
  addColumn({
    title: 'Promotion Type',
    dataIndex: 'doc',
    fixed: true,
  }),
  addColumn({
    title: 'Name',
    dataIndex: 'description',
    fixed: true,
  }),
  addColumn({
    title: 'Uom',
    dataIndex: 'uom_id',
    fixed: true,
  }),
  addColumn({
    title: 'Quantity Order',
    dataIndex: 'order_qty',
  }),
  addColumn({
    title: 'Quantity Booking',
    dataIndex: 'confirm_qty',
  }),
  addColumn({
    title: 'Based Price',
    dataIndex: 'price',
    render: (price) => currency(price),
  }),
  addColumn({
    title: 'Gross',
    dataIndex: 'gross_value',
    render: (gross_value) => currency(gross_value),
  }),
  addColumn({
    title: 'Disc 1',
    dataIndex: 'discount_base_calc1',
    render: (gross_value) => currency(gross_value),
  }),
  addColumn({
    title: 'Net 1',
    dataIndex: 'net1',
    render: (gross_value) => currency(gross_value),
  }),
  addColumn({
    title: 'Disc 2',
    dataIndex: 'discount_base_calc2',
    render: (gross_value) => currency(gross_value),
  }),
  addColumn({
    title: 'Net 2',
    dataIndex: 'net2',
    render: (gross_value) => currency(gross_value),
  }),
  addColumn({
    title: 'Disc 3',
    dataIndex: 'discount_base_calc3',
    render: (gross_value) => currency(gross_value),
  }),
  addColumn({
    title: 'Net 3',
    dataIndex: 'net3',
    render: (gross_value) => currency(gross_value),
  }),
  addColumn({
    title: 'Disc 4',
    dataIndex: 'discount_base_calc4',
    render: (gross_value) => currency(gross_value),
  }),
  addColumn({
    title: 'Net 4',
    dataIndex: 'net4',
    render: (gross_value) => currency(gross_value),
  }),
]

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
        return index + 1
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
        return currency(obj.price * obj.order_qty)
      }
      return obj[Object.keys(obj)[0]].toLocaleString()
    },
  },
]
