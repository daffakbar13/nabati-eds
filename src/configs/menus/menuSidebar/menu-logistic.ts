import Router from 'next/router'

import {
  ICInventory,
  LogisticIcGr,
  LogisticIcIntraBranch,
  LogisticIcIntraChannel,
  LogisticIcIntraSloc,
  LogisticIcCanvas,
  LogisticIcBadStock,
  LogisticIcSwapHandling,
  LogisticIcStockAdjustment,
  LogisticIcConfiguration,
} from 'src/assets'
import { PATH } from '../path'

export const menuLogistic = [
  { type: 'title', title: 'OVERVIEW' },
  {
    key: 'dashboard',
    type: 'menu',
    title: 'Dashboard',
    icon: ICInventory,
    content: () => 'Dashboard',
    onClick: () => Router.push(PATH.DASHBOARD),
  },
  { type: 'divider' },
  { type: 'title', title: 'Logistic' },
  {
    key: 'inventory',
    title: 'Inventory',
    icon: ICInventory,
    children: [
      {
        key: 'stock-realtime',
        title: 'Stock Realtime',
        content: () => 'Stock Realtime',
        onClick: () => Router.push(`${PATH.LOGISTIC}/stock-realtime`),
      },
      {
        key: 'availability-overview',
        title: 'Availability Overview',
        content: () => 'Availability Overview',
        onClick: () => Router.push(`${PATH.LOGISTIC}/availability-overview`),
      },
      {
        key: 'material-in-transit',
        title: 'Material In Transit',
        content: () => 'Material In Transit',
        onClick: () => Router.push(`${PATH.LOGISTIC}/material-in-transit`),
      },
      {
        key: 'material-document',
        title: 'Material Document',
        content: () => 'Material Document',
        onClick: () => Router.push(`${PATH.LOGISTIC}/material-document`),
      },
      {
        key: 'list-swap-handling',
        title: 'List Swap Handling',
        content: () => 'List Swap Handling',
        onClick: () => Router.push(`${PATH.LOGISTIC}/list-swap-handling`),
      },
      {
        key: 'wh-stock-mutation',
        title: 'WH Stock Mutation',
        content: () => 'WH Stock Mutation',
        onClick: () => Router.push(`${PATH.LOGISTIC}/warehouse-stock-mutation`),
      },
    ],
  },
  {
    key: 'gr-from-principal',
    title: 'GR From Principal',
    icon: LogisticIcGr,
    children: [
      {
        key: 'goods-receipt',
        title: 'Goods Receipt',
        content: () => 'Goods Receipt',
        onClick: () => Router.push(`${PATH.LOGISTIC}/goods-receipt`),
      },
      {
        key: 'gr-return',
        title: 'GR Return',
        content: () => 'GR Return',
        onClick: () => Router.push(`${PATH.LOGISTIC}/gr-return`),
      },
    ],
  },
  {
    key: 'intra-branch',
    title: 'Intra Branch',
    icon: LogisticIcIntraBranch,
    children: [
      {
        key: 'po-sto',
        title: 'PO STO',
        content: () => 'PO STO',
        onClick: () => Router.push(`${PATH.LOGISTIC}/po-sto`),
      },
      {
        key: 'approval',
        title: 'Approval',
        content: () => 'Approval',
        onClick: () => Router.push(`${PATH.LOGISTIC}/approval`),
      },
      {
        key: 'do-sto',
        title: 'DO STO',
        content: () => 'DO STO',
        onClick: () => Router.push(`${PATH.LOGISTIC}/do-sto`),
      },
      {
        key: 'good-issue',
        title: 'Goods Issue',
        content: () => 'Goods Issue',
        onClick: () => Router.push(`${PATH.LOGISTIC}/good-issue`),
      },
      {
        key: 'good-receipt-intra-branch',
        title: 'Goods Receipt',
        content: () => 'Goods Receipt',
        onClick: () => Router.push(`${PATH.LOGISTIC}/good-receipt-intra-branch`),
      },
    ],
  },
  {
    key: 'intra-sloc',
    title: 'Intra Sloc',
    icon: LogisticIcIntraSloc,
    children: [
      {
        key: 'request-intra-sloc',
        title: 'Request',
        content: () => 'Request',
        onClick: () => Router.push(`${PATH.LOGISTIC}/request-intra-sloc`),
      },
      {
        key: 'goods-issue-intra-sloc',
        title: 'Goods Issue',
        content: () => 'Goods Issue',
        onClick: () => Router.push(`${PATH.LOGISTIC}/goods-issue-intra-sloc`),
      },
      {
        key: 'goods-receipt-intra-sloc',
        title: 'Goods Receipt',
        content: () => 'Goods Receipt',
        onClick: () => Router.push(`${PATH.LOGISTIC}/goods-receipt-intra-sloc`),
      },
    ],
  },
  {
    key: 'canvas',
    title: 'Canvas',
    icon: LogisticIcCanvas,
    children: [
      {
        key: 'stock-reservation',
        title: 'Stock Reservation',
        content: () => 'Request',
        onClick: () => Router.push(`${PATH.LOGISTIC}/stock-reservation`),
      },
      {
        key: 'approval-stock-reservation',
        title: 'Approval',
        content: () => 'Approval',
        onClick: () => Router.push(`${PATH.LOGISTIC}/approval-stock-reservation`),
      },
      {
        key: 'transfer-to-gs',
        title: 'Transfer to GS',
        content: () => 'Transfer to GS',
        onClick: () => Router.push(`${PATH.LOGISTIC}/transfer-to-gs`),
      },
    ],
  },
  {
    key: 'bad-stock',
    title: 'Bad Stock',
    icon: LogisticIcBadStock,
    children: [
      {
        key: 'gi-disposal',
        title: 'GI Disposal',
        content: () => 'GI Disposal',
        onClick: () => Router.push(`${PATH.LOGISTIC}/gi-disposal`),
      },
    ],
  },
  {
    key: 'swap-handling',
    title: 'Swap Handling',
    icon: LogisticIcSwapHandling,
    onClick: () => Router.push(`${PATH.LOGISTIC}/swap-handling`),
  },
  {
    key: 'stock',
    title: 'Stock',
    icon: LogisticIcStockAdjustment,
    children: [
      {
        key: 'stock-opname',
        title: 'Stock Opname',
        content: () => 'Stock Opname',
        onClick: () => Router.push(`${PATH.LOGISTIC}/stock-opname`),
      },
      {
        key: 'approval-stock-opname',
        title: 'Approval Stock Opname',
        content: () => 'Approval',
        onClick: () => Router.push(`${PATH.LOGISTIC}/approval-stock-opname`),
      },
      {
        key: 'stock-adjustment',
        title: 'Stock Adjusment',
        content: () => 'Transfer to GS',
        onClick: () => Router.push(`${PATH.LOGISTIC}/stock-adjustment`),
      },
      {
        key: 'approval-stock-adjustment',
        title: 'Approval Stock Adjustment',
        content: () => 'Approval',
        onClick: () => Router.push(`${PATH.LOGISTIC}/approval-stock-adjustment`),
      },
    ],
  },
  { type: 'title', title: 'GENERAL' },
  { type: 'divider' },
  {
    key: 'configuration',
    title: 'Configuration',
    icon: LogisticIcConfiguration,
    children: [
      {
        key: 'company',
        title: 'Company',
        content: () => 'Company',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-company`),
      },
      {
        key: 'sloc',
        title: 'SLoc',
        content: () => 'SLoc',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-sloc`),
      },
      {
        key: 'sloc-company',
        title: 'Sloc Company',
        content: () => 'Sloc Company',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-sloc-company`),
      },
      {
        key: 'sloc-costumer-group',
        title: 'Sloc Customer Group',
        content: () => 'Sloc Customer Group',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-sloc-costumer-group`),
      },
      {
        key: 'sloc-salesman',
        title: 'Sloc Salesman',
        content: () => 'Sloc Salesman',
        onClick: () => Router.push(`${PATH.LOGISTIC}/sloc-salesman`),
      },
      {
        key: 'auto-so-to-do',
        title: 'Auto SO to DO',
        content: () => 'Auto SO to DO',
        onClick: () => Router.push(`${PATH.LOGISTIC}/auto-so-to-do`),
      },
      {
        key: 'configuration-credit-limit',
        title: 'Credit Limit',
        content: () => 'Credit Limit',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-credit-limit`),
      },
      {
        key: 'configuration-credit-limit-approval',
        title: 'Credit Limit Approval',
        content: () => 'Credit Limit Approval',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-credit-limit-approval`),
      },
      {
        key: 'configuration-order-type-to-sloc',
        title: 'Order Type to Sloc',
        content: () => 'Order Type to Sloc',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-order-type-to-sloc`),
      },
      {
        key: 'tax-regulator',
        title: 'Tax Regulator',
        content: () => 'Tax Regulator',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-tax-regulator`),
      },
      {
        key: 'item-category',
        title: 'Item Category',
        content: () => 'Item Category',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-item-category`),
      },
      {
        key: 'branch-location',
        title: 'Branch Location',
        content: () => 'Branch Location',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-branch-location`),
      },
      {
        key: 'mapping-product-intra',
        title: 'Mapping Product Intra',
        content: () => 'Mapping Product Intra',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-mapping-product-intra`),
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
          Router.push(`${PATH.LOGISTIC}/configuration-sales-organization-customer-group-material`),
      },
      {
        key: 'sales-organization-customer-group-salesman-grop',
        title: 'Sales Organization, Customer Group, Salesman Group',
        content: () => 'Sales Organization, Customer Group, Salesman Group',
        onClick: () =>
          Router.push(
            `${PATH.LOGISTIC}/configuration-sales-organization-customer-group-salesman-grop`,
          ),
      },
      {
        key: 'sales-organization-customer',
        title: 'Sales Organization, Customer',
        content: () => 'Sales Organization, Customer',
        onClick: () => Router.push(`${PATH.LOGISTIC}/configuration-sales-organization-customer`),
      },
    ],
  },
]
