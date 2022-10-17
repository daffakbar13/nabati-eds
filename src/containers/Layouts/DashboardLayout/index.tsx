import React, { PropsWithChildren, useState } from 'react'
import { Sidebar, Layout, Spacer, } from 'pink-lava-ui'
import HeaderSection from './HeaderSection'
import { menu } from 'src/configs/menus'

export default function DashboardLayout(page: PropsWithChildren<{}>) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar
        logo="/icons/logo-nabati.svg"
        menu={menu}
        defaultMenu={'dashboard'}
      />
      <Layout
        className="site-layout"
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <HeaderSection />
        <div style={{ padding: '20px' }}>
          <Spacer size={32} />
          {page}
        </div>
      </Layout>
    </Layout>
  )
}
