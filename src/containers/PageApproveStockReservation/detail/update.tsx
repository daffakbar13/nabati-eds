import { useState, useEffect } from 'react'
import moment from 'moment'
import { Spacer, Text, Button, Row, DatePickerInput, Table } from 'pink-lava-ui'
import { Divider, Typography } from 'antd'
import { Card, Modal } from 'src/components'
import { useRouter } from 'next/router'
import TaggedStatus from 'src/components/TaggedStatus'
import DebounceSelect from 'src/components/DebounceSelect'
import {
  UpdateApprovalReservationMultiple,
  UpdateRejectReservationMultiple,
} from 'src/api/logistic/approve-stock-reservation'
import { column } from './columns'
import { PATH } from 'src/configs/menus'

interface propsDetail {
  data: any
}

export default function PageApproveStockReservationUpdate(props: propsDetail) {
  const now = new Date().toISOString()
  const router = useRouter()
  const [dataForm, setDataForm] = useState({})
  const [modalApprove, setModalApprove] = useState(false)
  const [modalReject, setModalReject] = useState(false)
  const [statusId, setStatusId] = useState('01')

  const initialValue = {
    document_date: moment(now).format('YYYY-MM-DD'),
    posting_date: moment(now).format('YYYY-MM-DD'),
    header_text: '',
    status_id: statusId,
    id_reservations: [props.data.reservation_number],
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const handleApprove = async () => {
    try {
      return await UpdateApprovalReservationMultiple({
        ...initialValue,
        ...dataForm,
      })
    } catch (error) {
      return error
    }
  }
  const handleReject = async () => {
    try {
      return await UpdateRejectReservationMultiple({
        ...initialValue,
        ...dataForm,
      })
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setModalReject(true)
                setStatusId('02')
                console.log('rejected', {
                  ...initialValue,
                  ...dataForm,
                })
              }}
            >
              Reject
            </Button>
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                setModalApprove(true)
                setStatusId('03')
              }}
            >
              Approve
            </Button>
          </Row>
          <Text variant={'h5'}>
            <TaggedStatus status={props.data.status_name} size="h5" />
          </Text>
        </Row>
      </Card>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
            <DebounceSelect
              type="input"
              label="Reservation Number"
              disabled
              placeholder={props.data.reservation_number}
            />
            <DebounceSelect
              type="input"
              label="Movement Type"
              disabled
              placeholder={`${props.data.movement_type_id} - ${props.data.movement_type_name}`}
            />
            <DebounceSelect
              type="input"
              label="Branch"
              disabled
              placeholder={`${props.data.branch_id} - ${props.data.branch_name}`}
            />
            <DebounceSelect
              type="input"
              label="Supplaying SLoc"
              disabled
              placeholder={`${props.data.supplying_sloc_id} - ${props.data.supplying_sloc_name}`}
            />
          </div>
          <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('document_date', moment(val).format('YYYY-MM-DD'))
              }}
              label="Document Date"
              defaultValue={moment()}
              format={'DD-MMM-YYYY'}
              required
            />
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('posting_date', moment(val).format('YYYY-MM-DD'))
              }}
              label="Posting Date"
              defaultValue={moment()}
              format={'DD-MMM-YYYY'}
              required
            />
            <DebounceSelect
              type="input"
              label="Header Text"
              placeholder="Type Here..."
              onChange={(e: any) => {
                onChangeForm('header_text', e.target.value)
              }}
            />
            <DebounceSelect
              type="input"
              label="Receiving SLoc"
              disabled
              placeholder={`${props.data.receiving_sloc_id} - ${props.data.receiving_sloc_name}`}
            />
          </div>
        </div>
        <Divider />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table columns={column} data={props.data.item} />
        </div>
      </Card>
      <Modal
        title={'Confirm Approve'}
        open={modalApprove}
        onOk={handleApprove}
        onCancel={() => {
          setModalApprove(false)
        }}
        content={`Are you sure want Approve Stock Reservation - ${props.data.reservation_number}?`}
        successTitle="Success"
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/approval-stock-reservation`)
        }}
        successContent={(res: any) => (
          <>
            Stock Reservation
            <Typography.Text copyable={{ text: props.data.reservation_number as string }}>
              {props.data.reservation_number}
            </Typography.Text>
            has been successfully Approved
          </>
        )}
        successOkText="OK"
        width={432}
      />
      <Modal
        title={'Confirm Reject'}
        open={modalReject}
        onOk={handleReject}
        onCancel={() => {
          setModalReject(false)
        }}
        content={`Are you sure want Reject Stock Reservation - ${props.data.reservation_number}?`}
        successTitle="Success"
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/approval-stock-reservation`)
        }}
        successContent={(res: any) => (
          <>
            Stock Reservation
            <Typography.Text copyable={{ text: props.data.reservation_number as string }}>
              {props.data.reservation_number}
            </Typography.Text>
            has been successfully Rejected
          </>
        )}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
