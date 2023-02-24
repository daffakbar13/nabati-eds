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

  const {
    state: { dataDeliveryOrder },
    handler,
  } = useProformaInvoiceCreateContext()

  useEffect(() => {
    if (window) {
      const revised = JSON.parse(window.localStorage.getItem('revised')) || []
      const findData = revised.find((item) => item.delivery_order_id === router.query.id)
      if (findData && data) {
        handler.handleSetRevisedDataTableDeliveryOrder(data, findData.items)
      } else {
        if (data && data.length > 0) {
          handler.handleSetDataTableDeliveryOrder(data)
        }
      }
    }
  }, [data])

  const handleConfirmProduct = () => {
    setProcessing('Please wait')
    let currentListRevisedDelivery = JSON.parse(localStorage.getItem('revised')) || []
    const { id } = router.query

    const confirmData = {
      delivery_order_id: id,
      items: dataDeliveryOrder.map((item) => {
        return {
          product_id: item.product_id,
          product_name: item.product_name,
          remarks: item.remarks,
          qty: item.revised_qty > 0 ? item.revised_qty : item.qty,
          uom_id: item.uom_id,
          // qtys: [
          //   {
          //     qty: item.revised_qty > 0 ? item.revised_qty : item.qty,
          //     uom_id: item.uom_id,
          //   },
          // ],
        }
      }),
    }

    if (currentListRevisedDelivery.find((item) => item.delivery_order_id === id)) {
      const newData = [...currentListRevisedDelivery]
      const index = newData.findIndex((item) => item.delivery_order_id === id)
      newData[index].items = confirmData.items

      currentListRevisedDelivery = newData
    } else {
      currentListRevisedDelivery.push(confirmData)
    }

    localStorage.setItem('revised', JSON.stringify(currentListRevisedDelivery))
    setProcessing('')
    setShowConfirm('success-confirm')
  }

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
        <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={handleConfirmProduct}>
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
              pathname: `${PATH.SALES}/proforma-invoice/detail/${router.query.shipment_id}`,
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
