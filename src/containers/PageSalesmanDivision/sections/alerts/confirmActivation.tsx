import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { deleteSalesmanDivision, updateSalesmanDivision } from 'src/api/salesman-division'
import { concatString } from 'src/utils/concatString'
import { useSalesSalesmanDivisionContext } from '../../states'

export default function ConfirmActivation() {
  const {
    state: {
      table: {
        state: { selected },
      },
      editable,
    },
    handler: { showConfirm, unShowConfirm, runProcess, stopProcess },
  } = useSalesSalesmanDivisionContext()
  const isActive = editable.is_active === 'Active'

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Active
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        {'Are you sure want '}
        {isActive ? 'unactivated' : 'activated'}
        {' Salesman ID '}
        <Typography.Text>
          {concatString(editable.salesman_id, editable.salesman_name)}
        </Typography.Text>
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
            runProcess(`Wait for ${isActive ? 'inactivation' : 'activation'} salesman division`)
            updateSalesmanDivision({ ...editable, is_active: isActive ? 0 : 1 })
              .then(() => {
                showConfirm('success-activation')
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
