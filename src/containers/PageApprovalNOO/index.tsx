/* eslint-disable object-curly-newline */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Search, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import { Card } from 'src/components'
import useTable from 'src/hooks/useTable'
import useTitlePage from 'src/hooks/useTitlePage'
import Loader from 'src/components/Loader'
import Pagination from 'src/components/Pagination'
import { useFilters } from 'src/hooks'
import { useColumnApproval } from './columns'
import { getApprovalNOOList } from 'src/api/approval-noo'

export default function PageApproval() {
  const [statusButton, setStatusButton] = useState('00')

  const table = useTable({
    funcApi: getApprovalNOOList,
    columns: useColumnApproval,
  })

  const titlePage = useTitlePage('list')
  const [processing, setProcessing] = React.useState('')
  const onProcess = processing !== ''
  const hasData = table.state.total > 0

  const { searchProps, filters, setFilters } = useFilters(
    table,
    'Search by Id, Name, Sales Org, Sales Group, Branch, Channel, etc',
    ['customer_id'],
  )

  useEffect(() => {
    if (table.state.data.length > 0) {
      setFilters([
        {
          field: 'ecn.status_id',
          option: 'EQ',
          from_value: statusButton,
          data_type: 'S',
        },
      ])
    }
  }, [table.state.data.length, statusButton])

  useEffect(() => {
    if (table?.state?.body?.filters.length === 0) {
      setFilters([
        {
          field: 'ecn.status_id',
          option: 'EQ',
          from_value: '00',
          data_type: 'S',
        },
      ])
    }
  }, [table?.state?.body])

  const handleChangeButtonStatus = (statusId: string) => {
    setStatusButton(statusId)
  }

  return (
    <Col>
      {onProcess && <Loader type="process" text={processing} />}
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Row justifyContent="left">
        <Row gap="16px">
          <Button
            size="small"
            style={{ flexGrow: 1 }}
            variant={statusButton === '00' ? 'primary' : 'tertiary'}
            onClick={() => {
              handleChangeButtonStatus('00')
            }}
          >
            Wait For Approval
          </Button>
          <Button
            size="small"
            style={{ flexGrow: 1 }}
            variant={statusButton === '01' ? 'primary' : 'tertiary'}
            onClick={() => {
              handleChangeButtonStatus('01')
            }}
          >
            Approved
          </Button>
          <Button
            size="small"
            style={{ flexGrow: 1 }}
            variant={statusButton === '02' ? 'primary' : 'tertiary'}
            onClick={() => {
              handleChangeButtonStatus('02')
            }}
          >
            Rejected
          </Button>
        </Row>
      </Row>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
          </Row>
          <Row gap="16px"></Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <Text strong>
          Total{' '}
          {(() => {
            if (statusButton === '00') return <span>Wait For Approval</span>
            else if (statusButton === '01') return <span>Approved</span>
            else if (statusButton === '02') return <span>Rejected</span>
          })()}{' '}
          : {table.state.total}
        </Text>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
      </Card>
    </Col>
  )
}
