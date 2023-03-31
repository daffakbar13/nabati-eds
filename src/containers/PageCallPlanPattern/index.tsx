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
import SFACallPlanPatternProvider from './_provider'

export default function PageCallPlanPattern() {
  const titlePage = useTitlePage('list')

  return (
    <SFACallPlanPatternProvider>
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
      <SectionConfirm />
      <SectionLoader />
      <SectionModalCreate />
    </SFACallPlanPatternProvider>
  )
}
