import React from 'react'
import { Button as ButtonPinkLava, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, Loader } from 'src/components'
import { Row, Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import Total from 'src/components/Total'
import { useDetail } from 'src/hooks'
import { finishCollection, getCollectionDetail, updateCollection } from 'src/api/collection'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useTableDetailCollection } from './columns'

export default function PageCollectionDetail() {
  const titlePage = useTitlePage('edit')
  const router = useRouter()
  const data = useDetail(getCollectionDetail, { id: router.query.id as string })
  const [processing, setProcessing] = React.useState<string>()
  const hasData = Object.keys(data).length > 0

  function getTotalAmount() {
    if (hasData) {
      const totalAmount = [...data.details].map((d) => d.billing_amount).reduce((a, b) => a + b)
      return Number(Number(totalAmount).toFixed(0)).toLocaleString()
    }
    return 0
  }

  function isCanSubmit() {
    if (hasData) {
      return ![...data.details].map((e) => e.is_delivered).includes(0)
    }
    return false
  }

  function undeliveBilling(
    billing_id: string,
    cancelation_reason_id: string,
    cancelation_reason_name: string,
  ) {
    setProcessing('Wait for undeliver billing')
    updateCollection({
      is_eds: 1,
      shipment_id: router.query.id,
      billings: [{ billing_id, is_delivered: 0, cancelation_reason_id, cancelation_reason_name }],
    })
      .then(() => router.push(router.asPath))
      .catch(() => setProcessing(undefined))
  }

  function deliveBilling(data_billing: any) {
    const { billing_number, billing_amount } = data_billing
    setProcessing('Wait for deliver billing')
    updateCollection({
      is_eds: 1,
      shipment_id: router.query.id,
      billings: [
        {
          billing_id: billing_number,
          is_delivered: 1,
          payments: [
            {
              amount: billing_amount,
              payment_method: 'C',
              bank_name: '',
              account_number: '',
              valid_to: '',
              remarks: '',
            },
          ],
        },
      ],
    })
      .then(() => router.push(router.asPath))
      .catch(() => setProcessing(undefined))
  }

  const handleFinishPayload = () => ({
    shipment_id: router.query.id,
    billings: [...data.details].map((e) => {
      const isDelivered = e.undelivered_reason_id === ''
      return {
        billing_id: e.billing_number,
        is_delivered: isDelivered ? 1 : 0,
        cancelation_reason_id: e.cancelation_reason_id,
        cancelation_reason_name: e.cancelation_reason_name,
        payments: [
          {
            amount: e.billing_amount,
            payment_method: 'C',
            bank_name: '',
            account_number: '',
            valid_to: '',
            remarks: '',
          },
        ],
      }
    }),
  })

  const { columns, modalDelivered } = useTableDetailCollection(undeliveBilling, deliveBilling)

  return (
    <Col>
      {processing && <Loader type="process" text={processing} />}
      <>
        {modalDelivered}
        <Row justify="space-between">
          <Row gutter={16} align="middle">
            <Col>
              <ArrowLeftOutlined
                onClick={() => {
                  router.push({ pathname: `${PATH.SALES}/collection` })
                }}
                style={{ fontSize: 25 }}
              />
            </Col>
            <Col>
              <Text variant={'h4'}>Cash {titlePage}</Text>
            </Col>
          </Row>
          <Col>
            {/* {tradeType !== 'MT' && ( */}
            <ButtonPinkLava
              size="big"
              variant="primary"
              disabled={!isCanSubmit()}
              onClick={() => {
                if (hasData) {
                  setProcessing('Wait for finish collection')
                  finishCollection(handleFinishPayload())
                    .then(() => {
                      setProcessing(undefined)
                      router.push(`${PATH.SALES}/collection`)
                    })
                    .catch(() => setProcessing(undefined))
                }
              }}
            >
              Finish
            </ButtonPinkLava>
            {/* )} */}
          </Col>
        </Row>
        <Spacer size={20} />
        <Card style={{ padding: '16px 20px' }}>
          <Table dataSource={data?.details || []} columns={columns} scroll={{ x: 'max-content' }} />
          <Spacer size={30} />
          <Row justify="end">
            <Col>
              <Total label="Total Amount" value={getTotalAmount()} />
            </Col>
          </Row>
        </Card>
      </>
    </Col>
  )
}
