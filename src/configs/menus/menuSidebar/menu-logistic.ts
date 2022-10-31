import Router from 'next/router'

import {
    ICInventory, LogisticIcGr,
    LogisticIcIntraBranch,
    // LogisticIcIntraChannel,
    // LogisticIcIntraSloc,
    // LogisticIcCanvas,
    // LogisticIcBadStock,
    // LogisticIcSwapHandling,
    // LogisticIcStockAdjustment,
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
            {
                key: 'sync-gr-from-sap',
                title: 'Sync GR From SAP',
                content: () => 'Sync GR From SAP',
                onClick: () => Router.push(`${PATH.LOGISTIC}/sync-gr-from-sap`),
            },
        ],
    },
];
