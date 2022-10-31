import React from 'react'
import { ICGridMenu, ICNewTab } from 'src/assets';
import Router from 'next/router'
import Link from 'next/link'
import { PATH } from './path'

export const headerMenu = [
  {
    path: '/',
    label: <div style={{ marginTop: 16 }} onClick={() => Router.push('/')}>
      <ICGridMenu />
    </div >,
  },
  // {
  //   path: PATH.HOME,
  //   label: <Link href={{ pathname: '/home' }} >Home</Link>,
  // },
  {
    path: PATH.SALES,
    label: <Link href={{ pathname: '/sales' }} >Sales</Link>,
  },
  {
    path: PATH.LOGISTIC,
    label: <Link href={{ pathname: '/logistic' }} >Logistic</Link>,
  },
  {
    path: null,
    label: <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 4 }}>eDot</span> <ICNewTab />
    </div>,
  },

]