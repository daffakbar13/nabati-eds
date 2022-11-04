import type { ReactElement } from 'react'
import LoginLayout from 'src/containers/Layouts/LoginLayout'
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
  // Radio,
  Text,
  Pagination,
} from 'pink-lava-ui'
import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => <Layout style={{ height: '100vh' }}>{/* <Radio>Text</Radio> */}</Layout>

// Page.getLayout = (page) => page

export default Page
