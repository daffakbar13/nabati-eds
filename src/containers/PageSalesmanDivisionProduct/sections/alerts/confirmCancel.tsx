import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useSalesSalesmanDivisionContext } from '../../states'

export default function ConfirmCancel() {
  const {
    handler: { unShowConfirm, unShowModal },
  } = useSalesSalesmanDivisionContext()

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <b>Are you sure want to cancel? Change you made so far will not saved</b>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={unShowConfirm}>
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            unShowConfirm()
            unShowModal()
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
