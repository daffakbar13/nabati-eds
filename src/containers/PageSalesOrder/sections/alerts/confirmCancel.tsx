/* eslint-disable operator-linebreak */
import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { cancelSalesOrder } from 'src/api/sales-order'
import { useTable } from 'src/hooks'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'

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
        label={'Reason Cancel Process SalesOrder'}
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
            handleProcess('Wait for cancelling SalesOrder')
            cancelSalesOrder({
              order_list: table.selected.map((id) => ({ id })),
              cancel_reason_id: reason,
            })
              .then(() => {
                handleShowConfirm('success-cancel')
                handleProcess(undefined)
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