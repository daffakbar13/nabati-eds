import { Col, Divider, Row, Table } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import useTable from 'src/hooks/useTable'
import { TableCustomerInfo } from '../columns'

interface CustomerInfoProps {
  data: any
}

const CreateDataList = (label: string, value: string) => ({ label, value })

export default function CustomerInfo(props: CustomerInfoProps) {
  const {} = props
  const table = useTable({ api: '', columns: TableCustomerInfo })

  const customerInformation = [
    CreateDataList('Name', 'Test123'),
    CreateDataList('Active Customer', 'Test123'),
    CreateDataList('Short Name', 'Test123'),
    CreateDataList('KTP', 'Test123'),
    CreateDataList('Phone Number', 'Test123'),
    CreateDataList('Email', 'Test123'),
  ]

  const customerGroupInformation = [
    CreateDataList('Customer Group', 'Test123'),
    CreateDataList('Customer Group 1', 'Test123'),
    CreateDataList('Customer Group 2', 'Test123'),
    CreateDataList('Customer Group 3', 'Test123'),
    CreateDataList('Customer Group 4', 'Test123'),
    CreateDataList('Customer Group 5', 'Test123'),
  ]

  const companyInformation = [
    CreateDataList('Sales Organization', 'Test123'),
    CreateDataList('Company', 'Test123'),
    CreateDataList('Branch', 'Test123'),
    CreateDataList('Sloc', 'Test123'),
    CreateDataList('Sales Office', 'Test123'),
    CreateDataList('Sales Division', 'Test123'),
    CreateDataList('Sales Channel', 'Test123'),
    CreateDataList('Sales Group', 'Test123'),
  ]

  const paymentInformation = [
    CreateDataList('Term of Payment', 'Test123'),
    CreateDataList('Method of Payment', 'Test123'),
    CreateDataList('Block', 'Test123'),
    CreateDataList('Credit Limit', 'Test123'),
    CreateDataList('Credit Limit Valid To', 'Test123'),
    CreateDataList('Remaining Credit Limit', 'Test123'),
    CreateDataList('Status Overdue', 'Test123'),
    CreateDataList('Price Group', 'Test123'),
    CreateDataList('Taxable Enter Num. (SPPKP)', 'Test123'),
    CreateDataList('Risk Class', 'Test123'),
    CreateDataList('Modified Date', 'Test123'),
    CreateDataList('Price List', 'Test123'),
    CreateDataList('Tax Subject', 'Test123'),
    CreateDataList('Tax Reg Num. (NPWP)', 'Test123'),
    CreateDataList('Rules', 'Test123'),
    CreateDataList('Check Rule', 'Test123'),
    CreateDataList('Inco 1', 'Test123'),
    CreateDataList('Inco 2', 'Test123'),
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
