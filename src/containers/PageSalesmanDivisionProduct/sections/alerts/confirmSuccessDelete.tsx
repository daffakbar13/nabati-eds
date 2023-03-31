import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button, Text } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useSalesSalesmanDivisionContext } from '../../states'

export default function ConfirmSuccessDelete() {
  const {
    state: {
      table: {
        state: { selected, description },
      },
    },
  } = useSalesSalesmanDivisionContext()
  const router = useRouter()
  const oneSelected = selected.length === 1

  return (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Delete Success
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
          Product ID
          <Typography.Text
            copyable={{ text: oneSelected ? description.text : selected.join(', ') }}
          >
            {oneSelected ? (
              ` ${description.text}`
            ) : (
              <Popover content={description.content}>{` ${description.text}`}</Popover>
            )}
          </Typography.Text>{' '}
          {' has been'}
        </div>
        <div>successfully deleted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(router.asPath)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )
}
