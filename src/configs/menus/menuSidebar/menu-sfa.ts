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

export const menuSFA = [
  CreateMenu('overview', 'Overview', 'title'),
  CreateMenu(
    'dashboard',
    'Dashboard',
    null,
    NabatiIcons.ICInventory,
    () => 'Dashboard',
    () => Router.push(PATH.SFA),
  ),
  CreateMenu('sfa', 'SFA Module', 'title'),
  CreateMenu('call-plan', 'Call Plan', null, NabatiIcons.ICDollar, null, null, [
    CreateMenu(
      'call-plan-pattern',
      'Call Plan Pattern',
      null,
      null,
      () => 'Call Plan Pattern',
      () => Router.push(`${PATH.SFA}/call-plan-pattern`),
    ),
    CreateMenu(
      'call-plan-list',
      'Call Plan List',
      null,
      null,
      () => 'Call Plan List',
      () => Router.push(`${PATH.SFA}/call-plan-list`),
    ),
  ]),
  CreateMenu('division', 'Division', null, NabatiIcons.LogisticIcSwapHandling, null, null, [
    CreateMenu(
      'division-master',
      'Division Master',
      null,
      null,
      () => 'Division Master',
      () => Router.push(`${PATH.SFA}/division-master`),
    ),
    CreateMenu(
      'division-branch',
      'Division Branch',
      null,
      null,
      () => 'Division Branch',
      () => Router.push(`${PATH.SFA}/division-branch`),
    ),
  ]),
  CreateMenu('promo-list', 'Promo List', null, NabatiIcons.ICTruck, null, null, []),
  {
    key: 'salesman',
    title: 'Salesman',
    icon: LogisticIcConfiguration,
    children: [
      {
        key: 'salesman-division',
        title: 'Salesman Division',
        content: () => 'Salesman Division',
        onClick: () => Router.push(`${PATH.SFA}/salesman-division`),
      },
      {
        key: 'salesman-division-product',
        title: 'Salesman Division Product',
        content: () => 'Salesman Division Product',
        onClick: () => Router.push(`${PATH.SFA}/salesman-division-product`),
      },
    ],
  },
  {
    key: 'loyalti',
    title: 'Loyalti',
    icon: LogisticIcConfiguration,
    children: [
      {
        key: 'loyalti-list',
        title: 'Loyalti List',
        content: () => 'Loyalti List',
        onClick: () => Router.push(`${PATH.SFA}/loyalti-list`),
      },
    ],
  },
  {
    key: 'insentif',
    title: 'Insentif',
    icon: LogisticIcConfiguration,
    children: [
      {
        key: 'loyalti-list',
        title: 'Insentif List',
        content: () => 'Insentif List',
        onClick: () => Router.push(`${PATH.SFA}/loyalti-list`),
      },
    ],
  },
  {
    key: 'leaderboard',
    title: 'Leaderboard',
    icon: LogisticIcConfiguration,
    children: [
      {
        key: 'leaderboard-list',
        title: 'Leaderboard List',
        content: () => 'Leaderboard List',
        onClick: () => Router.push(`${PATH.SFA}/leaderboard-list`),
      },
    ],
  },
  {
    key: 'target-toko',
    title: 'Target Toko',
    icon: LogisticIcConfiguration,
    children: [
      {
        key: 'target-toko-list',
        title: 'Target Toko List',
        content: () => 'Target Toko List',
        onClick: () => Router.push(`${PATH.SFA}/target-toko-list`),
      },
    ],
  },
]
