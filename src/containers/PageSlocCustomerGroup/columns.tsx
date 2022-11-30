/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'

export const useTableModal = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedData, setSelectedData] = useState({})

  const onChange = (checked) => {
    console.log(`switch to ${checked}`)
  }

  const selectData = (record) => {
    setShowUpdateModal(true)
    setSelectedData(record)
    console.log(record)
  }

  const columns = [
    CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1, 55),
    CreateColumns(
      'Company',
      'company_id',
      false,
      (text: string, record: any) => `${record.company_id || ''} - ${record.company_name || ''}`,
    ),
    CreateColumns(
      'Supplying Branch',
      'sales_org_id',
      false,
      (sales_org_id, record) => <>{`${sales_org_id || ''} - ${record.sales_org_name || ''}`}</>,
      200,
    ),
    CreateColumns(
      'Customer Group',
      'customer_group_id',
      false,
      (customer_group_id, record) => (
        <>{`${customer_group_id || ''} - ${record.customer_group_name || ''}`}</>
      ),
      200,
    ),
    CreateColumns('SLoc', 'sloc_id', false, (sloc_id, record) => <>{`${sloc_id || ''}`}</>, 200),
    CreateColumns(
      'Active / Inactive',
      'status',
      false,
      (sloc_id, record) => (
        <>
          <Switch defaultChecked onChange={onChange} />
        </>
      ),
      200,
    ),
    CreateColumns('Action', 'id', false, (id: string, record: any) => (
      <Button size="big" variant="tertiary" onClick={() => selectData(record)}>
        View Detail
      </Button>
    )),
  ]

  return {
    columns,
    showUpdateModal,
    setShowUpdateModal,
    selectedData,
  }
}
