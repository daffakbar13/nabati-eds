import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useSFACallPlanPatternContext } from '../../states'
import { updateCallPlanActivation } from 'src/api/call-plan-pattern'

export default function ConfirmActivation() {
  const {
    state: { selected },
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess },
  } = useSFACallPlanPatternContext()
  const isActive = selected.is_active === '1'

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm {isActive ? 'Inactivation' : 'Activation'}
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        {'Are you sure want '}
        {isActive ? 'Unactivate' : 'Activate'}
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
            runProcess(`Wait for ${isActive ? 'inactivation' : 'activation'} Call Plan`)
            updateCallPlanActivation({ ...selected, is_active: isActive ? '0' : '1' })
              .then(() => {
                showConfirm('success-activation')
                stopProcess()
              })
              .catch(() => stopProcess())
          }}
          //onClick={unShowConfirm}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
