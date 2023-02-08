/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */

import React, { useEffect } from 'react'
import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { useDetail } from 'src/hooks'
import { useRouter } from 'next/router'
import Loader from 'src/components/Loader'
import moment from 'moment'
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { PATH } from 'src/configs/menus'
import { getDetailProformaInvoiceByShipmentAndDevlivery } from 'src/api/proforma-invoice'
import { useProformaInvoiceCreateContext } from './states'
import TableEditProformaInvoice from './Table'
import ProformaInvoiceCreateProvider from './_provider'

export function PageEdit() {
  const titlePage = useTitlePage('edit')
  const [showConfirm, setShowConfirm] = React.useState<'confirm' | 'success-confirm' | ''>('')
  const [processing, setProcessing] = React.useState('')
  const router = useRouter()
  const data = useDetail(getDetailProformaInvoiceByShipmentAndDevlivery, {
    shipment_id: router.query.shipment_id as string,
    delivery_id: router.query.id as string,
  })

  const { handler } = useProformaInvoiceCreateContext()

  useEffect(() => {
    if (data && data.length > 0) {
      handler.handleSetDataTableDeliveryOrder(data)
    }
  }, [data])

  const isStatus = (...value: string[]) => value.includes(router.query.status as string)

  const ConfirmProduct = () => (
    <Popup onOutsideClick={() => setShowConfirm('')}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Delivery
      </Typography.Title>
      <b>Are you sure to confirm delivery shipment {router.query.id}</b>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => setShowConfirm('')}
        >
          No
        </Button>
        <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={() => {}}>
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccess = () => (
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
          Proforma Invoice
          <Typography.Text copyable={{ text: router.query.id as string }}>
            {router.query.id}
          </Typography.Text>
          has been
        </div>
        <div>successfully submitted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push({
              pathname: `${PATH.SALES}/proforma-invoice/${router.query.shipment_id}/detail`,
            })
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  return (
    <Col>
      {processing !== '' && <Loader type="process" text={processing} />}
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            // router.push({
            //   pathname: `${PATH.SALES}/proforma-invoice/${router.query.shipment_id}/detail`,
            // })
            router.back()
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          <Button size="big" variant="primary" onClick={() => setShowConfirm('confirm')}>
            Confirm Delivery
          </Button>
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        {data && data.length > 0 ? (
          <TableEditProformaInvoice />
        ) : (
          <Loader type="process" text="Wait for get data" />
        )}
      </Card>
      {showConfirm === 'confirm' && <ConfirmProduct />}
      {showConfirm === 'success-confirm' && <ConfirmSuccess />}
    </Col>
  )
}

export default function PageProformaInvoiceEdit() {
  return (
    <ProformaInvoiceCreateProvider>
      <PageEdit />
    </ProformaInvoiceCreateProvider>
  )
}
