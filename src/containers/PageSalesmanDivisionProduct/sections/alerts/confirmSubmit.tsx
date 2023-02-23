/* eslint-disable operator-linebreak */
import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import {
  createSalesmanDivisionProduct,
  updateSalesmanDivisionProduct,
} from 'src/api/salesman-division-product'
import { useSalesSalesmanDivisionContext } from '../../states'

export default function ConfirmSubmit() {
  const {
    handler: {
      showConfirm,
      unShowConfirm,
      runProcess,
      stopProcess,
      changeSubmittedSalesmanDivisionProduct,
    },
    state: { editable, showModal },
  } = useSalesSalesmanDivisionContext()
  const func =
    showModal === 'create' ? createSalesmanDivisionProduct : updateSalesmanDivisionProduct

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to {showModal === 'create' ? 'submit' : 'update'} Salesman Division Product ?
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
            runProcess(
              `Wait for ${showModal === 'create' ? 'submitting' : 'updating'} Salesman Division`,
            )
            func({ ...editable, is_active: editable.is_active === 'Active' ? 1 : 0 })
              .then((response) => {
                showConfirm('success-submit')
                changeSubmittedSalesmanDivisionProduct(response.data)
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
