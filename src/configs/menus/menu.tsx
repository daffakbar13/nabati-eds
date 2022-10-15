import Router from 'next/router'
import * as NabatiIcons from 'src/assets'

const CreateMenu = (
  key?: string,
  title?: string,
  type?: string,
  icon?: any,
  content?: () => string,
  onClick?: () => Promise<boolean>,
  children?: any[]
) => ({ key, title, type, icon, content, onClick, children })

export const menu = [
  CreateMenu('overview', 'Overview', 'title'),
  CreateMenu('dashboard', 'Dashboard', null, NabatiIcons.ICInventory, () => 'Dashboard', () => Router.push('/dashboard')),
  CreateMenu('sales', 'Sales', 'title'),
  CreateMenu('order-to-cash', 'Order To Cash', null, NabatiIcons.ICDollar, null, null, [
    CreateMenu('quotation', 'Quotation', null, null, () => 'Quotation', () => Router.push('/quotation')),
    CreateMenu('sales-order', 'Sales Order', null, null, () => 'Sales Order', () => Router.push('/sales-order')),
    CreateMenu('delivery-order', 'Delivery Order', null, null, () => 'Delivery Order', () => Router.push('/delivery-order')),
    CreateMenu('shipment', 'Shipment', null, null, () => 'Shipment', () => Router.push('/shipment')),
    CreateMenu('billing', 'Billing', null, null, () => 'Billing', () => Router.push('/billing')),
    CreateMenu('collection', 'Collection', null, null, () => 'Collection', () => Router.push('/collection')),
    CreateMenu('undelivered', 'Undelivered', null, null, () => 'Undelivered', () => Router.push('/undelivered')),
    CreateMenu('approval', 'Approval', null, null, () => 'Approval', () => Router.push('/approval')),
  ]),
]
