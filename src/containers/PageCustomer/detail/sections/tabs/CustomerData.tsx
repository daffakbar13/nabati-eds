/* eslint-disable camelcase */
import React from 'react'
import { AllDataCustomer, TableInformation } from 'src/components/TabCustomerInfo/types'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { concatString } from 'src/utils/concatString'
import dateFormat from 'src/utils/dateFormat'
import { Table } from 'pink-lava-ui'
import { Col, Divider, Row } from 'antd'
import TitleDataList from 'src/components/TitleDataList'
import DataList from 'src/components/DataList'

const LimitData = {
  'Customer Information': 3,
  'Customer Group Information': 4,
  'Company Information': 4,
  'Payment Information': 9,
}

export default function CustomerData() {
  const {
    state: { data },
  } = useSalesQuotationDetailContext()
  const { customer, customer_group, customer_sales_data, salesman } = data!

  const dataCustomer: AllDataCustomer = {
    'Customer Information': {
      Name: concatString(customer?.id, customer?.name),
      'Active Customer': customer?.is_active ? 'Yes' : 'No',
      KTP: customer?.ktp,
      'Short Name': customer?.short_name,
      'Phone Number': customer?.phone,
      Email: customer?.email,
    },
    'Customer Group Information': {
      'Customer Group': concatString(
        customer_group?.customer_group_id,
        customer_group?.customer_group_name,
      ),
      'Customer Group 1': concatString(
        customer_group?.customer_group_1_id,
        customer_group?.customer_group_1_name,
      ),
      'Customer Group 2': concatString(
        customer_group?.customer_group_2_id,
        customer_group?.customer_group_2_name,
      ),
      'Customer Group 3': concatString(
        customer_group?.customer_group_3_id,
        customer_group?.customer_group_3_name,
      ),
      'Customer Group 4': concatString(
        customer_group?.customer_group_4_id,
        customer_group?.customer_group_4_name,
      ),
      'Customer Group 5': concatString(
        customer_group?.customer_group_5_id,
        customer_group?.customer_group_5_name,
      ),
    },
    'Company Information': {
      'Sales Organization': concatString(
        customer_sales_data?.sales_org_id,
        customer_sales_data?.sales_org_name,
      ),
      Company: concatString(customer_sales_data?.company_id, customer_sales_data?.company_name),
      Branch: concatString(customer_sales_data?.branch_id, customer_sales_data?.branch_name),
      Stock: concatString(customer_sales_data?.sloc_id, customer_sales_data?.sloc_name),
      'Sales Office': concatString(
        customer_sales_data?.sales_offfice_id,
        customer_sales_data?.sales_offfice_name,
      ),
      'Sales Division': concatString(
        customer_sales_data?.division_id,
        customer_sales_data?.division_name,
      ),
      'Sales Channel': concatString(
        customer_sales_data?.channel_id,
        customer_sales_data?.channel_name,
      ),
      'Sales Group': concatString(
        customer_sales_data?.sales_group_id,
        customer_sales_data?.sales_group_name,
      ),
    },
    'Payment Information': {
      'Term of Payment': concatString(customer_sales_data?.term_id, customer_sales_data?.term_name),
      'Method of Payment': concatString(
        customer_sales_data?.payment_method_id,
        customer_sales_data?.payment_method_name,
      ),
      Block: customer_sales_data?.is_blocked ? 'Yes' : 'No',
      'Credit Limit': customer_sales_data?.credit_limit?.toString(),
      'Credit Limit Valid To': dateFormat(customer_sales_data?.credit_limit_valid_to),
      'Remaining Credit Limit': customer_sales_data?.credit_limit_usage?.toString(),
      'Status Overdue': customer_sales_data?.is_overdue ? 'Active' : 'Non Active',
      'Price Group': customer_sales_data?.price_group_name,
      'Taxable Enter Num. (SPPKP)': customer_sales_data?.taxable,
      'Risk Class': concatString(
        customer_sales_data?.risk_class_id,
        customer_sales_data?.risk_class_name,
      ),
      'Modified Date': customer_sales_data?.modified_at,
      'Price List': concatString(
        customer_sales_data?.price_list_id,
        customer_sales_data?.price_list_name,
      ),
      'Tax Subject': customer_sales_data?.tax_subject ? 'With Tax' : 'Without Tax',
      'Tax Reg Num. (NPWP)': customer_sales_data?.tax_reg_num,
      Rules: concatString(customer_sales_data?.rules, customer_sales_data?.rule_name),
      'Check Rule': concatString(
        customer_sales_data?.check_rule_id,
        customer_sales_data?.check_rule_name,
      ),
      'Inco 1': customer_sales_data?.incoterm1,
      'Inco 2': customer_sales_data?.incoterm2,
    },
  }

  const dataList = Object.keys(dataCustomer).map((title) => ({
    title,
    content: Object.keys(dataCustomer[title]).map((value) =>
      DataList.createDataList(value, dataCustomer[title][value]),
    ),
    limit: LimitData[title],
  }))

  // const dataTable: TableInformation[] = salesman.map(
  //   ({ salesman_id, salesman_name, salesman_group_id, salesman_group_name }) => {
  //     return {
  //       Salesman: concatString(salesman_id, salesman_name),
  //       'Salesman Group': concatString(salesman_group_id, salesman_group_name),
  //     }
  //   },
  // )

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
      {/* <Table
        dataSource={dataTable}
        columns={[
          { title: 'Salesman', dataIndex: 'Salesman' },
          { title: 'Salesman Group', dataIndex: 'Salesman Group' },
        ]}
        scroll={{ x: 'max-content' }}
      /> */}
    </>
  )
}
