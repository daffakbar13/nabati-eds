import React from 'react'
import { Card } from 'src/components'
import { Col, Row } from 'antd'
import { SectionAction, SectionConfirm, SectionLoader, SectionTab } from './sections'
import SalesSalesOrderDetailProvider from './_provider'

export default function PageSalesOrderDetail() {
  return (
    <SalesSalesOrderDetailProvider>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <SectionAction />
        </Col>
        <Col span={24}>
          <Card>
            <SectionTab />
          </Card>
        </Col>
      </Row>
      <SectionLoader />
      <SectionConfirm />
    </SalesSalesOrderDetailProvider>
  )
}
