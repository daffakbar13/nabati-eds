import React from 'react'
import { Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Col, Row } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import {
  SectionAction,
  SectionConfirm,
  SectionLoader,
  SectionModalCreate,
  SectionTable,
} from './sections'
import SFACallPlanListProvider from './_provider'

export default function PageCallPlanList() {
  const titlePage = useTitlePage('list')

  return (
    <SFACallPlanListProvider>
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
            <SectionTable />
          </Card>
        </Col>
      </Row>
      <SectionModalCreate />
      <SectionConfirm />
      <SectionLoader />
    </SFACallPlanListProvider>
  )
}
