import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { cancelSalesOrder } from 'src/api/sales-order'
import { fieldReason } from 'src/configs/fieldFetches'

interface ConfirmCancelProps {
  handleShowConfirm: (confirm: string) => void
  handleProcess: (process: string) => void
}

export default function ConfirmCancel(props: ConfirmCancelProps) {
  const { handleShowConfirm, handleProcess } = props
  const [reason, setReason] = React.useState<string>()
  const [optionsReason, setOptionsReason] = React.useState([])
  const router = useRouter()

  React.useEffect(() => {
    fieldReason('B')
      .then((res) => {
        setOptionsReason(res)
        setReason(res[0].value)
      })
      .catch(() => setOptionsReason([]))
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
            handleShowConfirm(undefined)
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            handleProcess('Wait for cancelling Sales Order')
            cancelSalesOrder({
              order_list: [{ id: router.query.id }],
              cancel_reason_id: reason,
            })
              .then(() => {
                handleShowConfirm('success-cancel')
                handleProcess(undefined)
              })
              .catch(() => handleProcess(undefined))
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
