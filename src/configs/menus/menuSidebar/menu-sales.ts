import Router from 'next/router'
import * as NabatiIcons from 'src/assets'
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
        () => Router.push(PATH.DASHBOARD),
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
]
