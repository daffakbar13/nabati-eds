import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useSFACallPlanPatternContext } from '../../states'

export default function ConfirmActivation() {
  const {
    state: { selected },
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess },
  } = useSFACallPlanPatternContext()
  const isActive = selected.is_active === 'Active'

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm {isActive ? 'Inactivation' : 'Activation'}
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        {'Are you sure want '}
        {isActive ? 'inactivate' : 'activate'}
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
          // onClick={() => {
          // runProcess(`Wait for ${isActive ? 'inactivation' : 'activation'} salesman division`)
          // updateSalesmanDivision({ ...editable, is_active: isActive ? 0 : 1 })
          //   .then(() => {
          //     showConfirm('success-activation')
          //     stopProcess()
          //   })
          //   .catch(() => stopProcess())
          // }}
          onClick={unShowConfirm}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
