import Router from 'next/router'
import * as NabatiIcons from 'src/assets'
import { LogisticIcConfiguration } from 'src/assets'
import { PATH } from '../path'

const CreateMenu = (
  key?: string,
  title?: string,
  type?: string,
  icon?: any,
  content?: () => string,
  onClick?: () => Promise<boolean>,
  children?: any[],
) => ({
  key,
  title,
  type,
  icon,
  content,
  onClick,
  children,
})

export const menuSales = [
  CreateMenu('overview', 'Overview', 'title'),
  CreateMenu(
    'dashboard',
    'Dashboard',
    null,
    NabatiIcons.ICInventory,
    () => 'Dashboard',
    () => Router.push(PATH.SALES),
  ),
  CreateMenu('sales', 'Sales', 'title'),
  CreateMenu('order-to-cash', 'Order To Cash', null, NabatiIcons.ICDollar, null, null, [
    CreateMenu(
      'quotation',
      'Quotation',
      null,
      null,
      () => 'Quotation',
      () => Router.push(`${PATH.SALES}/quotation`),
    ),
    CreateMenu(
      'sales-order',
      'Sales Order',
      null,
      null,
      () => 'Sales Order',
      () => Router.push(`${PATH.SALES}/sales-order`),
    ),
    CreateMenu(
      'delivery-order',
      'Delivery Order',
      null,
      null,
      () => 'Delivery Order',
      () => Router.push(`${PATH.SALES}/delivery-order`),
    ),
    CreateMenu(
      'shipment',
      'Shipment',
      null,
      null,
      () => 'Shipment',
      () => Router.push(`${PATH.SALES}/shipment`),
    ),
    CreateMenu(
      'proforma-invoice',
      'Proforma Invoice',
      null,
      null,
      () => 'Proforma Invoice',
      () => Router.push(`${PATH.SALES}/proforma-invoice`),
    ),
    CreateMenu(
      'billing',
      'Billing',
      null,
      null,
      () => 'Billing',
      () => Router.push(`${PATH.SALES}/billing`),
    ),
    CreateMenu(
      'collection',
      'Collection',
      null,
      null,
      () => 'Collection',
      () => Router.push(`${PATH.SALES}/collection`),
    ),
    CreateMenu(
      'undelivered',
      'Undelivered',
      null,
      null,
      () => 'Undelivered',
      () => Router.push(`${PATH.SALES}/undelivered`),
    ),
    CreateMenu(
      'approval',
      'Approval',
      null,
      null,
      () => 'Approval',
      () => Router.push(`${PATH.SALES}/approval`),
    ),
  ]),
  CreateMenu('master-data', 'Master Data', null, NabatiIcons.LogisticIcSwapHandling, null, null, [
    CreateMenu(
      'customer',
      'Customer',
      null,
      null,
      () => 'Customer',
      () => Router.push(`${PATH.SALES}/customer`),
    ),
    CreateMenu(
      'customer-noo',
      'Customer NOO',
      null,
      null,
      () => 'Customer NOO',
      () => Router.push(`${PATH.SALES}/customer-noo`),
    ),
    CreateMenu(
      'approval-noo',
      'Approval NOO',
      null,
      null,
      () => 'Approval NOO',
      () => Router.push(`${PATH.SALES}/approval-noo`),
    ),
    CreateMenu(
      'salesman-division',
      'Salesman Division',
      null,
      null,
      () => 'Salesman Division',
      () => Router.push(`${PATH.SALES}/salesman-division`),
    ),
    CreateMenu(
      'salesman-division-product',
      'Salesman Division Product',
      null,
      null,
      () => 'Salesman Division Product',
      () => Router.push(`${PATH.SALES}/salesman-division-product`),
    ),
  ]),
  {
    key: 'configuration',
    title: 'Configuration',
    icon: LogisticIcConfiguration,
    children: [
      {
        key: 'auto-so-to-do',
        title: 'Auto SO to DO',
        content: () => 'Auto SO to DO',
        onClick: () => Router.push(`${PATH.SALES}/auto-so-to-do`),
      },
      {
        key: 'configuration-approval-so-block',
        title: 'Approval SO Block',
        content: () => 'Approval SO Block',
        onClick: () => Router.push(`${PATH.SALES}/configuration-approval-so-block`),
      },
      {
        key: 'configuration-credit-limit',
        title: 'Credit Limit',
        content: () => 'Credit Limit',
        onClick: () => Router.push(`${PATH.SALES}/configuration-credit-limit`),
      },
      {
        key: 'configuration-credit-limit-approval',
        title: 'Credit Limit Approval',
        content: () => 'Credit Limit Approval',
        onClick: () => Router.push(`${PATH.SALES}/configuration-credit-limit-approval`),
      },
    ],
  },
  {
    key: 'sales-order-block',
    title: 'Sales Order Block',
    icon: LogisticIcConfiguration,
    children: [
      {
        key: 'sales-organization-customer-group-material',
        title: 'Sales Organization, Customer Group, Material',
        content: () => 'Sales Organization, Customer Group, Material',
        onClick: () =>
          Router.push(`${PATH.SALES}/configuration-sales-organization-customer-group-material`),
      },
      {
        key: 'sales-organization-customer-group-salesman-grop',
        title: 'Sales Organization, Customer Group, Salesman Group',
        content: () => 'Sales Organization, Customer Group, Salesman Group',
        onClick: () =>
          Router.push(
            `${PATH.SALES}/configuration-sales-organization-customer-group-salesman-grop`,
          ),
      },
      {
        key: 'sales-organization-customer',
        title: 'Sales Organization, Customer',
        content: () => 'Sales Organization, Customer',
        onClick: () => Router.push(`${PATH.SALES}/configuration-sales-organization-customer`),
      },
    ],
  },
  CreateMenu('transportation', 'Transportation', null, NabatiIcons.ICTruck, null, null, [
    CreateMenu(
      'transportation-driver',
      'Driver',
      null,
      null,
      () => 'Driver',
      () => Router.push(`${PATH.SALES}/transportation-driver`),
    ),
    CreateMenu(
      'transportation-vehicle',
      'Vehicle',
      null,
      null,
      () => 'Vehicle',
      () => Router.push(`${PATH.SALES}/transportation-vehicle`),
    ),
    CreateMenu(
      'transportation-vehicle-type',
      'Vehicle Type',
      null,
      null,
      () => 'Vehicle-type',
      () => Router.push(`${PATH.SALES}/transportation-vehicle-type`),
    ),
    CreateMenu(
      'transportation-shipping-type',
      'Shipping Type',
      null,
      null,
      () => 'Shipping-type',
      () => Router.push(`${PATH.SALES}/transportation-shipping-type`),
    ),
    CreateMenu(
      'transportation-mode-of-transportation',
      'Mode of Transportaion',
      null,
      null,
      () => 'Mode-of-type',
      () => Router.push(`${PATH.SALES}/transportation-mode-of-transportation`),
    ),
    CreateMenu(
      'transportation-shipping-condition',
      'Shipping Condition',
      null,
      null,
      () => 'Shipping-condition',
      () => Router.push(`${PATH.SALES}/transportation-shipping-condition`),
    ),
    CreateMenu(
      'transportation-group',
      'Transportation Group',
      null,
      null,
      () => 'Transporation-group',
      () => Router.push(`${PATH.SALES}/transportation-group`),
    ),
    CreateMenu(
      'transportation-zone',
      'Transportation Zone',
      null,
      null,
      () => 'Transporation-zone',
      () => Router.push(`${PATH.SALES}/transportation-zone`),
    ),
    CreateMenu(
      'transportation-route',
      'Route',
      null,
      null,
      () => 'route',
      () => Router.push(`${PATH.SALES}/transportation-route`),
    ),
    CreateMenu(
      'transportation-route-determination',
      'Route Determination',
      null,
      null,
      () => 'route-determination',
      () => Router.push(`${PATH.SALES}/transportation-route-determination`),
    ),
  ]),
]
