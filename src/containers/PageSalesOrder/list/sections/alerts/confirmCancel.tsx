/* eslint-disable operator-linebreak */
import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { cancelSalesOrder } from 'src/api/sales-order'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'
import { useSalesSalesOrderListContext } from 'src/hooks/contexts'

export default function ConfirmCancel() {
  const {
    state: {
      table: {
        state: { selected },
      },
    },
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess },
  } = useSalesSalesOrderListContext()
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])

  React.useEffect(() => {
    runProcess('Wait For get Reasons')
    fieldReason('C')
      .then((data) => {
        setOptionsReason(data)
        setReason(data[0].value)
        stopProcess()
      })
      .catch(() => stopProcess())
  }, [])

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <DebounceSelect
        type="select"
        value={optionsReason.find(({ value }) => reason === value)?.label}
        label={'Reason Cancel Process Sales Order'}
        required
        options={optionsReason}
        onChange={({ value }) => setReason(value)}
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            unShowConfirm()
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            runProcess('Wait for cancelling Sales Order')
            cancelSalesOrder({
              order_list: selected.map((id) => ({ id })),
              cancel_reason_id: reason,
            })
              .then(() => {
                showConfirm('success-cancel')
                stopProcess()
              })
              .catch(() => stopProcess())
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
