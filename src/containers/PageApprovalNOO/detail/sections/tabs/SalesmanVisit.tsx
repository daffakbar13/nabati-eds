/* eslint-disable camelcase */
import React from 'react'
import { TableInformation } from 'src/components/TabCustomerInfo/types'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { concatString } from 'src/utils/concatString'
import { Table } from 'pink-lava-ui'

export default function SalesmanVisit() {
  const {
    state: { data },
  } = useSalesQuotationDetailContext()
  const { customer, customer_group, customer_sales_data, salesman } = data!

  const dataTable: TableInformation[] = salesman?.map(
    ({ salesman_id, salesman_name, salesman_group_id, salesman_group_name }) => {
      return {
        'Salesman Id': salesman_id,
        Name: salesman_name,
        'Salesman Group': concatString(salesman_group_id, salesman_group_name),
      }
    },
  )

  return (
    <>
      <Table
        dataSource={dataTable}
        columns={[
          { title: 'Salesman ID', dataIndex: 'Salesman Id' },
          { title: 'Name', dataIndex: 'Name' },
          { title: 'Salesman Group', dataIndex: 'Salesman Group' },
          { title: 'Day', dataIndex: '' },
          { title: 'Week 1', dataIndex: '' },
          { title: 'Week 2', dataIndex: '' },
          { title: 'Week 3', dataIndex: '' },
          { title: 'Week 4', dataIndex: '' },
          { title: 'Sequence', dataIndex: '' },
        ]}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}
