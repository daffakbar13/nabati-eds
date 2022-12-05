import { Col, Divider, Row } from 'antd'
import React from 'react'
import { Table } from 'pink-lava-ui';
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import useTable from 'src/hooks/useTable'
import { TableCustomerInfo } from '../columns'

interface CustomerInfoProps {
  data: any
}

const CreateDataList = (label: string, value: string) => ({ label, value: value || '-' })

export default function CustomerInfo(props: CustomerInfoProps) {
  const { data } = props

  const customerInformation = [
    CreateDataList('Name', data.customer),
    CreateDataList('Active Customer', data.active),
    CreateDataList('Short Name', data.customer.short_name),
    CreateDataList('KTP', data.customer.id),
    CreateDataList('Phone Number', data.customer.phone),
    CreateDataList('Email', data.customer.email),
  ]

  const customerGroupInformation = [
    CreateDataList('Customer Group', data.customer_group?.name),
    CreateDataList('Customer Group 1', data.customer_group_1?.name),
    CreateDataList('Customer Group 2', data.customer_group_2?.name),
    CreateDataList('Customer Group 3', data.customer_group_3?.name),
    CreateDataList('Customer Group 4', data.customer_group_4?.name),
    CreateDataList('Customer Group 5', data.customer_group_5?.name),
  ]

  const companyInformation = [
    CreateDataList('Sales Organization', data.sales_org_name),
    CreateDataList('Company', data.company),
    CreateDataList('Branch', data.branch_name),
    CreateDataList('Sloc', data.sloc),
    CreateDataList('Sales Office', data.sales_office_id),
    CreateDataList('Sales Division', data.division_id),
    CreateDataList('Sales Channel', data.channel_id),
    CreateDataList('Sales Group', data.sales_group_id),
  ]

  const paymentInformation = [
    CreateDataList('Term of Payment', data.term_id),
    CreateDataList('Method of Payment', data.method),
    CreateDataList('Block', data.status_block_id),
    CreateDataList('Credit Limit', data.credit_limit),
    CreateDataList('Credit Limit Valid To', data.credit_limit_valid_to),
    CreateDataList('Remaining Credit Limit', data.remaining_credit_limit),
    CreateDataList('Status Overdue', data.status_overdue),
    CreateDataList('Price Group', data.price_group),
    CreateDataList('Taxable Enter Num. (SPPKP)', data.tax_enter_num),
    CreateDataList('Risk Class', data.risk_class),
    CreateDataList('Modified Date', data.modified_at),
    CreateDataList('Price List', data.price_list),
    CreateDataList('Tax Subject', data.tax_subject),
    CreateDataList('Tax Reg Num. (NPWP)', data.tax_reg_num),
    CreateDataList('Rules', data.rules),
    CreateDataList('Check Rule', data.check_rule),
    CreateDataList('Inco 1', data.inco_1),
    CreateDataList('Inco 2', data.inco_2),
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
      <Table dataSource={data.items} columns={TableCustomerInfo} />
    </>
  )
}
