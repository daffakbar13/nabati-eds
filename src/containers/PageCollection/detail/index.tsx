import React from 'react'
import { Button as ButtonPinkLava, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, Loader } from 'src/components'
import { Button, Row, Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import Total from 'src/components/Total'
import { useDetail } from 'src/hooks'
import { finishCollection, getCollectionDetail } from 'src/api/collection'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { useTableDetailCollection } from './columns'

export default function PageCollectionDetail() {
  const titlePage = useTitlePage('edit')
  const router = useRouter()
  const data = useDetail(getCollectionDetail, { id: router.query.id as string })
  const [finishPayload, setFinishPayload] = React.useState<any>({})
  const [processing, setProcessing] = React.useState<string>()
  const hasData = Object.keys(data).length > 0

  function undeliveBilling(billing_id: string, cancelation_reason_id: string) {
    setFinishPayload((prev) => ({
      shipment_id: prev.shipment_id,
      billings: prev.billings?.map((b) => {
        if (b.billing_id === billing_id) {
          return { ...b, is_delivered: 0, cancelation_reason_id, payments: [] }
        }
        return b
      }),
    }))
  }

  function deliveBilling(data_billing: any) {
    setFinishPayload((prev) => ({
      shipment_id: prev.shipment_id,
      billings: prev.billings?.map((b) => {
        if (b.billing_id === data_billing.billing_id) {
          return {
            ...b,
            is_delivered: 1,
            cancelation_reason_id: '',
            payments: [
              {
                amount: data_billing.billing_amount,
                payment_method: 'C',
                bank_name: '',
                account_number: '',
                valid_to: '',
                remarks: '',
              },
            ],
          }
        }
        return b
      }),
    }))
  }

  const { columns, modalDelivered } = useTableDetailCollection(undeliveBilling, deliveBilling)

  React.useEffect(() => {
    if (hasData) {
      setFinishPayload(() => ({
        shipment_id: router.query.id,
        billings: data.details.map((d) => ({
          billing_id: d.billing_number,
          is_delivered: 1,
          cancelation_reason_id: '',
          payments: [
            {
              amount: d.billing_amount,
              payment_method: 'C',
              bank_name: '',
              account_number: '',
              valid_to: '',
              remarks: '',
            },
          ],
        })),
      }))
    }
  }, [data])

  return (
    <Col>
      {processing && <Loader type="process" text={processing} />}
      {hasData && (
        <>
          {modalDelivered}
          <div style={{ display: 'flex' }}>
            <Text variant={'h4'}>Confirm {titlePage}</Text>
            <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 2 }}>
              <Button>asd</Button>
              <ButtonPinkLava
                size="big"
                variant="primary"
                onClick={() => {
                  setProcessing('Wait for finish collection')
                  finishCollection(finishPayload)
                    .then(() => {
                      setProcessing(undefined)
                      router.push(`${PATH.SALES}/collection`)
                    })
                    .catch(() => setProcessing(undefined))
                }}
              >
                Finish
              </ButtonPinkLava>
            </div>
          </div>
          <Spacer size={20} />
          <Card style={{ padding: '16px 20px' }}>
            <div style={{ overflow: 'scroll' }}>
              <Table dataSource={data.details} columns={columns} scroll={{ x: 'max-content' }} />
            </div>
            <Spacer size={30} />
            <Row>
              <Col span={12} offset={12}>
                <Total label="Total Amount" value={123} />
              </Col>
            </Row>
          </Card>
        </>
      )}
    </Col>
  )
}
