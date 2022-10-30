import Router from 'next/router'
import * as NabatiIcons from 'src/assets'

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
        () => Router.push('/dashboard'),
    ),
    CreateMenu('sales', 'Sales', 'title'),
    CreateMenu('order-to-cash', 'Order To Cash', null, NabatiIcons.ICDollar, null, null, [
        CreateMenu(
            'quotation',
            'Quotation',
            null,
            null,
            () => 'Quotation',
            () => Router.push('/sales/quotation'),
        ),
        CreateMenu(
            'sales-order',
            'Sales Order',
            null,
            null,
            () => 'Sales Order',
            () => Router.push('/sales/sales-order'),
        ),
        CreateMenu(
            'delivery-order',
            'Delivery Order',
            null,
            null,
            () => 'Delivery Order',
            () => Router.push('/sales/delivery-order'),
        ),
        CreateMenu(
            'shipment',
            'Shipment',
            null,
            null,
            () => 'Shipment',
            () => Router.push('/sales/shipment'),
        ),
        CreateMenu(
            'billing',
            'Billing',
            null,
            null,
            () => 'Billing',
            () => Router.push('/sales/billing'),
        ),
        CreateMenu(
            'collection',
            'Collection',
            null,
            null,
            () => 'Collection',
            () => Router.push('/sales/collection'),
        ),
        CreateMenu(
            'undelivered',
            'Undelivered',
            null,
            null,
            () => 'Undelivered',
            () => Router.push('/sales/undelivered'),
        ),
        CreateMenu(
            'approval',
            'Approval',
            null,
            null,
            () => 'Approval',
            () => Router.push('/sales/approval'),
        ),
    ]),
]
