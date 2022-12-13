/* eslint-disable operator-linebreak */
import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useTable } from 'src/hooks'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'
import { cancelDeliveryOrder } from 'src/api/delivery-order'

interface ConfirmCancelProps {
  table: ReturnType<typeof useTable>
  handleProcess: (process: string) => void
  handleShowConfirm: (confirm: string) => void
}

export default function ConfirmCancel(props: ConfirmCancelProps) {
  const { handleProcess, handleShowConfirm, table } = props
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])

  React.useEffect(() => {
    fieldReason('J')
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
        label={'Reason Cancel Process Delivery Order'}
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
            handleProcess('Wait for cancelling Delivery Order')
            table.state.selected.forEach((id) => {
              cancelDeliveryOrder(id, { reason_id: reason })
                .then(() => {
                  handleShowConfirm('success-cancel')
                  handleProcess(undefined)
                })
                .catch(() => handleProcess(undefined))
            })
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
