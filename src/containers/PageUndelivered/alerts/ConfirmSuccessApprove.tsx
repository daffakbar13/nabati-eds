import React, { ChangeEvent } from 'react'
import { Button, Text } from 'pink-lava-ui'
import { Popup } from 'src/components'
import { Typography } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'

type Props = {
  selectedItems: any[]
  onOk: (e: ChangeEvent<HTMLButtonElement>) => any
}

const ConfirmSuccessApprove: React.FC<Props> = ({ selectedItems, onOk }) => {
  return (
    <>
      <Popup>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Text
            textAlign="center"
            style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
          >
            <>
              <CheckCircleFilled /> Approve Success
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
            Sales Order
            <Typography.Text copyable={{ text: selectedItems.join(',') as string }}>
              {' '}
              {selectedItems.join(', ')}
            </Typography.Text>{' '}
            has been
          </div>
          <div>successfully approved</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={onOk}>
            OK
          </Button>
        </div>
      </Popup>
    </>
  )
}

export default ConfirmSuccessApprove
