/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'
import React from 'react'
import { concatString } from 'src/utils/concatString'
import Link from 'src/components/Link'
import { Button } from 'pink-lava-ui'
import { baseHandler } from './states/handler'

export function useColumnQuotation(handler: ReturnType<typeof baseHandler>) {
  const { handleEditable, handleShowModal } = handler
  function handleAction(id: string) {
    handleShowModal('detail')
    handleEditable(id)
  }
  return [
    addColumn({
      title: 'No',
      render: (_, __, i) => i + 1,
      fixed: true,
    }),
    addColumn({
      title: 'Division ID',
      render: (_, { division_id }) => (
        <Link onClick={() => handleAction(division_id)}>{division_id}</Link>
      ),
      fixed: true,
      sorter: true,
    }),
    addColumn({
      title: 'Division Name',
      dataIndex: 'division_name',
      fixed: true,
    }),
    addColumn({
      title: 'Product ID',
      dataIndex: 'product_id',
    }),
    addColumn({
      title: 'Product Name',
      dataIndex: 'product_name',
    }),
    addColumn({
      title: 'Company ID',
      render: (_, { branch_id, branch_name }) => concatString(branch_id, branch_name),
    }),
    addColumn({
      title: 'Branch ID',
      render: (_, { branch_id, branch_name }) => concatString(branch_id, branch_name),
    }),
    addColumn({
      title: 'Action',
      render: (_, { salesman_id }) => (
        <Button size="big" variant="tertiary" onClick={() => handleAction(salesman_id)}>
          View Detail
        </Button>
      ),
    }),
  ]
}
