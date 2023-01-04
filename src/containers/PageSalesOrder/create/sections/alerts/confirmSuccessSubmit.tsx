import React from 'react'
import { Popup } from 'src/components'
import { Text, Button } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'

export default function ConfirmSuccessSubmit() {
  const {
    state: { salesOrderId, confirm },
  } = useSalesSalesOrderCreateContext()
  const router = useRouter()
  const isCreate = confirm === 'newSO'

  return (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> {isCreate ? 'Submit' : 'Saved'} Success
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
          {'New Sales Order '}
          <Typography.Text copyable={{ text: salesOrderId as string }}>{salesOrderId}</Typography.Text>
          {' has been'}
        </div>
        <div>successfully {isCreate ? 'created' : 'saved'}</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/sales-order`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )
}
