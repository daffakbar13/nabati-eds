/* eslint-disable operator-linebreak */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { multipleSubmitQuotation } from 'src/api/quotation'
import { useSalesQuotationListContext } from '../../states'

export default function ConfirmSubmit() {
  const {
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess, changeSubmittedQuotation },
    state: {
      table: {
        state: { selected, description },
      },
    },
  } = useSalesQuotationListContext()
  const oneSelected = selected.length === 1

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit quotation
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
          onClick={() => unShowConfirm()}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            runProcess('Wait for submitting Quotation')
            multipleSubmitQuotation({ order_list: selected.map((id) => ({ id })) })
              .then((response) => response.data)
              .then((data) => {
                showConfirm('success-submit')
                changeSubmittedQuotation(data.results.map(({ id }) => id))
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
