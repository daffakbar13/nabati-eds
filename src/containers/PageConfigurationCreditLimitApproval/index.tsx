import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { Card, Pagination } from 'src/components'
import { getCreditLimitList } from 'src/api/logistic/config-credit-limit'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import CreateModal from './create'

export default function PageConfigSalesORGCustomerGroupMaterial() {
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [statusButton, setStatusButton] = useState('00')

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }

  const table = useTable({
    funcApi: getCreditLimitList,
    columns: columns(goToDetailPage),
  })

  const hasData = table.state.total > 0

  const { searchProps, filters, setFilters } = useFilters(
    table,
    'Search by Customer, Credit Limit Before, Credit Limit After',
    [
      'company_id',
      'customer_id',
      'customer_name_id',
      'credit_limit_before',
      'credit_limit_after',
      'valid_from',
      'valid_to',
    ],
  )

  useEffect(() => {
    setFilters([
      {
        field: 'status',
        option: 'EQ',
        from_value: statusButton,
        data_type: 'S',
      },
    ])
  }, [statusButton])

  useEffect(() => {
    if (table?.state?.body?.filters.length === 0) {
      setFilters([
        {
          field: 'status',
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
    <>
      <Text variant={'h4'}>Credit Limit Approval</Text>
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
      <CreateModal
        visible={showCreateModal}
        payload={selectedRow || null}
        close={() => {
          setSelectedRow(null)
          setShowCreateModal(false)
        }}
      />
    </>
  )
}
