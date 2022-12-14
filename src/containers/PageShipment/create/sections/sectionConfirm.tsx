/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
import { Typography } from 'antd'
import React from 'react'
import { Button, Text } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { Popup } from 'src/components'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { useSalesShipmentCreateContext } from '../states'

interface DescVehicleProps {
  label: string
  value: string
}

export default function SectionConfirm() {
  const {
    state: { confirm, shipmentID },
    handler: { unShowConfirm },
  } = useSalesShipmentCreateContext()

  const router = useRouter()

  const ConfirmSuccessSubmit = () => (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Submit Success
          </>
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 4,
          fontWeight: 'bold',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          {'New Shipment '}
          <Typography.Text copyable>{shipmentID}</Typography.Text>
          {' has been'}
        </div>
        <div>successfully {shipmentID ? 'created' : 'saved'}</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/shipment`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  const ConfirmCancel = () => (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <b>Are you sure want to cancel? Change you made so far will not saved</b>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            unShowConfirm()
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            if (router.query.status) {
              const { status } = router.query
              router.push(`${PATH.SALES}/shipment/detail/${router.query.id}?status=${status}`)
            } else {
              router.push(`${PATH.SALES}/shipment`)
            }
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  return (
    <>
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'submit-success' && <ConfirmSuccessSubmit />}
    </>
  )
}
