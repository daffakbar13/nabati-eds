/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'

// const [showUpdateModal, setShowUpdateModal] = useState(false)

const onChange = (checked) => {
  console.log(`switch to ${checked}`)
}

export const selectData = (record) => {
  return record
}

export const columns = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1, 55),
  CreateColumns(
    'Salesman',
    'salesman_id',
    false,
    (text: string, record: any) => `${record.salesman_id || ''} - ${record.salesman_name || ''}`,
    400,
  ),
  CreateColumns(
    'SLoc',
    'sloc_id',
    false,
    (text: string, record: any) => <>{`${record.sloc_id || ''}`}</>,
    200,
  ),
  CreateColumns(
    'Active / Inactive',
    'status',
    false,
    (status, record) => (
      <>
        {record.status == 1 ? (
          <Switch defaultChecked onChange={onChange} />
        ) : (
          <Switch onChange={onChange} />
        )}
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
