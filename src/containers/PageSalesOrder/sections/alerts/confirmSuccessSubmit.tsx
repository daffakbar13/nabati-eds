/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button, Text } from 'pink-lava-ui'
import { useTable } from 'src/hooks'
import { CheckCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'

interface ConfirmSuccessSubmitProps {
  table: ReturnType<typeof useTable>
  submittedSalesOrder: string[]
}

export default function ConfirmSuccessSubmit(props: ConfirmSuccessSubmitProps) {
  const { submittedSalesOrder, table } = props
  const router = useRouter()
  const oneSelected = table.selected.length === 1

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
          fontWeight: 'bold',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          New Delivery Order
          <Typography.Text
            copyable={{
              text: oneSelected ? submittedSalesOrder[0] : submittedSalesOrder.join(', '),
            }}
          >
            {oneSelected ? (
              ` ${submittedSalesOrder[0]}`
            ) : (
              <Popover content={submittedSalesOrder.join(', ')}>
                {` ${submittedSalesOrder[0]}, +${submittedSalesOrder.length - 1} more`}
              </Popover>
            )}
          </Typography.Text>{' '}
          has been
        </div>
        <div>successfully submitted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            router.reload()
          }}
        >
          Back To List
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/delivery-order`)
          }}
        >
          Next Process
        </Button>
      </div>
    </Popup>
  )
}