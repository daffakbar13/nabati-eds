/* eslint-disable operator-linebreak */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { multipleSubmitQuotation } from 'src/api/quotation'
import { useTable } from 'src/hooks'

interface ConfirmSubmitProps {
  table: ReturnType<typeof useTable>
  handleProcess: (process: string) => void
  handleShowConfirm: (confirm: string) => void
  handleSubmittedQuotation: (id: string[]) => void
  selectedQuotation: { text: string; content: React.ReactNode }
}

export default function ConfirmSubmit(props: ConfirmSubmitProps) {
  const { handleProcess, handleShowConfirm, table, handleSubmittedQuotation, selectedQuotation } =
    props
  const oneSelected = table.selected.length === 1

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit quotation
        <Typography.Text>
          {oneSelected && ` ${selectedQuotation.text}`}
          {!oneSelected && (
            <Popover content={selectedQuotation.content}>{` ${selectedQuotation.text}`}</Popover>
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
            handleProcess('Wait for submitting Quotation')
            multipleSubmitQuotation({ order_list: table.selected.map((id) => ({ id })) })
              .then((response) => response.data)
              .then((data) => {
                handleShowConfirm('success-submit')
                handleSubmittedQuotation(data.results.map(({ id }) => id))
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
