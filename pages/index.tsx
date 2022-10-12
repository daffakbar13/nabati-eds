import type { ReactElement } from 'react'
import LoginLayout from 'src/containers/Layouts/LoginLayout'
import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Page.getLayout = (page) => <LoginLayout>{page}</LoginLayout>

export default Page
