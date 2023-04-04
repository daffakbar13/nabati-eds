/* eslint-disable operator-linebreak */
import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { generateCallPlan } from 'src/api/call-plan-list'
import { useSFACallPlanListContext } from '../../states'

export default function ConfirmSubmit() {
  const {
    state: { formCreateCallPlan },
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess },
  } = useSFACallPlanListContext()

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit call plan ?
      </Typography.Title>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => unShowConfirm()}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            runProcess('Wait for submitting Call PLan List')
            generateCallPlan(formCreateCallPlan)
              .then(() => {
                showConfirm('success-submit')
                stopProcess()
              })
              .catch(() => stopProcess())
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
