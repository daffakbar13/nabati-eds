/* eslint-disable camelcase */
import { Col, Divider, Row } from 'antd'
import { Table } from 'pink-lava-ui'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import { concatString } from 'src/utils/concatString'
import dateFormat from 'src/utils/dateFormat'
import { ColumnsCustomerInfo } from '../../columns'

interface CustomerInfoProps {
  data: any
}

export default function CustomerInfo(props: CustomerInfoProps) {
  const { data } = props
  const { customer_sales, salesman } = data

  const customerInformation = [
    DataList.createDataList('Name', [data.customer_id, data.customer_name].join(' - ')),
    DataList.createDataList('Active Customer', customer_sales.is_active ? 'Yes' : 'No'),
    DataList.createDataList('Short Name', data.customer_short_name),
    DataList.createDataList('KTP', data.customer_id_card),
    DataList.createDataList('Phone Number', data.customer_phone_number),
    DataList.createDataList('Email', data.customer_email),
  ]

  const customerGroupInformation = [
    DataList.createDataList(
      'Customer Group',
      concatString(customer_sales.customer_group_id, customer_sales.customer_group_name),
    ),
    DataList.createDataList(
      'Customer Group 1',
      concatString(customer_sales.customer_group1_id, customer_sales.customer_group1_name),
    ),
    DataList.createDataList(
      'Customer Group 2',
      concatString(customer_sales.customer_group2_id, customer_sales.customer_group2_name),
    ),
    DataList.createDataList(
      'Customer Group 3',
      concatString(customer_sales.customer_group3_id, customer_sales.customer_group3_name),
    ),
    DataList.createDataList(
      'Customer Group 4',
      concatString(customer_sales.customer_group4_id, customer_sales.customer_group4_name),
    ),
    DataList.createDataList(
      'Customer Group 5',
      concatString(customer_sales.customer_group5_id, customer_sales.customer_group5_name),
    ),
  ]

  const companyInformation = [
    DataList.createDataList(
      'Sales Organization',
      concatString(data.sales_org_id, data.sales_org_name),
    ),
    DataList.createDataList('Company', concatString(data.company_id, data.company_name)),
    DataList.createDataList('Branch', concatString(data.branch_id, data.branch_name)),
    DataList.createDataList(
      'Stock',
      concatString(customer_sales.sloc_id, customer_sales.sloc_name),
    ),
    DataList.createDataList(
      'Sales Office',
      concatString(data.sales_office_id, data.sales_office_name),
    ),
    DataList.createDataList('Sales Division', concatString(data.division_id, data.division_name)),
    DataList.createDataList('Sales Channel', concatString(data.channel_id, data.channel_name)),
    DataList.createDataList(
      'Sales Group',
      concatString(data.sales_group_id, data.sales_group_name),
    ),
  ]

  const paymentInformation = [
    DataList.createDataList(
      'Term of Payment',
      concatString(customer_sales.term_id, customer_sales.term_name),
    ),
    DataList.createDataList(
      'Method of Payment',
      concatString(customer_sales.payment_method, customer_sales.payment_method_name),
    ),
    DataList.createDataList('Block', customer_sales.is_blocked ? 'Yes' : 'No'),
    DataList.createDataList('Credit Limit', customer_sales.credit_limit.toString()),
    DataList.createDataList(
      'Credit Limit Valid To',
      dateFormat(customer_sales.credit_limit_valid_to, 'DD MMMM YYYY'),
    ),
    DataList.createDataList('Remaining Credit Limit', customer_sales.credit_limit_usage.toString()),
    DataList.createDataList('Status Overdue', customer_sales.is_overdue ? 'Active' : 'Non Active'),
    DataList.createDataList('Price Group', customer_sales.price_group_name),
    DataList.createDataList('Taxable Enter Num. (SPPKP)', customer_sales.taxable),
    DataList.createDataList('Risk Class', customer_sales.risk_class),
    DataList.createDataList('Modified Date', customer_sales.modified_at),
    DataList.createDataList('Price List', customer_sales.price_list_id),
    DataList.createDataList('Tax Subject', customer_sales.tax_subject ? 'With Tax' : 'Without Tax'),
    DataList.createDataList('Tax Reg Num. (NPWP)', customer_sales.tax_reg_num),
    DataList.createDataList('Rules', concatString(customer_sales.rules, customer_sales.rule_name)),
    DataList.createDataList(
      'Check Rule',
      concatString(customer_sales.check_rule, customer_sales.check_rule_name),
    ),
    DataList.createDataList('Inco 1', customer_sales.incoterm1),
    DataList.createDataList('Inco 2', customer_sales.incoterm2),
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
