/* eslint-disable operator-linebreak */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { multipleSubmitSalesOrder } from 'src/api/sales-order'
import { useSalesSalesOrderListContext } from 'src/hooks/contexts'

export default function ConfirmSubmit() {
  const {
    state: {
      table: {
        state: { selected, description },
      },
    },
    handler: { runProcess, stopProcess, showConfirm, unShowConfirm, changeSubmittedSalesOrder },
  } = useSalesSalesOrderListContext()
  const oneSelected = selected.length === 1

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit Sales Order
        <Typography.Text>
          {oneSelected && ` ${description.text}`}
          {!oneSelected && (
            <Popover content={description.content}>{` ${description.text}`}</Popover>
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
            runProcess('Wait for submitting Sales Order')
            selected.forEach((id) => {
              multipleSubmitSalesOrder(id)
                .then((response) => response.data)
                .then((data) => {
                  showConfirm('success-submit')
                  changeSubmittedSalesOrder(data.id)
                  stopProcess()
                })
                .catch(() => stopProcess())
            })
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
