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
  const { customer, customer_group, customer_sales_data } = data!

  const dataCustomer: AllDataCustomer = {
    'Customer Information': {
      Name: concatString(data?.id, data?.name),
      'Active Customer': data?.is_active ? 'Yes' : 'No',
      KTP: data?.ktp,
      'Short Name': data?.short_name,
      'Phone Number': data?.phone_number,
      Email: data?.email,
    },
    'Customer Group Information': {
      'Customer Group': concatString(
        customer_group?.customer_group_id,
        customer_group?.customer_group_name,
      ),
      'Customer Group 1': concatString(
        customer_group?.customer_group1_id,
        customer_group?.customer_group1_name,
      ),
      'Customer Group 2': concatString(
        customer_group?.customer_group2_id,
        customer_group?.customer_group2_name,
      ),
      'Customer Group 3': concatString(
        customer_group?.customer_group3_id,
        customer_group?.customer_group3_name,
      ),
      'Customer Group 4': concatString(
        customer_group?.customer_group4_id,
        customer_group?.customer_group4_name,
      ),
      'Customer Group 5': concatString(
        customer_group?.customer_group5_id,
        customer_group?.customer_group5_name,
      ),
    },
    'Company Information': {
      'Sales Organization': concatString(data?.sales_org_id, data?.sales_org_name),
      Company: concatString(data?.company_id, data?.company_name),
      Branch: concatString(data?.branch_id, data?.branch_name),
      Stock: concatString(data?.sloc_id, data?.sloc_name),
      'Sales Office': concatString(data?.sales_offfice_id, data?.sales_offfice_name),
      'Sales Division': concatString(data?.division_id, data?.division_name),
      'Sales Channel': concatString(data?.channel_id, data?.channel_name),
      'Sales Group': concatString(data?.sales_group_id, data?.sales_group_name),
    },
    'Payment Information': {
      'Term of Payment': concatString(data?.term_id, data?.term_name),
      'Method of Payment': concatString(data?.payment_method_id, data?.payment_method_name),
      Block: data?.is_blocked ? 'Yes' : 'No',
      'Credit Limit': data?.credit_limit?.toString(),
      'Credit Limit Valid To': dateFormat(data?.credit_limit_valid_to),
      'Remaining Credit Limit': data?.credit_limit_usage?.toString(),
      'Status Overdue': data?.is_overdue ? 'Active' : 'Non Active',
      'Price Group': data?.price_group_name,
      'Taxable Enter Num. (SPPKP)': data?.taxable,
      'Risk Class': concatString(data?.risk_class_id, data?.risk_class_name),
      'Modified Date': data?.modified_at,
      'Price List': concatString(data?.price_list_id, data?.price_list_name),
      'Tax Subject': data?.tax_subject ? 'With Tax' : 'Without Tax',
      'Tax Reg Num. (NPWP)': data?.tax_reg_num,
      Rules: concatString(data?.rules, data?.rule_name),
      'Check Rule': concatString(data?.check_rule_id, data?.check_rule_name),
      'Inco 1': data?.incoterm1,
      'Inco 2': data?.incoterm2,
    },
  }

  const dataList = Object.keys(dataCustomer).map((title) => ({
    title,
    content: Object.keys(dataCustomer[title]).map((value) =>
      DataList.createDataList(value, dataCustomer[title][value]),
    ),
    limit: LimitData[title],
  }))

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
    </>
  )
}
