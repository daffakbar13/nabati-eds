import { Col, Row, Divider } from 'antd'
import { Table, Spacer } from 'pink-lava-ui'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'

import { TablePricingCondition } from '../columns'

interface PricingConditionProps {}

const createDataList = (label: string, value: string) => ({ label, value })

export default function PricingCondition(props: PricingConditionProps) {
  const {} = props
  const table = useTable({ api: '', columns: TablePricingCondition })

  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          <DataList label="Pricing Date" value="12 April 2022" />
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={table.columns} dataSource={[]} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Total label="Total Gross" value={123} />
            <Total label="Total DPP" value={123} />
            <Total label="Total Disc" value={123} />
            <Total label="Total Net" value={123} />
            <Total label="Total Tax" value={123} />
          </div>
        </Col>
      </Row>
    </>
  )
}
