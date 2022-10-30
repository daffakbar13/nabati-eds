import Router from 'next/router'
import {
    ICInventory, LogisticIcGr,
    LogisticIcIntraBranch,
    LogisticIcIntraChannel,
    LogisticIcIntraSloc,
    LogisticIcCanvas,
    LogisticIcBadStock,
    LogisticIcSwapHandling,
    LogisticIcStockAdjustment,
} from 'src/assets'

export const menuLogistic = [
    { type: 'title', title: 'OVERVIEW' },
    {
        key: 'dashboard',
        type: 'menu',
        title: 'Dashboard',
        icon: ICInventory,
        content: () => 'Dashboard',
        onClick: () => Router.push('/logistic/dashboard'),
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
                onClick: () => Router.push('/logistic/stock-realtime'),
            },
            {
                key: 'availability-overview',
                title: 'Availability Overview',
                content: () => 'Availability Overview',
                onClick: () => Router.push('/logistic/availability-overview'),
            },
            {
                key: 'material-in-transit',
                title: 'Material In Transit',
                content: () => 'Material In Transit',
                onClick: () => Router.push('/logistic/material-in-transit'),
            },
            {
                key: 'material-document',
                title: 'Material Document',
                content: () => 'Material Document',
                onClick: () => Router.push('/logistic/material-document'),
            },
            {
                key: 'list-swap-handling',
                title: 'List Swap Handling',
                content: () => 'List Swap Handling',
                onClick: () => Router.push('/logistic/list-swap-handling'),
            },
            {
                key: 'wh-stock-mutation',
                title: 'WH Stock Mutation',
                content: () => 'WH Stock Mutation',
                onClick: () => Router.push('/logistic/wh-stock-mutation'),
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
                onClick: () => Router.push('/logistic/goods-receipt'),
            },
            {
                key: 'gr-return',
                title: 'GR Return',
                content: () => 'GR Return',
                onClick: () => Router.push('/logistic/gr-return'),
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
                onClick: () => Router.push('/logistic/po-sto'),
            },
            {
                key: 'approval',
                title: 'Approval',
                content: () => 'Approval',
                onClick: () => Router.push('/logistic/approval'),
            },
            {
                key: 'do-sto',
                title: 'DO STO',
                content: () => 'DO STO',
                onClick: () => Router.push('/logistic/do-sto'),
            },
            {
                key: 'good-issue',
                title: 'Goods Issue',
                content: () => 'Goods Issue',
                onClick: () => Router.push('/logistic/good-issue'),
            },
            {
                key: 'goods-receipt',
                title: 'Goods Receipt',
                content: () => 'Goods Receipt',
                onClick: () => Router.push('/logistic/goods-receipt'),
            },
            {
                key: 'sync-gr-from-sap',
                title: 'Sync GR From SAP',
                content: () => 'Sync GR From SAP',
                onClick: () => Router.push('/logistic/sync-gr-from-sap'),
            },
        ],
    },
];
