import { Col, Divider, Row, Table } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'

interface CustomerInfoProps {}

export default function CustomerInfo(props: CustomerInfoProps) {
  const {} = props

  const customerInformation = [
    DataList.createDataList('Name', 'Test123'),
    DataList.createDataList('Active Customer', 'Test123'),
    DataList.createDataList('Short Name', 'Test123'),
    DataList.createDataList('KTP', 'Test123'),
    DataList.createDataList('Phone Number', 'Test123'),
    DataList.createDataList('Email', 'Test123'),
  ]

  const customerGroupInformation = [
    DataList.createDataList('Customer Group', 'Test123'),
    DataList.createDataList('Customer Group 1', 'Test123'),
    DataList.createDataList('Customer Group 2', 'Test123'),
    DataList.createDataList('Customer Group 3', 'Test123'),
    DataList.createDataList('Customer Group 4', 'Test123'),
    DataList.createDataList('Customer Group 5', 'Test123'),
  ]

  const companyInformation = [
    DataList.createDataList('Sales Organization', 'Test123'),
    DataList.createDataList('Company', 'Test123'),
    DataList.createDataList('Branch', 'Test123'),
    DataList.createDataList('Sloc', 'Test123'),
    DataList.createDataList('Sales Office', 'Test123'),
    DataList.createDataList('Sales Division', 'Test123'),
    DataList.createDataList('Sales Channel', 'Test123'),
    DataList.createDataList('Sales Group', 'Test123'),
  ]

  const paymentInformation = [
    DataList.createDataList('Term of Payment', 'Test123'),
    DataList.createDataList('Method of Payment', 'Test123'),
    DataList.createDataList('Block', 'Test123'),
    DataList.createDataList('Credit Limit', 'Test123'),
    DataList.createDataList('Credit Limit Valid To', 'Test123'),
    DataList.createDataList('Remaining Credit Limit', 'Test123'),
    DataList.createDataList('Status Overdue', 'Test123'),
    DataList.createDataList('Price Group', 'Test123'),
    DataList.createDataList('Taxable Enter Num. (SPPKP)', 'Test123'),
    DataList.createDataList('Risk Class', 'Test123'),
    DataList.createDataList('Modified Date', 'Test123'),
    DataList.createDataList('Price List', 'Test123'),
    DataList.createDataList('Tax Subject', 'Test123'),
    DataList.createDataList('Tax Reg Num. (NPWP)', 'Test123'),
    DataList.createDataList('Rules', 'Test123'),
    DataList.createDataList('Check Rule', 'Test123'),
    DataList.createDataList('Inco 1', 'Test123'),
    DataList.createDataList('Inco 2', 'Test123'),
  ]

  const dataList = [
    { title: 'Customer Information', content: customerInformation, limit: 3 },
    { title: 'Customer Group Information', content: customerGroupInformation, limit: 4 },
    { title: 'Company Information', content: companyInformation, limit: 4 },
    { title: 'Payment Information', content: paymentInformation, limit: 9 },
  ]

  return (
    <>
      {dataList.map(({ content, limit, title }) => (
        <>
          <Row>
            <TitleDataList title={title} />
          </Row>
          <Row>
            <Col span={12}>
              {content.slice(0, limit).map(({ label, value }, index) => (
                <DataList key={index} label={label} value={value} />
              ))}
            </Col>
            <Col span={12}>
              {content.slice(limit).map(({ label, value }, index) => (
                <DataList key={index} label={label} value={value} />
              ))}
            </Col>
          </Row>
          <Divider />
        </>
      ))}
      <Table dataSource={[]} columns={table.columns} />
    </>
  )
}
