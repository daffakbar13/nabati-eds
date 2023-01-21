import React, { ChangeEvent, FC } from 'react'
import { Button } from 'pink-lava-ui'
import { Popup } from 'src/components'
import { Typography } from 'antd'

interface Props {
  selectedItems: any[]
  onCancel: (e?: ChangeEvent<HTMLButtonElement>) => any
  onSubmit?: (e?: ChangeEvent<HTMLButtonElement>) => any
}

const ConfirmApprove: FC<Props> = ({ selectedItems, onCancel, onSubmit }) => {
  return (
    <>
      <Popup onOutsideClick={onCancel}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Confirm Approve
        </Typography.Title>
        Are you sure to approve Sales Order {selectedItems.join(', ')} ?
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={onCancel}>
            No
          </Button>
          <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={onSubmit}>
            Yes
          </Button>
        </div>
      </Popup>
    </>
  )
}

export default ConfirmApprove
