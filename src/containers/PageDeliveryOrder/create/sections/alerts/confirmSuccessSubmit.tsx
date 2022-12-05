import React from 'react'
import { Popup } from 'src/components'
import { Text, Button } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'

interface ConfirmSuccessSubmitProps {
  newDeliveryOrder: string
  draftDeliveryOrder: string
}

export default function ConfirmSuccessSubmit(props: ConfirmSuccessSubmitProps) {
  const { newDeliveryOrder, draftDeliveryOrder } = props
  const router = useRouter()

  return (
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
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          {'New Delivery Order '}
          <Typography.Text copyable>{newDeliveryOrder || draftDeliveryOrder}</Typography.Text>
          {' has been'}
        </div>
        <div>successfully {newDeliveryOrder ? 'created' : 'saved'}</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/delivery-order`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )
}
