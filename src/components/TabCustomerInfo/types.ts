/* eslint-disable no-shadow */
export interface CustomerInformation {
  readonly Name: string
  readonly 'Active Customer': string
  readonly 'Short Name': string
  readonly KTP: string
  readonly 'Phone Number': string
  readonly Email: string
}

export interface CustomerGroupInformation {
  readonly 'Customer Group': string
  readonly 'Customer Group 1': string
  readonly 'Customer Group 2': string
  readonly 'Customer Group 3': string
  readonly 'Customer Group 4': string
  readonly 'Customer Group 5': string
}

export interface CompanyInformation {
  readonly 'Sales Organization': string
  readonly Company: string
  readonly Branch: string
  readonly Stock: string
  readonly 'Sales Office': string
  readonly 'Sales Division': string
  readonly 'Sales Channel': string
  readonly 'Sales Group': string
}

export interface PaymentInformation {
  readonly 'Term of Payment': string
  readonly 'Method of Payment': string
  readonly Block: string
  readonly 'Credit Limit': string
  readonly 'Credit Limit Valid To': string
  readonly 'Remaining Credit Limit': string
  readonly 'Status Overdue': string
  readonly 'Price Group': string
  readonly 'Taxable Enter Num. (SPPKP)': string
  readonly 'Risk Class': string
  readonly 'Modified Date': string
  readonly 'Price List': string
  readonly 'Tax Subject': string
  readonly 'Tax Reg Num. (NPWP)': string
  readonly Rules: string
  readonly 'Check Rule': string
  readonly 'Inco 1': string
  readonly 'Inco 2': string
}

export interface AllDataCustomer {
  readonly 'Customer Information': CustomerInformation
  readonly 'Customer Group Information': CustomerGroupInformation
  readonly 'Company Information': CompanyInformation
  readonly 'Payment Information': PaymentInformation
}

export interface TableInformation {
  readonly Salesman: string
  readonly 'Salesman Group': string
}
