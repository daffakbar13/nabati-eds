import { Col, Row, Divider } from 'antd'
import moment from 'moment'
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
    DataList.createDataList('Doc. Date', moment(data.doc_date).format('DD MMMM YYYY')),
    DataList.createDataList('GI Date', moment(data.gi_date).format('DD MMMM YYYY')),
    DataList.createDataList('Delivery Date', moment(data.delivery_date).format('DD MMMM YYYY')),
    DataList.createDataList('SO Number', data.delivery_id),
    DataList.createDataList('DO Number', data.delivery_id),
    DataList.createDataList('Created On', moment(data.created_at?.Time).format('DD MMMM YYYY')),
    DataList.createDataList('Created By', data.created_at?.Valid || '-'),
    DataList.createDataList('Modified On', moment(data.modified_at?.Time).format('DD MMMM YYYY')),
    DataList.createDataList('Modified By', data.modified_at?.Valid || '-'),
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
        <Table
          scroll={{ x: 'max-content', y: 600 }}
          columns={TableBilling}
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
            <Total label="Total Amount" value={data.total_amount} largeSize />
          </div>
        </Col>
      </Row>
    </>
  )
}
