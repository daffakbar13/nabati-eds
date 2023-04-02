import React, { ChangeEvent, FC } from 'react'
import { Button } from 'pink-lava-ui'
import { Popup } from 'src/components'
import { Typography, Input } from 'antd'
// import DebounceSelect from 'src/components/DebounceSelect'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'

interface Props {
  onCancel: (e?: ChangeEvent<HTMLButtonElement>) => any
  onSubmit?: (reason?: string) => any
}

const ConfirmReject: FC<Props> = ({ onCancel, onSubmit }) => {
  const [reason, setReason] = React.useState('')

  return (
    <>
      <Popup>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Confirm Rejectation
        </Typography.Title>
        {/* <Input.TextArea
          id="inputReason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        /> */}
        <DebounceSelect
          type="select"
          label="Reason"
          required
          value={reason?.split(' - ')[0]}
          fetchOptions={() => fieldReason('J')}
          onChange={(e: any) => {
            setReason([e.value, e.label].join(' - '))
          }}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={onCancel}>
            No
          </Button>
          <Button
            size="big"
            style={{ flexGrow: 1 }}
            variant="primary"
            onClick={() => onSubmit(reason)}
          >
            Yes
          </Button>
        </div>
      </Popup>
    </>
  )
}

export default ConfirmReject
