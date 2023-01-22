import { useEffect, useState } from 'react'
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
  UpdateRejectReservationMultiple,
} from 'src/api/logistic/approve-stock-reservation'
import Popup from 'src/components/Popup'
import { fieldBranchAll, fieldSloc, fieldCompanyList } from 'src/configs/fieldFetches'
import Pagination from 'src/components/Pagination'
import { colors } from 'src/configs/colors'
import { CheckCircleFilled } from '@ant-design/icons'
import { column } from './columns'
import { Modal } from 'src/components'

export default function PageStockReservation() {
  const table = useTable({
    funcApi: getListApprovalReservation,
    columns: column,
    haveCheckBox: [{ rowKey: 'status_name', member: ['Wait For Approval'] }],
  })

  const [showConfirm, setShowConfirm] = useState('')
  const [modalApprove, setModalApprove] = useState(false)
  const [modalReject, setModalReject] = useState(false)
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

  const handleApprove = async () => {
    try {
      return await UpdateApprovalReservationMultiple({
        status_id: '01',
        id_reservations: table.state.selected,
      })
    } catch (error) {
      return error
    }
  }
  const handleReject = async () => {
    try {
      return await UpdateRejectReservationMultiple({
        status_id: '02',
        id_reservations: table.state.selected,
      })
    } catch (error) {
      return error
    }
  }

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
              <Button
                size="big"
                variant="tertiary"
                onClick={() => {
                  setModalReject(true)
                }}
              >
                Reject
              </Button>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  setModalApprove(true)
                }}
              >
                Approve
              </Button>
            </div>
          </FloatAction>
        )}
        <Modal
          title={'Confirm Reject'}
          open={modalReject}
          onOk={handleReject}
          onCancel={() => {
            setModalReject(false)
          }}
          content={
            <>
              <Typography.Title level={5} style={{ margin: 0 }}>
                Are you sure to Reject Stock Reservation
                {oneSelected ? (
                  ` ${selectedQuotation.text} ?`
                ) : (
                  <Popover content={selectedQuotation.content}>
                    {` ${selectedQuotation.text} ?`}
                  </Popover>
                )}
              </Typography.Title>
            </>
          }
          successTitle="Success"
          onOkSuccess={() => {
            router.push(`/logistic/approval-stock-reservation`)
          }}
          successContent={(res: any) => <>Stock Reservation has been successfully Rejected</>}
          successOkText="OK"
          width={550}
        />
        <Modal
          title={'Confirm Approve'}
          open={modalApprove}
          onOk={handleApprove}
          onCancel={() => {
            setModalApprove(false)
          }}
          content={
            <>
              <Typography.Title level={5} style={{ margin: 0 }}>
                Are you sure to Approve quotation
                {oneSelected ? (
                  ` ${selectedQuotation.text} ?`
                ) : (
                  <Popover content={selectedQuotation.content}>
                    {` ${selectedQuotation.text} ?`}
                  </Popover>
                )}
              </Typography.Title>
            </>
          }
          successTitle="Success"
          onOkSuccess={() => {
            router.push(`/logistic/approval-stock-reservation`)
          }}
          successContent={(res: any) => <>Stock Reservation has been successfully Rejected</>}
          successOkText="OK"
          width={550}
        />
      </Card>
    </Col>
  )
}
