import React from 'react'
import { addColumn } from 'src/utils/createColumns'
import TaggedStatus from 'src/components/TaggedStatus'

export const useColumnsDeliveryOrder = [
  addColumn({
    title: 'Delivery Order',
    dataIndex: 'delivery_order_id',
    fixed: true,
  }),
  addColumn({
    title: 'Create Date',
    dataIndex: 'order_date',
  }),
  addColumn({ title: 'Order Type', dataIndex: 'order_type' }),
  addColumn({ title: 'Ship To Customer', dataIndex: 'ship_to_customer' }),
  addColumn({ title: 'Salesman', dataIndex: 'salesman_id' }),
  addColumn({ title: 'Route', dataIndex: '' }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (status) => <TaggedStatus status={status} />,
  }),
  addColumn({
    title: 'Size M³',
    dataIndex: 'volume',
    render: (v) => `${(Math.round((v / 10) * 100) / 100).toFixed(2)} M³`,
    align: 'right',
  }),
  addColumn({
    title: 'Missing Size M³',
    dataIndex: 'a',
    render: (ms) => `${ms || 0} M³`,
    align: 'right',
  }),
]
