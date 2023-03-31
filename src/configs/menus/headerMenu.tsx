/* eslint-disable no-return-assign */
import React from 'react'
import { ICNewTab } from 'src/assets'
import Link from 'next/link'
import { PATH } from './path'

export const headerMenu = [
  {
    path: PATH.SFA,
    label: <Link href={{ pathname: '/sfa' }}>Home</Link>,
  },
  {
    path: '/dashboard?menu=config',
    label: <div onClick={() => (window.location.href = '/dashboard?menu=config')}>Config</div>,
  },
  {
    path: '/dashboard?menu=mdm',
    label: (
      <div onClick={() => (window.location.href = '/dashboard?menu=mdm')}>
        Master Data Management
      </div>
    ),
  },
  {
    path: PATH.SALES,
    label: <Link href={{ pathname: '/sales' }}>Sales</Link>,
  },
  {
    path: PATH.LOGISTIC,
    label: <Link href={{ pathname: '/logistic' }}>Logistic</Link>,
  },
  {
    path: '/fico',
    label: <div onClick={() => (window.location.href = '/fico')}>Finance</div>,
  },
  {
    path: null,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 4 }}>eDot</span> <ICNewTab />
      </div>
    ),
  },
]
