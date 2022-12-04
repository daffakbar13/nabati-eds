/* eslint-disable function-paren-newline */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { Col, Divider, Row, Typography } from 'antd'
import { Button, Text } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { getDetailQuotation } from 'src/api/quotation'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { CheckCircleFilled } from '@ant-design/icons'
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import Loader from 'src/components/Loader'
import { concatString } from 'src/utils/concatString'
import { SectionAction, SectionConfirm, SectionField, SectionLoader, SectionTable } from './sections'
import { useTableProduct } from './columns'
import SalesQuotationCreateProvider from './_provider'

export default function PageCreateQuotation() {
  const router = useRouter()
  const isCreatePage = router.asPath.split('/').includes('create')
    const isEditPage = router.asPath.split('/').includes('edit')
    const isOrderAgainPage = !isCreatePage && !isEditPage
    const titlePage = useTitlePage(isCreatePage ? 'create' : isEditPage ? 'edit' : 'order-again')
    const isCreateOrOrderAgain = isCreatePage || isOrderAgainPage

  return (
    <SalesQuotationCreateProvider>
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Text variant={'h4'}>{titlePage}</Text>
      </Col>
      <Col span={24}>
        <Card>
          <SectionAction/>
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <SectionField/>
          <Divider style={{ borderColor: '#AAAAAA' }} />
          <SectionTable/>
        </Card>
      </Col>
      <SectionConfirm/>
      <SectionLoader/>
    </Row>
    </SalesQuotationCreateProvider>
  )
}
