/* eslint-disable operator-linebreak */
import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { generateNonCallPlan } from 'src/api/non-call-plan-list'
import { useSFANonCallPlanListContext } from '../../states/useContext'

export default function ConfirmSubmit() {
  const {
    state: { formCreateNonCallPlan },
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess },
  } = useSFANonCallPlanListContext()

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit non call plan ?
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
            generateNonCallPlan(formCreateNonCallPlan)
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
