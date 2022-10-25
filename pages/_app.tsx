import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import DashboardLayout from 'src/containers/Layouts/DashboardLayout'
import 'pink-lava-ui/index.css'
import 'src/styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { menu } from 'src/configs/menus'
import { useTitle } from 'src/hooks'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || DashboardLayout
  const title = useTitle()

  return (
    <>
    <Head>
      <title>EDS - {title}</title>
      <style></style>
    </Head>
    {getLayout(<Component {...pageProps} />)}
    </>
  )
}
