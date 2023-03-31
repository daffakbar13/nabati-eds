import React from 'react'
import moment from 'moment'
import { Spacer, Text, Button, Row, DatePickerInput, Table } from 'pink-lava-ui'
import { Divider, Typography } from 'antd'
import { Card, Modal } from 'src/components'
import { useRouter } from 'next/router'
import TaggedStatus from 'src/components/TaggedStatus'
import DebounceSelect from 'src/components/DebounceSelect'
import { UpdateTransfertoGS } from 'src/api/logistic/transfer-to-gs'
import { column } from './columns'
import { PATH } from 'src/configs/menus'
import { useTableAddItem } from './columnUpdate'

interface propsDetail {
  data: any
}

export default function TransferToGSUpdate(props: propsDetail) {
  const now = new Date().toISOString()
  const router = useRouter()
  const [dataForm, setDataForm] = React.useState({})
  const [reject, setReject] = React.useState(false)
  const [approve, setApprove] = React.useState(false)
  const [approveSuccess, setApproveSuccess] = React.useState(false)
  const tableAddItems = useTableAddItem({ items: props.data.item })

  const initialValue = {
    reference_doc_number: props.data.ref_doc_number,
    movement_type_id: props.data.movement_type_id,
    branch_id: props.data.branch_id,
    supplying_sloc_id: props.data.receiving_sloc_id,
    receiving_sloc_id: 'GS00',
    document_date: moment(props.data.document_date).format('YYYY-MM-DD'),
    posting_date: moment(props.data.posting_date).format('YYYY-MM-DD'),
    header_text: '',
    items: tableAddItems.data,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const handleSubmit = async () => {
    try {
      return await UpdateTransfertoGS({
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
            {/* <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setReject(true)
              }}
            >
              Reject
            </Button> */}
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
            <TaggedStatus
              status={
                props.data.status_name === 'Wait For Approval' ? 'Pending' : props.data.status_name
              }
              size="h5"
            />
          </Text>
        </Row>
      </Card>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
            <DebounceSelect
              type="input"
              label="Ref. Doc Number"
              disabled
              placeholder={props.data.ref_doc_number}
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
              placeholder={`${props.data.receiving_sloc_id} - ${props.data.receiving_sloc_name}`}
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
              placeholder="GS00 - Good Stock"
            />
          </div>
        </div>
        <Divider />
        <div style={{ overflow: 'scroll' }}>
          <Table
            editable
            data={tableAddItems.data}
            columns={tableAddItems.columns}
            loading={tableAddItems.loading}
          />
        </div>
      </Card>
      <Modal
        title={'Confirm Submit'}
        open={approve}
        onOk={handleSubmit}
        onCancel={() => {
          setApprove(false)
        }}
        content={`Are you sure want Submit Document Number - ${props.data.ref_doc_number}?`}
        successTitle="Success"
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/transfer-to-gs`)
        }}
        successContent={(res: any) => (
          <>
            Transfer To Gs
            <Typography.Text copyable={{ text: props.data.ref_doc_number as string }}>
              {props.data.ref_doc_number}
            </Typography.Text>
            has been successfully Submit
          </>
        )}
        successOkText="OK"
        width={432}
      />
      {/* <Modal
        title={'Confirm Reject'}
        open={reject}
        onOk={handleSubmit}
        onCancel={() => {
          setApprove(false)
        }}
        content={`Are you sure want Reject Document Number - ${props.data.ref_doc_number}?`}
        successTitle="Success"
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/transfer-to-gs`)
        }}
        successContent={(res: any) => (
          <>
            Transfer To Gs
            <Typography.Text copyable={{ text: props.data.ref_doc_number as string }}>
              {props.data.ref_doc_number}
            </Typography.Text>
            has been successfully Rejected
          </>
        )}
        successOkText="OK"
        width={432}
      /> */}
    </>
  )
}
