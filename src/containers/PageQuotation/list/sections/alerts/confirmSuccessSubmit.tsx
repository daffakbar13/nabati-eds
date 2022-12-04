/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button, Text } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { SalesQuotationListCtx } from '../../states'

export default function ConfirmSuccessSubmit() {
  const router = useRouter()
  return (
    <SalesQuotationListCtx.Consumer>
      {({ state }) => {
        const { table, submittedQuotation } = state
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
                New Sales Order
                <Typography.Text
                  copyable={{
                    text: oneSelected ? submittedQuotation[0] : submittedQuotation.join(', '),
                  }}
                >
                  {oneSelected ? (
                    ` ${submittedQuotation[0]}`
                  ) : (
                    <Popover content={submittedQuotation.join(', ')}>
                      {` ${submittedQuotation[0]}, +${submittedQuotation.length - 1} more`}
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
                  router.push(router.pathname)
                }}
              >
                Back To List
              </Button>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="primary"
                onClick={() => {
                  router.push(`${PATH.SALES}/sales-order`)
                }}
              >
                Next Process
              </Button>
            </div>
          </Popup>
        )
      }}
    </SalesQuotationListCtx.Consumer>
  )
}
