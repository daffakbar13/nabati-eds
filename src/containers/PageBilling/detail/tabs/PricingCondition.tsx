import { Col, Row, Divider } from 'antd'
import { Table, Spacer } from 'pink-lava-ui'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'
import moment from 'moment'

import { TablePricingCondition } from '../columns'

interface PricingConditionProps {
  data: any
}

export default function PricingCondition(props: PricingConditionProps) {
  const { data } = props

  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          <DataList label="Pricing Date" value={moment(data.pricing_date).format('DD MMMM YYYY')} />
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table
          scroll={{ x: 'max-content' }}
          columns={TablePricingCondition}
          data={data.billing_item}
        />
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
            <Total label="Total Amount" value={data.total_amount} />
          </div>
        </Col>
      </Row>
    </>
  )
}
