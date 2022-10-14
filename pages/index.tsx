import type { ReactElement } from 'react'
import LoginLayout from 'src/containers/Layouts/LoginLayout'
import type { NextPageWithLayout } from './_app'
import Router from 'next/router'

import {
  ICField,
  ICUser,
  ICMenu,
  ICCalendar,
  ICFinance,
  ICInventory,
  ICPurchaseOrg,
  ICDollar,
  ICPackage,
} from 'src/assets'

import {
  Sidebar,
  Layout,
  Header,
  MenuLogout,
  Notification,
  Spacer,
  Alert,
  Radio,
  Text,
  Pagination,
} from 'pink-lava-ui'

const Page: NextPageWithLayout = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Radio>Text</Radio>
    </Layout>
  )
}

// Page.getLayout = (page) => page

export default Page
