import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { Spacer, Table } from 'pink-lava-ui'
import { TableBilling } from '../columns'

interface BillingProps {
  data: any
}

// const DataList.createDataList = (label: string, value: string) => ({ label, value })

export default function Billing(props: BillingProps) {
  const { data } = props
  const dataList = [
    DataList.createDataList('Order Type', data.billing_type_id),
    DataList.createDataList('Customer', data.customer_id),
    DataList.createDataList('Sales Org.', data.sales_org_id),
    DataList.createDataList('Plant', data.plant),
    DataList.createDataList('Salesman', data.salesman),
    DataList.createDataList('Doc. Date', data.billing_date),
    DataList.createDataList('GI Date', data.billing_date),
    DataList.createDataList('Delivery Date', data.billing_date),
    DataList.createDataList('SO Number', data.delivery_id),
    DataList.createDataList('DO Number', data.delivery_id),
    DataList.createDataList('Created On', data.created_at?.Time),
    DataList.createDataList('Created By', data.created_at?.Valid),
    DataList.createDataList('Modified On', data.modified_at?.Time),
    DataList.createDataList('Modified By', data.modified_at?.Valid),
  ]

  console.log('billing item :', data.billing_item)

  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          {dataList.slice(0, 5).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(5, 10).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(10).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={TableBilling} data={data.billing_item} />
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
