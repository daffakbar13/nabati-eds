/* eslint-disable camelcase */
import { Col, Divider, Row } from 'antd'
import { Table } from 'pink-lava-ui';
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import dateFormat from 'src/utils/dateFormat'
import { ColumnsCustomerInfo } from '../columns'

interface CustomerInfoProps {
  data: any
}

const CreateDataList = (label: string, value: string) => ({ label, value })

export default function CustomerInfo(props: CustomerInfoProps) {
  const { data } = props
  // const table = useTable({ api: '', columns: ColumnsCustomerInfo })
  const { customer_sales, salesman } = data

  const customerInformation = [
    CreateDataList('Name', [data.customer_id, data.customer_name].join(' - ')),
    // FIXME Active Customer
    CreateDataList('Active Customer', customer_sales.is_active ? 'Yes' : 'No'),
    // FIXME Short Name
    CreateDataList('Short Name', data.customer_short_name),
    // FIXME KTP
    CreateDataList('KTP', customer_sales.id),
    CreateDataList('Phone Number', customer_sales.phone),
    // FIXME EMAIL
    CreateDataList('Email', customer_sales.email),
  ]

  // FIXME Customer Group
  const customerGroupInformation = [
    CreateDataList('Customer Group', customer_sales.customer_group_name),
    CreateDataList('Customer Group 1', customer_sales.customer_group1_name),
    CreateDataList('Customer Group 2', customer_sales.customer_group2_name),
    CreateDataList('Customer Group 3', customer_sales.customer_group3_name),
    CreateDataList('Customer Group 4', customer_sales.customer_group4_name),
    CreateDataList('Customer Group 5', customer_sales.customer_group5_name),
  ]

  const companyInformation = [
    CreateDataList('Sales Organization', data.sales_org_name),
    CreateDataList('Company', data.company_id),
    CreateDataList('Branch', data.branch_name),
    // FIXME Sloc
    CreateDataList('Sloc', customer_sales.sloc_name),
    CreateDataList('Sales Office', data.sales_office_id),
    CreateDataList('Sales Division', data.division_id),
    CreateDataList('Sales Channel', data.channel_id),
    CreateDataList('Sales Group', data.sales_group_id),
  ]

  // FIXME Payment / Credit Limit
  const paymentInformation = [
    CreateDataList('Term of Payment', customer_sales.term_name),
    CreateDataList('Method of Payment', customer_sales.payment_method),
    CreateDataList('Block', customer_sales.is_blocked),
    CreateDataList('Credit Limit', customer_sales.credit_limit),
    CreateDataList('Credit Limit Valid To', dateFormat(customer_sales.credit_limit_valid_to, 'DD MMMM YYYY')),
    CreateDataList('Remaining Credit Limit', customer_sales.credit_limit_usage),
    CreateDataList('Status Overdue', customer_sales.is_overdue),
    CreateDataList('Price Group', customer_sales.price_group_name),
    CreateDataList('Taxable Enter Num. (SPPKP)', customer_sales.taxable),
    CreateDataList('Risk Class', customer_sales.risk_class),
    CreateDataList('Modified Date', customer_sales.modified_at),
    CreateDataList('Price List', customer_sales.price_list_id),
    CreateDataList('Tax Subject', customer_sales.tax_subject),
    CreateDataList('Tax Reg Num. (NPWP)', customer_sales.tax_reg_num),
    CreateDataList('Rules', customer_sales.rules),
    CreateDataList('Check Rule', customer_sales.check_rule),
    CreateDataList('Inco 1', customer_sales.incoterm1),
    CreateDataList('Inco 2', customer_sales.incoterm2),
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
      <Table dataSource={[salesman]} columns={ColumnsCustomerInfo} />
    </>
  )
}
