import { Col, Row, Divider } from 'antd'
import moment from 'moment'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { Spacer, Table } from 'pink-lava-ui'
import { TableDocumentAccounting } from '../columns'

interface DocumentAccountingProps {
  data: any
}

// const DataList.createDataList = (label: string, value: string) => ({ label, value })

export default function DocumentAccounting(props: DocumentAccountingProps) {
  const { data } = props
  const dataList = [
    DataList.createDataList('Document Number', data.billing_type_id),
    DataList.createDataList('Document Date', data.customer_id),
    DataList.createDataList('Posting Date.', data.sales_org_id),
    DataList.createDataList('Reference', data.plant),
    DataList.createDataList('Header', data.salesman),
    DataList.createDataList('Document Type', moment(data.doc_date).format('DD MMMM YYYY')),
    DataList.createDataList('Company Code', moment(data.gi_date).format('DD MMMM YYYY')),
    DataList.createDataList('Currency', moment(data.delivery_date).format('DD MMMM YYYY')),
    DataList.createDataList('Exchange Rate', data.delivery_id),
  ]

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          {dataList.slice(0, 5).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={12}>
          {dataList.slice(5, 10).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table
          scroll={{ x: 'max-content' }}
          columns={TableDocumentAccounting}
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
