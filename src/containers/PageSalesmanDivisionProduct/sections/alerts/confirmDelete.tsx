import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useSalesSalesmanDivisionContext } from '../../states'

export default function ConfirmCancel() {
  const {
    state: {
      table: {
        state: { selected, description },
      },
    },
    handler: { unShowConfirm },
  } = useSalesSalesmanDivisionContext()
  const oneSelected = selected.length === 1

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Delete
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure want delete Salesman
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
        <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={() => {}}>
          Yes
        </Button>
      </div>
    </Popup>
  )
}
