import { Col, Row, Divider } from 'antd'
import { Table, Spacer } from 'pink-lava-ui'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import dateFormat from 'src/utils/dateFormat'
import { ColumnsPricingCondition } from '../columns'

interface PricingConditionProps {
  data: any
}

export default function PricingCondition(props: PricingConditionProps) {
  const { data } = props

  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          <DataList label="Pricing Date" value={dateFormat(data.pricing_date, 'DD MMMM YYYY')} />
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={ColumnsPricingCondition} dataSource={data.items} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Total label="Total Gross" value={data.gross_total_amount} />
            <Total label="Total DPP" value={data.dpp_total_amount} />
            <Total label="Total Disc" value={data.discount_total_amount} />
            <Total label="Total Net" value={data.net_total_amount} />
            <Total label="Total Tax" value={data.tax_total_amount} />
          </div>
        </Col>
      </Row>
    </>
  )
}
