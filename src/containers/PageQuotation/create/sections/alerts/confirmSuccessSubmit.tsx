import React from 'react'
import { Popup } from 'src/components'
import { Text, Button } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { useSalesQuotationCreateContext } from 'src/hooks/contexts'
import { useTableProduct } from '../../columns'

export default function ConfirmSuccessSubmit() {
  const pageCtx = useSalesQuotationCreateContext<typeof useTableProduct>()
  const router = useRouter()

  return (
    <pageCtx.getConsumer>
      {({ state }) => {
        const { newQuotation, draftQuotation } = state

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
                {'New Quotation '}
                <Typography.Text copyable>{newQuotation || draftQuotation}</Typography.Text>
                {' has been'}
              </div>
              <div>successfully {newQuotation ? 'created' : 'saved'}</div>
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
