/* eslint-disable operator-linebreak */
import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useSFACallPlanPatternContext } from '../../states'
import { createCallPlanPattern } from 'src/api/call-plan-pattern'

export default function ConfirmSubmit() {
  const {
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess, changeCreateCallPlanPattern },
  } = useSFACallPlanPatternContext()

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit call plan pattern ?
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
            runProcess('Wait for submitting Quotation')
            createCallPlanPattern({
              company_id: '',
              customer_id: '',
              salesman_id: '',
              visit_day: '',
              cycle: '',
              is_active: '',
            })
              .then((params) => {
                //showConfirm('success-submit')
                changeCreateCallPlanPattern(params)
                stopProcess()
              })
              .catch(() => {
                stopProcess()
              })
          }}

          //</div>onClick={() => unShowConfirm()}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
