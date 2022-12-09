/* eslint-disable operator-linebreak */
import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { cancelBatchOrder } from 'src/api/quotation'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'
import { useSalesQuotationListContext } from 'src/hooks/contexts'

export default function ConfirmCancel() {
  const {
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess },
    state: {
      table: {
        state: { selected },
      },
    },
  } = useSalesQuotationListContext()
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])

  React.useEffect(() => {
    fieldReason('B')
      .then((data) => {
        setOptionsReason(data)
        setReason(data[0].value)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <DebounceSelect
        type="select"
        value={optionsReason.find(({ value }) => reason === value)?.label}
        label={'Reason Cancel Process Quotation'}
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
            runProcess('Wait for cancelling Quotation')
            cancelBatchOrder({
              order_list: selected.map((id) => ({ id })),
              cancel_reason_id: reason,
            })
              .then(() => {
                showConfirm('success-cancel')
                stopProcess()
              })
              .catch((err) => console.log(err))
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
