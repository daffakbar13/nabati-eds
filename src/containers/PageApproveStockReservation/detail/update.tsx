import React from 'react'
import moment from 'moment'
import { Spacer, Text, Button, Row, DatePickerInput, Table } from 'pink-lava-ui'
import { Divider, Typography } from 'antd'
import { Card, Popup } from 'src/components'
import { useRouter } from 'next/router'
import TaggedStatus from 'src/components/TaggedStatus'
import DebounceSelect from 'src/components/DebounceSelect'
import { UpdateApprovalReservation } from 'src/api/logistic/approve-stock-reservation'
import { column } from './columns'
import { PATH } from 'src/configs/menus'

interface propsDetail {
  data: any
}

export default function PageApproveStockReservationUpdate(props: propsDetail) {
  const now = new Date().toISOString()
  const router = useRouter()
  const [dataForm, setDataForm] = React.useState({})
  const [reject, setReject] = React.useState(false)
  const [approve, setApprove] = React.useState(false)
  const [approveSuccess, setApproveSuccess] = React.useState(false)
  const initialValue = {
    status_id: '01',
    document_date: moment(now).format('YYYY-MM-DD'),
    posting_date: moment(now).format('YYYY-MM-DD'),
    header_text: '',
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  React.useEffect(() => {
    if (approve) {
      onChangeForm('status_id', '01')
    }

    if (reject) {
      onChangeForm('status_id', '02')
    }
  }, [approve, reject])

  return (
    <>
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setReject(true)
              }}
            >
              Cancel
            </Button>
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                setApprove(true)
              }}
            >
              Submit
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
              label="Document Date"
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
      {(approve || approveSuccess || reject) && (
        <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{
                ...(approveSuccess && { color: 'green' }),
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 8,
              }}
            >
              {reject ? 'Confirm Cancellation' : ''}
              {approve ? 'Confirm Submit' : ''}
              {approveSuccess ? 'Success' : ''}
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {reject ? 'Are you sure want to Cancel? Change you made so far will not saved' : ''}
            {approve
              ? `Are you sure want Submit Reservation Number - ${props.data.reservation_number}?`
              : ''}
            {approveSuccess ? (
              <>
                Request Number
                <Typography.Text copyable={{ text: props.data.reservation_number as string }}>
                  {' '}
                  {props.data.reservation_number}
                </Typography.Text>
                has been
              </>
            ) : (
              ''
            )}
          </div>
          {approveSuccess && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>successfully created</div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {(approve || reject) && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    setReject(false)
                    setApprove(false)
                  }}
                >
                  No
                </Button>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    UpdateApprovalReservation(props.data.reservation_number, {
                      ...initialValue,
                      ...dataForm,
                    }).then(() => {
                      if (approve) {
                        setApprove(false)
                        setApproveSuccess(true)
                      }
                      if (reject) {
                        setReject(false)
                        router.push(`${PATH.LOGISTIC}/approval-stock-reservation`)
                      }
                    })
                  }}
                >
                  Yes
                </Button>
              </>
            )}

            {approveSuccess && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    router.push(`${PATH.LOGISTIC}/approval-stock-reservation`)
                  }}
                >
                  OK
                </Button>
              </>
            )}
          </div>
        </Popup>
      )}
    </>
  )
}
