/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button, DatePickerInput } from 'pink-lava-ui'
import React, { useState } from 'react'
import { Popup } from 'src/components'
import { Typography } from 'antd'
import moment from 'moment'
import ConfirmReject from '../alerts/ConfirmReject'
import ConfirmReschedule from '../alerts/ConfirmReschedule'

interface PropsLinked {
  link: string
  status: string
  type: 'id' | 'action'
  onReject: any
  onReschedule: any
  index: number
}

function Linked({ index, onReject, onReschedule }: PropsLinked) {
  const [showConfirm, setShowConfirm] = React.useState('')

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
      {showConfirm === 'reject' && (
        <ConfirmReject
          onSubmit={(reason) => onReject(reason, index)}
          onCancel={() => setShowConfirm('')}
        />
      )}
      {showConfirm === 'reschedule' && (
        <ConfirmReschedule
          onCancel={() => setShowConfirm('')}
          onSubmit={(date) => onReschedule(date, index)}
        />
      )}
    </>
  )
}

export const tableUndelivered = (onReject, onReschedule) => [
  CreateColumns('No', 'no', false, (_, __, index) => ++index, 60),
  CreateColumns('Delivery Order', 'delivery_oder_id', false, undefined, 100),
  CreateColumns('Doc Type', 'doc_type', false, undefined, 150),
  CreateColumns('Order Date', 'order_date', false, undefined, 100),
  CreateColumns('Ship To Customer', 'ship_to_customer', false, undefined, 200),
  CreateColumns('Salesman', 'salesman', false, undefined, 300),
  CreateColumns('New Delivery Date', 'new_delivery_date', false, undefined, 200),
  CreateColumns('Cancelation Reason', 'cancel_reason', false, undefined, 200),
  CreateColumns('Action', 'remarks', false, (link, record, index) => (
    <Linked
      link={link}
      status={record.status}
      type="action"
      onReject={onReject}
      onReschedule={onReschedule}
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
