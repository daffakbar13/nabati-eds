import React, { ChangeEvent, useState } from 'react'
import { Button, DatePickerInput } from 'pink-lava-ui'
import { Popup } from 'src/components'
import { Typography } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { confirmUndelivered } from 'src/api/undelivered'

interface Props {
  payload: any
  // // eslint-disable-next-line no-unused-vars
  onCancel: (e?: ChangeEvent<HTMLButtonElement>) => any
  // // eslint-disable-next-line no-unused-vars
  // onSubmit: (date: any) => any
  setShowConfirm: (...args: any) => void
  setProccessing: (...args: any) => void
}

const ConfirmConfirm: React.FC<Props> = ({ onCancel, payload, setShowConfirm, setProccessing }) => {
  const [date, setDate] = useState(null)
  const router = useRouter()

  return (
    <>
      <Popup>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Confirmation
        </Typography.Title>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Are you sure to Confirm Undelivere {router.query.id} ?
        </Typography.Title>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={onCancel}>
            No
          </Button>
          <Button
            size="big"
            style={{ flexGrow: 1 }}
            variant="primary"
            onClick={() => {
              confirmUndelivered(payload)
                .then(() => {
                  setShowConfirm('success-reschedule')
                  setProccessing('')
                })
                .catch(() => setProccessing(''))
            }}
          >
            Yes
          </Button>
        </div>
      </Popup>
    </>
  )
}

export default ConfirmConfirm
