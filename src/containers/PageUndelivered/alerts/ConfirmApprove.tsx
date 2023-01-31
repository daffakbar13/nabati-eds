// import React, { ChangeEvent, FC } from 'react'
// import { Button } from 'pink-lava-ui'
// import { Popup } from 'src/components'
// import { Typography } from 'antd'

// interface Props {
//   selectedItems: any[]
//   onCancel: (e?: ChangeEvent<HTMLButtonElement>) => any
//   onSubmit?: (e?: ChangeEvent<HTMLButtonElement>) => any
// }

// const ConfirmApprove: FC<Props> = ({ selectedItems, onCancel, onSubmit }) => {
//   return (
//     <>
//       <Popup onOutsideClick={onCancel}>
//         <Typography.Title level={3} style={{ margin: 0 }}>
//           Confirm Approve
//         </Typography.Title>
//         Are you sure to approve Sales Order {selectedItems.join(', ')} ?
//         <div style={{ display: 'flex', gap: 10 }}>
//           <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={onCancel}>
//             No
//           </Button>
//           <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={onSubmit}>
//             Yes
//           </Button>
//         </div>
//       </Popup>
//     </>
//   )
// }

// export default ConfirmApprove

import React, { ChangeEvent, useState } from 'react'
import { Button, DatePickerInput } from 'pink-lava-ui'
import { Popup } from 'src/components'
import { Typography } from 'antd'
import moment from 'moment'

interface Props {
  selectedItems: any[]
  onCancel: (e?: ChangeEvent<HTMLButtonElement>) => any
  onSubmit: (date: any) => any
}

const ConfirmApprove: React.FC<Props> = ({ onSubmit, onCancel, selectedItems }) => {
  const [date, setDate] = useState(null)

  return (
    <>
      <Popup>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Reschedule
        </Typography.Title>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Undelivered
        </Typography.Title>
        {selectedItems.join(', ')}
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            // console.log(moment(val).format('DD-MMM-YYYY'))
            setDate(moment(val).format('YYYY-MM-DD'))
          }}
          label="New Undelivered Date"
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
            onClick={() => onSubmit(date || moment().format('YYYY-MM-DD'))}
          >
            Yes
          </Button>
        </div>
      </Popup>
    </>
  )
}

export default ConfirmApprove
