import { addColumn } from 'src/utils/createColumns'
import React from 'react'
import { concatString } from 'src/utils/concatString'
import Link from 'src/components/Link'
import { Button, Switch } from 'pink-lava-ui'
import { baseHandler } from './states/handler'

export function useColumnQuotation(handler: ReturnType<typeof baseHandler>) {
  const { handleEditable, handleShowModal, showConfirm } = handler
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
      title: 'Salesman ID',
      render: (_, record) => <Link onClick={() => handleAction(record)}>{record.salesman_id}</Link>,
      fixed: true,
      sorter: true,
    }),
    addColumn({
      title: 'Salesman Name',
      dataIndex: 'salesman_name',
      fixed: true,
    }),
    addColumn({
      title: 'Division ID',
      dataIndex: 'division_id',
      sorter: true,
    }),
    addColumn({
      title: 'Division Name',
      dataIndex: 'division_name',
    }),
    addColumn({
      title: 'Company ID',
      render: (_, { company_id, company_name }) => concatString(company_id, company_name),
    }),
    addColumn({
      title: 'Branch ID',
      render: (_, { branch_id, branch_name }) => concatString(branch_id, branch_name),
    }),
    addColumn({
      title: 'Active/Inactive',
      render: (_, r) => (
        <Switch
          checked={r.is_active === 'Active'}
          onChange={() => {
            handleEditable(r)
            showConfirm('activation')
          }}
        />
      ),
    }),
    addColumn({
      title: 'Action',
      render: (_, record) => (
        <Button size="big" variant="tertiary" onClick={() => handleAction(record)}>
          View Detail
        </Button>
      ),
    }),
  ]
}
