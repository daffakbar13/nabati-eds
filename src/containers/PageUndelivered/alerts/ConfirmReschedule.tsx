import React, { ChangeEvent, useState } from 'react'
import { Button, DatePickerInput } from 'pink-lava-ui'
import { Popup } from 'src/components'
import { Typography } from 'antd'
import moment from 'moment'

type Props = {
  onSubmit: (date: any) => any
  onCancel: (e?: ChangeEvent<HTMLElement>) => any
}

const ConfirmReschedule: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [date, setDate] = useState(null)

  return (
    <>
      <Popup>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Confirm Reschedule
        </Typography.Title>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            // console.log(moment(val).format('DD-MMM-YYYY'))
            setDate(moment(val).format('DD-MMM-YYYY'))
          }}
          label="Confirm Reschedule"
          disabledDate={(current) => current < moment().startOf('day')}
          defaultValue={moment()}
          format={'DD-MMM-YYYY'}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={onCancel}>
            No
          </Button>
          <Button
            size="big"
            style={{ flexGrow: 1 }}
            variant="primary"
            onClick={() => onSubmit(date)}
          >
            Yes
          </Button>
        </div>
      </Popup>
    </>
  )
}

export default ConfirmReschedule
