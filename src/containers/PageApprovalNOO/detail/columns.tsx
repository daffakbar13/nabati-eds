/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button, DatePickerInput } from 'pink-lava-ui'
import React from 'react'
import { Popup } from 'src/components'
import { Col, Input, Typography } from 'antd'
import moment from 'moment'

function Linked({
  link,
  status,
  type,
  funcReject,
  index,
}: {
  link: string
  status: string
  type: 'id' | 'action'
  funcReject: any
  index: number
}) {
  const router = useRouter()
  const navigate = () => {
    router.push(`${PATH.SALES}/collection/detail/${link}`)
  }
  const [showConfirm, setShowConfirm] = React.useState('')

  const ConfirmReject = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Rejectation
      </Typography.Title>
      <Input.TextArea id="inputReason" required />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            const a = document.getElementById('inputReason')
            funcReject(a.innerHTML, index)
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmReschedule = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Reschedule
      </Typography.Title>
      <DatePickerInput
        fullWidth
        label="Confirm Reschedule"
        disabledDate={(current) => current < moment().startOf('day')}
        defaultValue={moment()}
        format={'DD-MMM-YYYY'}
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            const a = document.getElementById('inputReason')
            funcReject(a.innerHTML, index)
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  return (
    <>
      <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
        <Button
          size="big"
          variant="tertiary"
          onClick={() => {
            setShowConfirm('reschedule')
          }}
        >
          Reschedule
        </Button>
        <Button
          size="big"
          variant="primary"
          onClick={() => {
            setShowConfirm('reject')
          }}
        >
          Cancel Progres
        </Button>
      </div>
      {showConfirm === 'reject' && <ConfirmReject />}
      {showConfirm === 'reschedule' && <ConfirmReschedule />}
    </>
  )
}

export const tableUndelivered = (funcReject) => [
  CreateColumns('No', 'no', false, (_, __, index) => ++index, 60),
  CreateColumns('Delivery Order', 'delivery_oder_id', false, undefined, 100),
  CreateColumns('Doc Type', 'doc_type', false, undefined, 150),
  CreateColumns('Order Date', 'order_date', false, undefined, 100),
  CreateColumns('Ship To Customer', 'ship_to_customer', false, undefined, 200),
  CreateColumns('Salesman', 'salesman', false, undefined, 300),
  CreateColumns('New Delivery Date', 'new_delivery_date', false, undefined, 200),
  CreateColumns('Cancelation Reason', 'rejectReason', false, undefined, 200),
  CreateColumns('Action', 'remarks', false, (link, record, index) => (
    <Linked
      link={link}
      status={record.status}
      type="action"
      funcReject={funcReject}
      index={index}
    />
  )),
  // CreateColumns('Salesman', 'price', false, (price) => parseInt(price).toLocaleString(), 120),
  // CreateColumns(
  //   'Gross',
  //   'gross_value',
  //   false,
  //   (gross_value) => parseInt(gross_value).toLocaleString(),
  //   120,
  // ),
  // CreateColumns(
  //   'Discount',
  //   'discount_value',
  //   false,
  //   (discount_value) => parseInt(discount_value).toLocaleString(),
  //   120,
  // ),
  // // FIXME Sub Total
  // CreateColumns(
  //   'Sub Total',
  //   'sub_total',
  //   false,
  //   (_, record) => ((record.price - record.discount_value) * record.order_qty).toLocaleString(),
  //   130,
  // ),
  // CreateColumns('Remarks', 'remarks'),
]
