/* eslint-disable camelcase */
import { Col, Divider, Row } from 'antd'
import { Table } from 'pink-lava-ui';
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import { concatString } from 'src/utils/concatString';
import dateFormat from 'src/utils/dateFormat'
import { ColumnsCustomerInfo } from '../columns'

interface CustomerInfoProps {
  data: any
}

const CreateDataList = (label: string, value: string) => ({ label, value: value || '-' })

export default function CustomerInfo(props: CustomerInfoProps) {
  const { data } = props
  const { customer_sales, salesman } = data

  const customerInformation = [
    CreateDataList('Name', [data.customer_id, data.customer_name].join(' - ')),
    CreateDataList('Active Customer', customer_sales.is_active ? 'Yes' : 'No'),
    CreateDataList('Short Name', data.customer_short_name),
    CreateDataList('KTP', data.customer_id_card),
    CreateDataList('Phone Number', data.customer_phone_number),
    CreateDataList('Email', data.customer_email),
  ]

  const customerGroupInformation = [
    CreateDataList(
      'Customer Group',
      concatString(customer_sales.customer_group_id, customer_sales.customer_group_name),
    ),
    CreateDataList(
      'Customer Group 1',
      concatString(customer_sales.customer_group1_id, customer_sales.customer_group1_name),
    ),
    CreateDataList(
      'Customer Group 2',
      concatString(customer_sales.customer_group2_id, customer_sales.customer_group2_name),
    ),
    CreateDataList(
      'Customer Group 3',
      concatString(customer_sales.customer_group3_id, customer_sales.customer_group3_name),
    ),
    CreateDataList(
      'Customer Group 4',
      concatString(customer_sales.customer_group4_id, customer_sales.customer_group4_name),
    ),
    CreateDataList(
      'Customer Group 5',
      concatString(customer_sales.customer_group5_id, customer_sales.customer_group5_name),
    ),
  ]

  const companyInformation = [
    CreateDataList('Sales Organization', data.sales_org_name),
    CreateDataList('Company', data.company_id),
    CreateDataList('Branch', data.branch_name),
    CreateDataList('Stock', concatString(customer_sales.sloc_id, customer_sales.sloc_name)),
    CreateDataList('Sales Office', data.sales_office_id),
    CreateDataList('Sales Division', data.division_id),
    CreateDataList('Sales Channel', data.channel_id),
    CreateDataList('Sales Group', data.sales_group_id),
  ]

  const paymentInformation = [
    CreateDataList(
      'Term of Payment',
      concatString(customer_sales.term_id, customer_sales.term_name),
    ),
    CreateDataList(
      'Method of Payment',
      concatString(customer_sales.payment_method, customer_sales.payment_method_name),
    ),
    CreateDataList('Block', customer_sales.is_blocked ? 'Yes' : 'No'),
    CreateDataList('Credit Limit', customer_sales.credit_limit.toString()),
    CreateDataList(
      'Credit Limit Valid To',
      dateFormat(customer_sales.credit_limit_valid_to, 'DD MMMM YYYY'),
    ),
    CreateDataList('Remaining Credit Limit', customer_sales.credit_limit_usage.toString()),
    CreateDataList('Status Overdue', customer_sales.is_overdue ? 'Active' : 'Non Active'),
    CreateDataList('Price Group', customer_sales.price_group_name),
    CreateDataList('Taxable Enter Num. (SPPKP)', customer_sales.taxable),
    CreateDataList('Risk Class', customer_sales.risk_class),
    CreateDataList('Modified Date', customer_sales.modified_at),
    CreateDataList('Price List', customer_sales.price_list_id),
    CreateDataList('Tax Subject', customer_sales.tax_subject ? 'With Tax' : 'Without Tax'),
    CreateDataList('Tax Reg Num. (NPWP)', customer_sales.tax_reg_num),
    CreateDataList('Rules', concatString(customer_sales.rules, customer_sales.rule_name)),
    CreateDataList(
      'Check Rule',
      concatString(customer_sales.check_rule, customer_sales.check_rule_name),
    ),
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
