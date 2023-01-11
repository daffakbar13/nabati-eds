/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import Router, { useRouter } from 'next/router'
import type { NextPage } from 'next'
import DashboardLayout from 'src/containers/Layouts/DashboardLayout'
import 'pink-lava-ui/index.css'
import 'src/styles/globals.css'
import { requestPreviousTable, usePathHistory, useTitle } from 'src/hooks'
import Loader from 'src/components/Loader'
import { QueryClient, QueryClientProvider } from 'react-query'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient())
  const { previous } = usePathHistory()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const getLayout = Component.getLayout || DashboardLayout
  const title = useTitle()

  function randomChar(): string {
    const random = Math.random() + 1
    return random.toString(36).substring(7)
  }

  const getSecretInfromation = () => {
    const arr = []
    for (let index = 1; index < 21; index++) {
      if (index === 11) {
        arr.push(
          ['.m', randomChar(), 'daffa', randomChar(), 'raihan', randomChar(), 'akbar.'].join('.'),
        )
      } else {
        arr.push(randomChar())
      }
    }
    return arr.join('')
  }

  const handleStart = () => {
    setLoading(true)
  }

  const handleStop = () => {
    setLoading(false)
  }

  React.useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
      localStorage.setItem('secret_information', getSecretInfromation())
    }
  }, [router])

  React.useEffect(() => {
    console.log('previous', previous)
    console.log('isTrue', router.asPath.split('/').includes('detail'))

    if (router.asPath.split('/').includes('detail')) {
      requestPreviousTable()
    }
  }, [router.asPath])

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>EDS - {title}</title>
      </Head>
      <>
        {loading && getLayout(<Loader />)}
        {!loading && getLayout(<Component {...pageProps} />)}
      </>
    </QueryClientProvider>
  )
}
