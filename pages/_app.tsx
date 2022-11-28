/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react'
import type { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import DashboardLayout from 'src/containers/Layouts/DashboardLayout'
import 'pink-lava-ui/index.css'
import 'src/styles/globals.css'
import { useTitle } from 'src/hooks'
import Loader from 'src/components/Loader'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || DashboardLayout
  const title = useTitle()

  const randomChar = () => (Math.random() + 1).toString(36).substring(7)

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

  const handleStart = (url: string) => {
    setLoading(true)
  }

  const handleStop = () => {
    setLoading(false)
  }

  useEffect(() => {
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

  return (
    <>
      <Head>
        <title>EDS - {title}</title>
      </Head>
      <>
        {loading && getLayout(<Loader />)}
        {!loading && getLayout(<Component {...pageProps} />)}
      </>
    </>
  )
}
