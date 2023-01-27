/* eslint-disable react-hooks/exhaustive-deps */
import { addColumn } from 'src/utils/createColumns'
import { Button, Table, DatePickerInput } from 'pink-lava-ui'
import { concatString } from 'src/utils/concatString'
import { Modal, Typography } from 'antd'
import React from 'react'
import { MinusCircleFilled } from '@ant-design/icons'
import DebounceSelect from 'src/components/DebounceSelect'
import moment from 'moment'
import Total from 'src/components/Total'
import { Popup } from 'src/components'
import { fieldReason } from 'src/configs/fieldFetches'

interface PaymentTypes {
  billing_amount?: number
}

const useTablePayment = () => {
  const [data, setData] = React.useState<PaymentTypes>({})

  function changeData(newData: PaymentTypes) {
    setData(() => ({ ...newData }))
  }

  return {
    data,
    changeData,
    columns: [
      addColumn({
        render: () => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MinusCircleFilled
              style={{
                color: 'red',
                margin: 'auto',
              }}
            />
          </div>
        ),
        width: 50,
      }),
      addColumn({
        title: 'Amount',
        render: () => (
          <DebounceSelect
            type="input"
            value={Number(data.billing_amount).toFixed(2).toLocaleString() as any}
          />
        ),
      }),
      addColumn({
        title: 'Payment Method',
        render: () => <DebounceSelect type="select" value={'Cash' as any} options={[]} />,
      }),
      addColumn({
        title: 'Bank Name',
        render: () => <DebounceSelect type="select" value={'' as any} options={[]} disabled />,
      }),
      addColumn({
        title: 'Account Number',
        render: () => <DebounceSelect type="input" value={'' as any} disabled />,
      }),
      addColumn({
        title: 'Valid To',
        render: () => (
          <DatePickerInput
            label={''}
            fullWidth
            format={'DD-MMM-YYYY'}
            placeholder="Valid To"
            value={moment(new Date().toISOString())}
          />
        ),
      }),
      addColumn({
        title: 'Remarks',
        render: () => <DebounceSelect type="input" value={'' as any} />,
      }),
    ],
  }
}

export const useTableDetailCollection = (
  handleUndelive: (billing_id: string, cancelation_reason_id: string) => void,
) => {
  const [data, setData] = React.useState<any>({})
  const [showModalDelivered, setShowModalDelivered] = React.useState(false)
  const [showPopupUndelivered, setShowPopupUndelivered] = React.useState<string>()
  const [optionsReason, setOptionsReason] = React.useState([])
  const [reasonUndelivered, setReasonUndelivered] = React.useState<any>()
  const payment = useTablePayment()

  function closeModal() {
    setShowModalDelivered(false)
  }

  const modalDelivered = (
    <Modal open={showModalDelivered} onCancel={closeModal} width={'85vw'} footer={null}>
      <Typography.Title level={2}>{data.customer_id}</Typography.Title>
      <Typography.Title level={4}>{data.billing_number}</Typography.Title>
      <Typography.Title level={4}>Transaction Type: {data.transaction_type}</Typography.Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <Button variant="tertiary">+ Add New</Button>
        </div>
        <Table columns={payment.columns} dataSource={[{}]} />
        <Total label="Billing Amount" value={data.billing_amount} />
        <Total label="Total Amount" value={data.paid_amount} />
        <Total label="Balance" value={data.balance} />
        <div style={{ display: 'flex', justifyContent: 'end', gap: 20 }}>
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </Modal>
  )

  function PopupUndelivered(props: { id: string }) {
    const { id } = props
    return (
      <Popup>
        <Typography.Title level={2}>Confirm Undelivered</Typography.Title>
        <DebounceSelect
          type="select"
          label="Reason"
          required
          value={reasonUndelivered}
          options={optionsReason}
          onChange={(e) => {
            setReasonUndelivered(e.value)
            handleUndelive(id, e.value)
          }}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="tertiary" onClick={() => setShowPopupUndelivered(undefined)} >Back</Button>
          <Button variant="primary">Confirm</Button>
        </div>
      </Popup>
    )
  }

  React.useEffect(() => {
    fieldReason('J')
      .then((r) => {
        setOptionsReason(r)
        setReasonUndelivered(r[0].value)
      })
      .catch((err) => err)
  }, [])

  React.useEffect(() => {
    payment.changeData(data)
  }, [data])

  return {
    modalDelivered,
    columns: [
      addColumn({
        title: 'Customer',
        dataIndex: 'customer_id',
        fixed: true,
      }),
      addColumn({
        title: 'Term of Payment',
        dataIndex: 'term_of_payment',
      }),
      addColumn({
        title: 'Transaction Type',
        dataIndex: 'transaction_type',
      }),
      addColumn({
        title: 'Billing Number',
        dataIndex: 'billing_number',
      }),
      addColumn({
        title: 'Billing Amount',
        dataIndex: 'billing_amount',
      }),
      addColumn({
        title: 'Paid Amount',
        dataIndex: 'paid_amount',
      }),
      addColumn({
        title: 'Payment Method',
        dataIndex: 'payment_method',
      }),
      addColumn({
        title: 'Balance',
        dataIndex: 'balance',
      }),
      addColumn({
        title: 'Undelivered Reason',
        render: (_, r) => concatString(r.undelivered_reason_id, r.undelivered_reason_name),
      }),
      addColumn({
        title: 'Action',
        render: (_, r) => (
          <div style={{ display: 'flex', gap: 5 }}>
            <Button
              variant="primary"
              size="small"
              onClick={() => {
                setShowModalDelivered(true)
                setData(r)
              }}
            >
              Delivered
            </Button>
            <Button
              variant="tertiary"
              size="small"
              onClick={() => setShowPopupUndelivered(r.billing_number)}
            >
              Undelivered
            </Button>
            {showPopupUndelivered === r.billing_number && (
              <PopupUndelivered id={r.billing_number} />
            )}
          </div>
        ),
      }),
    ],
  }
}
