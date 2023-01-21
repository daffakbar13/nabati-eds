import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, Table, DatePickerInput, Search } from 'pink-lava-ui'
import { Card, SearchQueryParams, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { useFilters } from 'src/hooks'
import FloatAction from 'src/components/FloatAction'
import {
  getListApprovalReservation,
  UpdateApprovalReservationMultiple,
} from 'src/api/logistic/approve-stock-reservation'
import Popup from 'src/components/Popup'
import { fieldBranchAll, fieldSloc, fieldCompanyList } from 'src/configs/fieldFetches'
import Pagination from 'src/components/Pagination'
import { colors } from 'src/configs/colors'
import { CheckCircleFilled } from '@ant-design/icons'
import { column } from './columns'

export default function PageStockReservation() {
  const table = useTable({
    funcApi: getListApprovalReservation,
    columns: column,
    haveCheckBox: [{ rowKey: 'status_name', member: ['Wait For Approval'] }],
  })

  const [showConfirm, setShowConfirm] = React.useState('')
  const hasData = table.state.total > 0
  const router = useRouter()
  const oneSelected = table.state.selected.length === 1
  const firstSelected = table.state.selected[0]

  const selectedQuotation = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, More +${table.state.selected.length - 1}`,
    content: <div style={{ textAlign: 'center' }}>{table.state.selected.join(', ')}</div>,
  }

  const statusOption = [
    { label: 'Approved', value: '03' },
    { label: 'Rejected', value: '02 ' },
    { label: 'Wait For Approval', value: '00' },
  ]

  const { oldfilters, setFilters, searchProps } = useFilters(
    table,
    'Search by Reservation Number',
    'reservation_number',
  )

  return (
    <Col>
      <Text variant={'h4'}>Approval Stock Reservation</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
            <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
              <SmartFilter.Field
                field="company_id"
                dataType="S"
                label="Company"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Supplying Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="receiving_branch_id"
                dataType="S"
                label="Receiving Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="posting_date"
                dataType="S"
                label="Posting Date"
                options={['GE', 'EQ', 'LE', 'GT', 'LT', 'NE']}
              >
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
                <DatePickerInput
                  fullWidth
                  label={''}
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="status_id"
                dataType="S"
                label="Status"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} rowKey="reservation_number" />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
        {table.state.selected.length > 0 && (
          <FloatAction>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <b>{table.state.selected.length} Document Stock Reservation are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <Button size="big" variant="tertiary" onClick={() => {}}>
                Cancel Process
              </Button>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  setShowConfirm('submit')
                }}
              >
                Submit
              </Button>
            </div>
          </FloatAction>
        )}
        {showConfirm === 'submit' && (
          <Popup
            onOutsideClick={() => {
              setShowConfirm('')
            }}
          >
            <Typography.Title level={3} style={{ margin: 0 }}>
              Confirm Submit
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Are you sure to submit Stock Reservation
              {oneSelected ? (
                ` ${selectedQuotation.text} ?`
              ) : (
                <Popover content={selectedQuotation.content}>
                  {` ${selectedQuotation.text} ?`}
                </Popover>
              )}
            </Typography.Title>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="secondary"
                onClick={() => {
                  setShowConfirm('')
                }}
              >
                Cancel Proccess
              </Button>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="primary"
                onClick={() => {
                  UpdateApprovalReservationMultiple({
                    status_id: '01',
                    id_reservations: table.state.selected,
                  })
                    .then(() => setShowConfirm('UpdateStatus'))
                    .catch((err) => err)
                }}
              >
                Submit
              </Button>
            </div>
          </Popup>
        )}

        {showConfirm === 'UpdateStatus' && (
          <Popup>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text
                textAlign="center"
                style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
              >
                <>
                  <CheckCircleFilled /> Update Status Stock Reservation Success
                </>
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 4,
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <div> successfully update status stock reservation success</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="primary"
                onClick={() => {
                  router.push('/logistic/approval-stock-reservation')
                }}
              >
                OK
              </Button>
            </div>
          </Popup>
        )}
      </Card>
    </Col>
  )
}
