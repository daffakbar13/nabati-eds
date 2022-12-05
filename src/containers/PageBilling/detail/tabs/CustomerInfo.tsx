import { Col, Divider, Row } from 'antd'
import React from 'react'
import { Table } from 'pink-lava-ui'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import useTable from 'src/hooks/useTable'
import { TableCustomerInfo } from '../columns'

interface CustomerInfoProps {
  data: any
}

// const DataList.createDataList = (label: string, value: string) => ({ label, value })

export default function CustomerInfo(props: CustomerInfoProps) {
  const { data } = props
  // const table = useTable({ api: '', columns: TableCustomerInfo })

  const customerInformation = [
    DataList.createDataList('Name', data?.customer_info?.customer_info?.name || ''),
    DataList.createDataList(
      'Active Customer',
      data?.customer_info?.customer_info?.active_customer ? 'Yes' : 'No',
    ),
    DataList.createDataList('Short Name', data?.customer_info?.customer_info?.short_name || ''),
    DataList.createDataList('KTP', data?.customer_info?.customer_info?.ktp || ''),
    DataList.createDataList('Phone Number', data?.customer_info?.customer_info?.phone_number || ''),
    DataList.createDataList('Email', data?.customer_info?.customer_info?.email || ''),
  ]

  const customerGroupInformation = [
    DataList.createDataList(
      'Customer Group',
      data?.customer_info?.customer_group_info?.customer_group || '',
    ),
    DataList.createDataList(
      'Customer Group 1',
      data?.customer_info?.customer_group_info?.customer_group1 || '',
    ),
    DataList.createDataList(
      'Customer Group 2',
      data?.customer_info?.customer_group_info?.customer_group2 || '',
    ),
    DataList.createDataList(
      'Customer Group 3',
      data?.customer_info?.customer_group_info?.customer_group3 || '',
    ),
    DataList.createDataList(
      'Customer Group 4',
      data?.customer_info?.customer_group_info?.customer_group4 || '',
    ),
    DataList.createDataList(
      'Customer Group 5',
      data?.customer_info?.customer_group_info?.customer_group5 || '',
    ),
  ]

  const companyInformation = [
    DataList.createDataList(
      'Sales Organization',
      data?.customer_info?.company_info?.sales_org || '',
    ),
    DataList.createDataList('Company', data?.customer_info?.company_info?.company || ''),
    DataList.createDataList('Branch', data?.customer_info?.company_info?.branch || ''),
    DataList.createDataList('Sloc', data?.customer_info?.company_info?.sloc || ''),
    DataList.createDataList('Sales Office', data?.customer_info?.company_info?.sales_office || ''),
    DataList.createDataList(
      'Sales Division',
      data?.customer_info?.company_info?.sales_division || '',
    ),
    DataList.createDataList(
      'Sales Channel',
      data?.customer_info?.company_info?.sales_channel || '',
    ),
    DataList.createDataList('Sales Group', data?.customer_info?.company_info?.sales_group || ''),
  ]

  const paymentInformation = [
    DataList.createDataList(
      'Term of Payment',
      data?.customer_info?.payment_info?.term_of_payment || '',
    ),
    DataList.createDataList(
      'Method of Payment',
      data?.customer_info?.payment_info?.method_payment || '',
    ),
    DataList.createDataList('Block', data?.customer_info?.payment_info?.block || ''),
    DataList.createDataList(
      'Credit Limit',
      data?.customer_info?.payment_info?.credit_limit?.toLocaleString() || '',
    ),
    DataList.createDataList(
      'Credit Limit Valid To',
      data?.customer_info?.payment_info?.credit_limit_valid_to?.toLocaleString() || '',
    ),
    DataList.createDataList(
      'Remaining Credit Limit',
      data?.customer_info?.payment_info?.remaining_credit_limit?.toLocaleString() || '',
    ),
    DataList.createDataList(
      'Status Overdue',
      data?.customer_info?.payment_info?.status_overdue || '',
    ),
    DataList.createDataList('Price Group', data?.customer_info?.payment_info?.price_group || ''),
    DataList.createDataList(
      'Taxable Enter Num. (SPPKP)',
      data?.customer_info?.payment_info?.taxable_enter_num || '',
    ),
    DataList.createDataList('Risk Class', data?.customer_info?.payment_info?.risk_class || ''),
    DataList.createDataList(
      'Modified Date',
      data?.customer_info?.payment_info?.modified_date || '',
    ),
    DataList.createDataList('Price List', data?.customer_info?.payment_info?.price_list || ''),
    DataList.createDataList('Tax Subject', data?.customer_info?.payment_info?.tax_subject || ''),
    DataList.createDataList(
      'Tax Reg Num. (NPWP)',
      data?.customer_info?.payment_info?.tax_reg_num || '',
    ),
    DataList.createDataList('Rules', data?.customer_info?.payment_info?.rules || ''),
    DataList.createDataList('Check Rule', data?.customer_info?.payment_info?.check_rule || ''),
    DataList.createDataList('Inco 1', data?.customer_info?.payment_info?.inco1 || ''),
    DataList.createDataList('Inco 2', data?.customer_info?.payment_info?.inco2 || ''),
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
      <Table scroll={{ x: 'max-content', y: 600 }} dataSource={[]} columns={TableCustomerInfo} />
    </>
  )
}
