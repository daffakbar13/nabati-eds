import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { deleteSalesmanDivision } from 'src/api/salesman-division'
import { useSalesSalesmanDivisionContext } from '../../states'

export default function ConfirmCancel() {
  const {
    state: {
      table: {
        state: { selected, description },
      },
    },
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess },
  } = useSalesSalesmanDivisionContext()
  const oneSelected = selected.length === 1

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Delete
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure want delete Salesman ID
        <Typography.Text>
          {oneSelected && ` ${description.text}`}
          {!oneSelected && (
            <Popover content={description.content}>{` ${description.text}`}</Popover>
          )}
        </Typography.Text>
        {' ?'}
      </Typography.Title>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={unShowConfirm}>
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            selected.forEach((id, i) => {
              const isLastIndex = i === selected.length - 1
              runProcess('Wait for deleting salesman')
              deleteSalesmanDivision(id)
                .then(() => {
                  if (isLastIndex) {
                    stopProcess()
                    showConfirm('delete')
                  }
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
