/* eslint-disable camelcase */
import React from 'react'
import { TabCustomerInfo } from 'src/components'
import { concatString } from 'src/utils/concatString'
import { AllDataCustomer, TableInformation } from 'src/components/TabCustomerInfo/types'
import dateFormat from 'src/utils/dateFormat'

interface CustomerInfoProps {
  data: any
}

export default function CustomerInfo(props: CustomerInfoProps) {
  const { data } = props
  const {
    customer_detail: { customer_sales_data, customer, customer_group, salesman },
  } = data

  const dataCustomer: AllDataCustomer = {
    'Customer Information': {
      Name: concatString(data.customer),
      'Active Customer': customer.is_active ? 'Yes' : 'No',
      KTP: customer.ktp,
      'Short Name': customer.short_name,
      'Phone Number': customer.phone,
      Email: customer.email,
    },
    'Customer Group Information': {
      'Customer Group': concatString(
        customer_group.customer_group_id,
        customer_group.customer_group_name,
      ),
      'Customer Group 1': concatString(
        customer_group.customer_group_1_id,
        customer_group.customer_group_1_name,
      ),
      'Customer Group 2': concatString(
        customer_group.customer_group_2_id,
        customer_group.customer_group_2_name,
      ),
      'Customer Group 3': concatString(
        customer_group.customer_group_3_id,
        customer_group.customer_group_3_name,
      ),
      'Customer Group 4': concatString(
        customer_group.customer_group_4_id,
        customer_group.customer_group_4_name,
      ),
      'Customer Group 5': concatString(
        customer_group.customer_group_5_id,
        customer_group.customer_group_5_name,
      ),
    },
    'Company Information': {
      'Sales Organization': data.sales_org,
      Company: concatString(customer_sales_data.company_id, customer_sales_data.company_name),
      Branch: data.branch,
      Stock: customer_sales_data.sloc_id,
      'Sales Office': concatString(
        customer_sales_data.sales_offfice_id,
        customer_sales_data.sales_offfice_name,
      ),
      'Sales Division': concatString(
        customer_sales_data.division_id,
        customer_sales_data.division_name,
      ),
      'Sales Channel': concatString(
        customer_sales_data.channel_id,
        customer_sales_data.channel_name,
      ),
      'Sales Group': concatString(
        customer_sales_data.sales_group_id,
        customer_sales_data.sales_group_name,
      ),
    },
    'Payment Information': {
      'Term of Payment': concatString(customer_sales_data.term_id, customer_sales_data.term_name),
      'Method of Payment': concatString(
        customer_sales_data.payment_method_id,
        customer_sales_data.payment_method_name,
      ),
      Block: customer_sales_data.is_blocked ? 'Yes' : 'No',
      'Credit Limit': customer_sales_data.credit_limit.toString(),
      'Credit Limit Valid To': dateFormat(customer_sales_data.credit_limit_valid_to),
      'Remaining Credit Limit': customer_sales_data.credit_limit_usage.toString(),
      'Status Overdue': customer_sales_data.is_overdue ? 'Active' : 'Non Active',
      'Price Group': concatString(
        customer_sales_data.price_group_id,
        customer_sales_data.price_group_name,
      ),
      'Taxable Enter Num. (SPPKP)': customer_sales_data.taxable,
      'Risk Class': concatString(
        customer_sales_data.risk_class_id,
        customer_sales_data.risk_class_name,
      ),
      'Modified Date': dateFormat(data.modified_at),
      'Price List': concatString(
        customer_sales_data.price_list_id,
        customer_sales_data.price_list_name,
      ),
      'Tax Subject': customer_sales_data.tax_subject ? 'With Tax' : 'Without Tax',
      'Tax Reg Num. (NPWP)': customer_sales_data.tax_reg_num,
      Rules: customer_sales_data.rules,
      'Check Rule': concatString(
        customer_sales_data.check_rule_id,
        customer_sales_data.check_rule_name,
      ),
      'Inco 1': customer_sales_data.incoterm1,
      'Inco 2': customer_sales_data.incoterm2,
    },
  }

  const dataTable: TableInformation[] = salesman.map((s) => ({
    Salesman: concatString(s.salesman_id, s.salesman_name),
    'Salesman Group': concatString(s.salesman_group_id, s.salesman_group_name),
  }))

  return <TabCustomerInfo data={dataCustomer} table={dataTable} />
}
