/* eslint-disable function-paren-newline */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { Col, Divider, Row } from 'antd'
import { Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { useRouter } from 'next/router'
import {
  SectionAction,
  SectionConfirm,
  SectionField,
  SectionLoader,
  SectionTable,
} from './sections'
import SalesQuotationCreateProvider from './_provider'

export default function PageCreateQuotation() {
  const router = useRouter()
  const isNoo = (router.query.is_cus_noo as string) === 'true'
  const isCreatePage = router.asPath.split('/').includes('create')
  const isEditPage = router.asPath.split('/').includes('edit')
  const titlePage = useTitlePage(
    isCreatePage || isNoo ? 'create' : isEditPage ? 'edit' : 'order-again',
  )

  return (
    <SalesQuotationCreateProvider>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Text variant={'h4'}>{titlePage}</Text>
        </Col>
        <Col span={24}>
          <Card>
            <SectionAction />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <SectionField />
            <Divider style={{ borderColor: '#AAAAAA' }} />
            <SectionTable />
          </Card>
        </Col>
        <SectionConfirm />
        <SectionLoader />
      </Row>
    </SalesQuotationCreateProvider>
  )
}
