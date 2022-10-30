import React from 'react'
import { ICGridMenu, ICNewTab } from 'src/assets';
import Router from 'next/router'
import Link from 'next/link'

const CreateHeaderMenu = (label: React.ReactNode) => ({ label })

export const headerMenu = [
  CreateHeaderMenu(<div style={{ marginTop: 16 }} onClick={() => Router.push('/')}>
    <ICGridMenu />
  </div >),
  CreateHeaderMenu(<Link href={{ pathname: '/home' }} >Home</Link>),
  CreateHeaderMenu(<Link href={{ pathname: '/sales' }} >Sales</Link>),
  CreateHeaderMenu(<Link href={{ pathname: '/logistic' }} >Logistic</Link>),
  CreateHeaderMenu(<div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: 4 }}>eDot</span> <ICNewTab />
  </div>),
]
