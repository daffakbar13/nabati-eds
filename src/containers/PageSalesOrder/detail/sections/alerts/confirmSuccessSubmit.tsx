import React from 'react'
import { Popup } from 'src/components'
import { Text, Button } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { useSalesSalesOrderDetailContext } from 'src/hooks/contexts'

export default function ConfirmSuccessSubmit() {
  const {
    state: { newDeliveryID },
  } = useSalesSalesOrderDetailContext()
  const router = useRouter()
  const isEditPage = router.asPath.includes('edit')

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
          {!isEditPage ? 'New' : ''} {' Delivery Order '}
          <Typography.Text copyable={{ text: newDeliveryID }}>{newDeliveryID}</Typography.Text>
          {' has been'}
        </div>
        <div>successfully submitted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="tertiary"
          onClick={() => {
            router.push(`${PATH.SALES}/sales-order`)
          }}
        >
          Back To List
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/delivery-order/detail/${newDeliveryID}`)
          }}
        >
          Next Process
        </Button>
      </div>
    </Popup>
  )
}
