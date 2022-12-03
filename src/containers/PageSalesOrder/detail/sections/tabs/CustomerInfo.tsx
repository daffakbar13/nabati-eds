/* eslint-disable camelcase */
import React from 'react'
import { TabCustomerInfo } from 'src/components'
import { AllDataCustomer, TableInformation } from 'src/components/TabCustomerInfo/types'
import { concatString } from 'src/utils/concatString'
import dateFormat from 'src/utils/dateFormat'

interface CustomerInfoProps {
  data: any
}

export default function CustomerInfo(props: CustomerInfoProps) {
  const { data } = props
  const { customer_sales, salesman } = data

  const dataCustomer: AllDataCustomer = {
    'Customer Information': {
      Name: concatString(data.customer_id, data.customer_name),
      'Active Customer': customer_sales.is_active ? 'Yes' : 'No',
      KTP: data.customer_id_card,
      'Short Name': data.customer_short_name,
      'Phone Number': data.customer_phone_number,
      Email: data.customer_email,
    },
    'Customer Group Information': {
      'Customer Group': concatString(
        customer_sales.customer_group_id,
        customer_sales.customer_group_name,
      ),
      'Customer Group 1': concatString(
        customer_sales.customer_group1_id,
        customer_sales.customer_group1_name,
      ),
      'Customer Group 2': concatString(
        customer_sales.customer_group2_id,
        customer_sales.customer_group2_name,
      ),
      'Customer Group 3': concatString(
        customer_sales.customer_group3_id,
        customer_sales.customer_group3_name,
      ),
      'Customer Group 4': concatString(
        customer_sales.customer_group4_id,
        customer_sales.customer_group4_name,
      ),
      'Customer Group 5': concatString(
        customer_sales.customer_group5_id,
        customer_sales.customer_group5_name,
      ),
    },
    'Company Information': {
      'Sales Organization': concatString(data.sales_org_id, data.sales_org_name),
      Company: concatString(data.company_id, data.company_name),
      Branch: concatString(data.branch_id, data.branch_name),
      Stock: concatString(customer_sales.sloc_id, customer_sales.sloc_name),
      'Sales Office': concatString(data.sales_office_id, data.sales_office_name),
      'Sales Division': concatString(data.division_id, data.division_name),
      'Sales Channel': concatString(data.channel_id, data.channel_name),
      'Sales Group': concatString(data.sales_group_id, data.sales_group_name),
    },
    'Payment Information': {
      'Term of Payment': concatString(customer_sales.term_id, customer_sales.term_name),
      'Method of Payment': concatString(
        customer_sales.payment_method,
        customer_sales.payment_method_name,
      ),
      Block: customer_sales.is_blocked ? 'Yes' : 'No',
      'Credit Limit': customer_sales.credit_limit.toString(),
      'Credit Limit Valid To': dateFormat(customer_sales.credit_limit_valid_to, 'DD MMMM YYYY'),
      'Remaining Credit Limit': customer_sales.credit_limit_usage.toString(),
      'Status Overdue': customer_sales.is_overdue ? 'Active' : 'Non Active',
      'Price Group': customer_sales.price_group_name,
      'Taxable Enter Num. (SPPKP)': customer_sales.taxable,
      'Risk Class': customer_sales.risk_class,
      'Modified Date': customer_sales.modified_at,
      'Price List': customer_sales.price_list_id,
      'Tax Subject': customer_sales.tax_subject ? 'With Tax' : 'Without Tax',
      'Tax Reg Num. (NPWP)': customer_sales.tax_reg_num,
      Rules: concatString(customer_sales.rules, customer_sales.rule_name),
      'Check Rule': concatString(customer_sales.check_rule, customer_sales.check_rule_name),
      'Inco 1': customer_sales.incoterm1,
      'Inco 2': customer_sales.incoterm2,
    },
  }

  const dataTable: TableInformation = {
    Salesman: concatString(salesman.id, salesman.name),
    'Salesman Group': concatString(salesman.salesman_group_id, salesman.salesman_group_name),
  }

  return <TabCustomerInfo data={dataCustomer} table={dataTable} />
}
