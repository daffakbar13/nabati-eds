/* eslint-disable operator-linebreak */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { multipleSubmitSalesOrder } from 'src/api/sales-order'
import { useTable } from 'src/hooks'

interface ConfirmSubmitProps {
  table: ReturnType<typeof useTable>
  handleProcess: (process: string) => void
  handleShowConfirm: (confirm: string) => void
  handleSubmittedSalesOrder: (setState: (old: any[]) => any[]) => void
  selectedSalesOrder: { text: string; content: React.ReactNode }
}

export default function ConfirmSubmit(props: ConfirmSubmitProps) {
  const { handleProcess, handleShowConfirm, table, handleSubmittedSalesOrder, selectedSalesOrder } =
    props
  const oneSelected = table.selected.length === 1

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit Sales Order
        <Typography.Text>
          {oneSelected && ` ${selectedSalesOrder.text}`}
          {!oneSelected && (
            <Popover content={selectedSalesOrder.content}>{` ${selectedSalesOrder.text}`}</Popover>
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
            handleProcess('Wait for submitting Sales Order')
            table.selected.forEach((id) => {
              multipleSubmitSalesOrder(id)
                .then((response) => response.data)
                .then((data) => {
                  handleShowConfirm('success-submit')
                  handleSubmittedSalesOrder((old) => [...old, data.id])
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
