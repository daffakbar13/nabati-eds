import React from 'react'
import { Text } from 'pink-lava-ui'
import { Card, Loader } from 'src/components'
import { Col, Row } from 'antd'
import useTable from 'src/hooks/useTable'
import useTitlePage from 'src/hooks/useTitlePage'
import { getSalesOrder } from 'src/api/sales-order'
import { useColumnSalesOrder } from './columns'
import { SectionAction, SectionConfirm, SectionTable } from './sections'

export default function PageSalesOrder() {
  const table = useTable({
    funcApi: getSalesOrder,
    haveCheckbox: { headCell: 'status_name', member: ['New'] },
    columns: useColumnSalesOrder,
  })
  const titlePage = useTitlePage('list')
  const [processing, setProcessing] = React.useState<string>()
  const [showConfirm, setShowConfirm] = React.useState<string>()

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Text variant={'h4'}>{titlePage}</Text>
      </Col>
      <Col span={24}>
        <Card>
          <SectionAction handleFilter={table.handleFilter} />
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <SectionTable table={table} handleShowConfirm={setShowConfirm} />
          <SectionConfirm
            handleProcess={setProcessing}
            table={table}
            showConfirm={showConfirm}
            handleShowConfirm={setShowConfirm}
          />
        </Card>
      </Col>
      {processing && <Loader type="process" text={processing} />}
    </Row>
  )
}
