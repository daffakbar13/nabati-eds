import { Col, Row, Table, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { Spacer } from 'pink-lava-ui'
import { TableBilling } from '../columns'

interface BillingProps {
  data: any
}

const createDataList = (label: string, value: string) => ({ label, value })

export default function Billing(props: BillingProps) {
  const { data } = props
  const dataList = [
    createDataList('Order Type', data.billing_type_id),
    createDataList('Customer', data.customer_id),
    createDataList('Sales Org.', data.sales_org_id),
    createDataList('Plant', data.plant),
    createDataList('Salesman', data.salesman),
    createDataList('Doc. Date', data.billing_date),
    createDataList('GI Date', data.billing_date),
    createDataList('Delivery Date', data.billing_date),
    createDataList('SO Number', data.delivery_id),
    createDataList('DO Number', data.delivery_id),
    createDataList('Reference', data.customer_ref),
    createDataList('Created On', data.created_at.Time),
    createDataList('Created By', data.created_at.Valid),
    createDataList('Modified On', data.modified_at.Time),
    createDataList('Modified By', data.modified_at.Valid),
  ]

  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          {dataList.slice(0, 5).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(5, 9).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(9).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={TableBilling} dataSource={[]} />
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
            <Total label="Total Amount" value={123} largeSize />
          </div>
        </Col>
      </Row>
    </>
  )
}
