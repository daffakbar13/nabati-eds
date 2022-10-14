import Router from 'next/router'
import {
  ICField,
  ICUser,
  ICMenu,
  ICCalendar,
  ICFinance,
  // ICInventory,
  // ICPurchaseOrg,
  // ICDollar,
  // ICPackage,
} from 'src/assets'

export const menu = [
  { type: 'title', title: 'Overview', key: 'overview' },
  {
    key: 'dashboard',
    type: 'menu',
    title: 'Dashboard',
    icon: ICField,
    content: () => 'Dashboard',
    onClick: () => Router.push('/dashboard'),
  },
  // { type: 'divider' },
  { type: 'title', title: 'Sales', key: 'sales' },
  {
    key: 'order-to-cash',
    title: 'Order To Cash',
    icon: ICFinance,
    children: [
      {
        key: 'quotation',
        title: 'Quotation',
        content: () => 'Quotation',
        onClick: () => Router.push('/quotation'),
      },
      {
        key: 'sales-order',
        title: 'Sales Order',
        content: () => 'Sales Order',
        onClick: () => Router.push('/sales-order'),
      },
      {
        key: 'delivery-order',
        title: 'delivery Order',
        content: () => 'Delivery Order',
        onClick: () => Router.push('/delivery-order'),
      },
      {
        key: 'shipment',
        title: 'Shipment',
        content: () => 'Shipment',
        onClick: () => Router.push('/billing'),
      },
    ],
  },
]
