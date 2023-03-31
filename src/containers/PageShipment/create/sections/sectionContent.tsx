import { Col, Empty, Row } from 'antd'
import React from 'react'
import { Card } from 'src/components'
import { useSalesShipmentCreateContext } from '../states'
import SectionTableListDo from './sectionTableListDo'
import SectionSelectedInformation from './sectionSelectedInformation'

export default function SectionAction() {
  const {
    state: { showContent },
  } = useSalesShipmentCreateContext()

  return (
    <div style={{ width: '100%' }}>
      <Row gutter={10}>
        <Col span={16}>
          <Card id="table_do">
            <SectionTableListDo />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <SectionSelectedInformation />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
