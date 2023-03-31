import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { Spacer, Table } from 'pink-lava-ui'
import { ColumnsQuotation } from 'src/containers/PageQuotation/detail/columns'

interface QuotationProps {}

export default function Quotation(props: QuotationProps) {
  const {} = props
  const dataList = [
    DataList.createDataList('Quotation', 'ZOP1'),
    DataList.createDataList('Customer', 'ZOP1'),
    DataList.createDataList('Sales Org.', 'ZOP1'),
    DataList.createDataList('Plant', 'ZOP1'),
    DataList.createDataList('Salesman', 'ZOP1'),
    DataList.createDataList('Doc. Date', 'ZOP1'),
    DataList.createDataList('Valid From', 'ZOP1'),
    DataList.createDataList('Valid To', 'ZOP1'),
    DataList.createDataList('Delivery Date', 'ZOP1'),
    DataList.createDataList('Reference', 'ZOP1'),
    DataList.createDataList('Created On', 'ZOP1'),
    DataList.createDataList('Created By', 'ZOP1'),
    DataList.createDataList('Modified On', 'ZOP1'),
    DataList.createDataList('Modified By', 'ZOP1'),
    DataList.createDataList('Created From', 'ZOP1'),
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
        <Table columns={ColumnsQuotation} dataSource={[]} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <Total label="Total Amount" value={123} />
        </Col>
      </Row>
    </>
  )
}
