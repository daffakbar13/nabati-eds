/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'
import React from 'react'
import TaggedStatus from 'src/components/TaggedStatus'
import { concatString } from 'src/utils/concatString'
import ActionTable from 'src/components/ActionTable'
import { useRouter } from 'next/router'

export function useColumnQuotation() {
  const router = useRouter()
  function logicRoute(id: string, status: string): string {
    if (status === 'Draft') {
      return `${router.pathname}/edit/${id}`
    }
    return `${router.pathname}/detail/${id}`
  }
  return [
    addColumn({
      title: 'Quotation',
      dataIndex: 'id',
      fixed: true,
      render: (_, { id, status_name }) => (
        <ActionTable link={logicRoute(id, status_name)} type="id" label={id} />
      ),
      sorter: true,
    }),
    addColumn({
      title: 'Order Type',
      render: (_, { order_type_id, order_type_name }) =>
        concatString(order_type_id, order_type_name),
    }),
    addColumn({
      title: 'Order Date',
      dataIndex: 'order_date',
    }),
    addColumn({
      title: 'Sales Org.',
      render: (_, { sales_org_id, sales_org_name }) => concatString(sales_org_id, sales_org_name),
    }),
    addColumn({
      title: 'Branch',
      render: (_, { branch_id, branch_name }) => concatString(branch_id, branch_name),
    }),
    addColumn({
      title: 'Sold To Customer',
      dataIndex: 'sold_to_customer_id',
      render: (id, { customer_name }) => concatString(id, customer_name),
    }),
    addColumn({
      title: 'Ship To Customer',
      dataIndex: 'ship_to_customer_id',
      render: (id, { customer_name }) => concatString(id, customer_name),
    }),
    addColumn({
      title: 'Salesman',
      render: (_, { salesman_id, salesman_name }) => concatString(salesman_id, salesman_name),
    }),
    addColumn({
      title: 'Salesman',
      render: (_, { salesman_id, salesman_name }) => concatString(salesman_id, salesman_name),
    }),
    addColumn({
      title: 'Currency',
      dataIndex: 'currency_id',
    }),
    addColumn({
      title: 'Total Amount',
      dataIndex: 'total_amount',
    }),
    addColumn({
      title: 'Create From',
      dataIndex: 'created_from',
    }),
    addColumn({
      title: 'Status',
      dataIndex: 'status_name',
      render: (status) => <TaggedStatus status={status} />,
    }),
    addColumn({
      title: 'Status Process',
      dataIndex: 'status_process_id',
      render: (status_process) => <TaggedStatus status={status_process || 'Not Implemented'} />,
    }),
    addColumn({
      title: 'Action',
      dataIndex: 'id',
      render: (_, { id, status_name }) => (
        <ActionTable link={logicRoute(id, status_name)} type="action" />
      ),
    }),
  ]
}
