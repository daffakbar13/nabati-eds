import { Empty, Row } from 'antd'
import Head from 'next/head'
import Router from 'next/router'
import { Button } from 'pink-lava-ui'
import React from 'react'

export default function PageNotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <Row
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: 'calc(100vh - 70px)',
          flexDirection: 'column',
        }}
        justify="center"
      >
        <Empty description={'404 - Page Not Found'} style={{ fontWeight: 'bold' }}>
          <Button
            variant="tertiary"
            size="small"
            onClick={() => Router.push('/')}
            style={{ margin: 'auto' }}
          >
            Back To Home
          </Button>
        </Empty>
      </Row>
    </>
  )
}
