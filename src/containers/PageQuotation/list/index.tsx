import React from 'react'
import { Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Col, Row } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { SectionAction, SectionConfirm, SectionLoader, SectionTable } from './sections'
import SalesQuotationListProvider from './_provider'
import { useTableProduct } from '../create/useTableProduct'

export default function PageQuotation() {
  const titlePage = useTitlePage('list')
  const table = useTableProduct()

  return (
    <SalesQuotationListProvider>
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
            <div style={{ display: 'flex', overflow: 'scroll' }}>
              <Table dataSource={table.data} columns={table.columns} />
            </div>
          </Card>
        </Col>
      </Row>
      <SectionConfirm />
      <SectionLoader />
    </SalesQuotationListProvider>
  )
}
