import { Col } from 'antd'
import React from 'react'
import { Card } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import {
  SectionAction,
  SectionConfirm,
  SectionContent,
  SectionFilter,
  SectionLoader,
  SectionModalListDo,
  SectionModalDND,
} from './sections'
import PageShipmentCreateProvider from './_provider'

export default function PageShipmentCreate() {
  return (
    <>
      <PageShipmentCreateProvider>
        <Col>
          <Card>
            <SectionAction />
          </Card>
          <Spacer size={10} />
          <SectionFilter />
          <SectionContent />
        </Col>
        <SectionModalListDo />
        <SectionModalDND />
        <SectionLoader />
        <SectionConfirm />
      </PageShipmentCreateProvider>
    </>
  )
}
