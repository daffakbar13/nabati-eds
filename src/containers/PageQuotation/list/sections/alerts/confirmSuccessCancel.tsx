/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button, Text } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { useSalesQuotationListContext } from 'src/hooks/contexts'

export default function ConfirmSuccessCancel() {
  const pageCtx = useSalesQuotationListContext()
  const router = useRouter()
  return (
    <pageCtx.getConsumer>
      {({ state }) => {
        const { table } = state
        const oneSelected = table.selected.length === 1

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
                <Typography.Text
                  copyable={{
                    text: oneSelected ? table.description.text : table.selected.join(', '),
                  }}
                >
                  {oneSelected ? (
                    ` ${table.description.text}`
                  ) : (
                    <Popover
                      content={table.description.content}
                    >{` ${table.description.text}`}</Popover>
                  )}
                </Typography.Text>{' '}
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
      }}
    </pageCtx.getConsumer>
  )
}
