/* eslint-disable operator-linebreak */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useTable } from 'src/hooks'
import { manualSubmitDeliveryOrder } from 'src/api/delivery-order'

interface ConfirmSubmitProps {
  table: ReturnType<typeof useTable>
  handleProcess: (process: string) => void
  handleShowConfirm: (confirm: string) => void
  handleSubmittedDeliveryOrder: (setState: (old: any[]) => any[]) => void
  selectedDeliveryOrder: { text: string; content: React.ReactNode }
}

export default function ConfirmSubmit(props: ConfirmSubmitProps) {
  const {
    handleProcess,
    handleShowConfirm,
    table,
    handleSubmittedDeliveryOrder,
    selectedDeliveryOrder,
  } = props
  const oneSelected = table.selected.length === 1

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit Delivery Order
        <Typography.Text>
          {oneSelected && ` ${selectedDeliveryOrder.text}`}
          {!oneSelected && (
            <Popover
              content={selectedDeliveryOrder.content}
            >{` ${selectedDeliveryOrder.text}`}</Popover>
          )}
        </Typography.Text>
        {' ?'}
      </Typography.Title>
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
            handleProcess('Wait for submitting Delivery Order')
            table.selected.forEach((id) => {
              manualSubmitDeliveryOrder(id)
                .then((response) => response.data)
                .then((data) => {
                  handleShowConfirm('success-submit')
                  handleSubmittedDeliveryOrder((old) => [...old, data.id])
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
