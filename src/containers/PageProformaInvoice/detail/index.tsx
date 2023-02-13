import React, { useEffect, useState } from 'react'
import { Button, Col, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Tabs, Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { useDetail } from 'src/hooks'
import { useRouter } from 'next/router'
import ReactToPrint from 'react-to-print'
import Loader from 'src/components/Loader'
import moment from 'moment'
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { PATH } from 'src/configs/menus'
import AllTabs from './tabs'
import DocumentHeader from './tabs/DocumentHeader'
import BPB from './tabs/BPB'
import BSTS from './tabs/BSTS'
import {
  getDetailProformaInvoiceByShipment,
  getDetailProformaInvoiceByShipmentAndDevlivery,
  getProformaInvoiceBpb,
  getProformaInvoiceBsts,
  PGIProformaInvoice,
} from 'src/api/proforma-invoice'

export default function PageShipmentDetail() {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const [showConfirm, setShowConfirm] = React.useState<'pgi' | 'success-pgi' | ''>('')
  const [processing, setProcessing] = React.useState('')
  const [revisedDelivery, setRevisedDelivery] = useState([])
  const [postingDate, setPostingDate] = React.useState(moment().format('YYYY-MM-DD'))
  const router = useRouter()
  const data = useDetail(getDetailProformaInvoiceByShipment, { id: router.query.id as string })
  const dataBpb = useDetail(getProformaInvoiceBpb, { id: router.query.id as string })
  const dataBsts = useDetail(getProformaInvoiceBsts, { id: router.query.id as string })
  const hasData = Object.keys(data).length > 0
  const componentRef = React.useRef()

  const isStatus = (...value: string[]) => value.includes(router.query.status as string)

  useEffect(() => {
    if (window) {
      setRevisedDelivery(JSON.parse(window.localStorage.getItem('revised')) || [])
    }
  }, [])

  const ConfirmPGI = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm PGI
      </Typography.Title>
      <DatePickerInput
        fullWidth
        onChange={(val: any) => {
          setPostingDate(moment(val).format('YYYY-MM-DD'))
        }}
        label="Posting Date"
        disabledDate={(current) => current < moment().startOf('day')}
        value={moment(postingDate)}
        format={'YYYY-MM-DD'}
        required
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={async () => {
            setProcessing('Wait For PGI')
            const unrevisedData = data?.proforma_invoice_items_detail?.filter((item) => {
              return (
                revisedDelivery
                  .map((revised) => revised.delivery_order_id)
                  .indexOf(item.delivery_order_id) === -1
              )
            })

            const revisedData = revisedDelivery?.filter((item) => {
              // console.log(
              //   data?.proforma_invoice_items_detail
              //     .map((revised) => revised.delivery_order_id)
              //     .indexOf(item.delivery_order_id),
              // )
              return (
                data?.proforma_invoice_items_detail
                  .map((revised) => revised.delivery_order_id)
                  .indexOf(item.delivery_order_id) !== -1
              )
            })

            if (unrevisedData.length > 0) {
              await Promise.all(
                unrevisedData.map((item) => {
                  getDetailProformaInvoiceByShipmentAndDevlivery({
                    delivery_id: item.delivery_order_id,
                    shipment_id: router.query.id as string,
                  }).then((res) => {
                    const obj = {
                      delivery_order_id: item.delivery_order_id,
                      items: res.data.map((element) => {
                        return {
                          product_id: element.product_id,
                          remarks: '',
                          qtys: [
                            {
                              qty: element.qty,
                              uom_id: element.uom_id,
                            },
                          ],
                        }
                      }),
                    }
                    revisedData.push(obj)
                  })
                }),
              )
            }

            // console.log(revisedData)
            const payload = {
              posting_date: postingDate,
              confirm_delivery_orders: revisedData,
            }

            await new Promise((resolve) => setTimeout(resolve, 1000))

            PGIProformaInvoice(router.query.id as string, payload)
              .then(() => {
                setProcessing('')
                setShowConfirm('success-pgi')

                let removeRevised = [...revisedDelivery]
                data?.proforma_invoice_items_detail.map((item) => {
                  removeRevised.filter(
                    (element) => element.delivery_order_id !== item.delivery_order_id,
                  )
                })
                localStorage.setItem('revised', JSON.stringify(removeRevised))
              })
              .catch(() => {
                setProcessing('')
              })
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessPGI = () => (
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
            router.push(`${PATH.SALES}/proforma-invoice`)
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
            router.push({
              pathname: `${PATH.SALES}/proforma-invoice`,
              query: {
                page: router.query.page,
                limit: router.query.limit,
              },
            })
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          {currentTab === '1' && (
            <Button size="big" variant="primary" onClick={() => setShowConfirm('pgi')}>
              Confirm PGI
            </Button>
          )}
          {currentTab !== '1' && (
            <ReactToPrint
              trigger={() => (
                <Button size="big" variant="primary">
                  {currentTab === '2' && 'Print BPB'}
                  {currentTab === '3' && 'Print BSTS'}
                </Button>
              )}
              content={() => componentRef.current}
            />
          )}
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <Tabs
          defaultActiveKey="1"
          onChange={(current) => {
            setCurrentTab(current)
          }}
          items={isStatus('New') ? AllTabs.slice(0, 2) : AllTabs}
        />
        {hasData && (
          <>
            {currentTab === '1' ? (
              <DocumentHeader data={data} revisedDelivery={revisedDelivery} />
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: 'grey',
                  padding: '15px 0',
                  maxHeight: 1122.5,
                  overflow: 'scroll',
                }}
              >
                <div ref={componentRef}>
                  {currentTab === '2' && <BPB data={dataBpb} />}
                  {currentTab === '3' && <BSTS data={dataBsts} />}
                </div>
              </div>
            )}
          </>
        )}
      </Card>
      {showConfirm === 'pgi' && <ConfirmPGI />}
      {showConfirm === 'success-pgi' && <ConfirmSuccessPGI />}
    </Col>
  )
}
