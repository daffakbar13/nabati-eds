import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Button, Text } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { cancelBatchOrder } from 'src/api/quotation'
import { fieldReason } from 'src/configs/fieldFetches'
import { CheckCircleFilled } from '@ant-design/icons'
import { PATH } from 'src/configs/menus'

interface ConfirmCancelProps {}

export default function ConfirmCancel(props: ConfirmCancelProps) {
  const router = useRouter()

  return (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Cancel Success
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
          Quoatation
          <Typography.Text copyable={{ text: router.query.id as string }}>
            {` ${router.query.id} `}
          </Typography.Text>
          has been
        </div>
        <div>successfully canceled</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/quotation`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )
}
