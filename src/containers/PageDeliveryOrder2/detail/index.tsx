import React from 'react'
import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Tabs, Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { useDetail } from 'src/hooks'
import { getDeliveryOrderDetail } from 'src/api/delivery-order'
import { useRouter } from 'next/router'
import DebounceSelect from 'src/components/DebounceSelect'
import { cancelBatchOrder } from 'src/api/quotation'
import { PATH } from 'src/configs/menus'
import { fieldReason } from 'src/configs/fieldFetches'
import Loader from 'src/components/Loader'
import { PageDeliveryOrderDetailProps } from './types'
import AllTabs from './tabs'
import Quotation from './tabs/DeliveryOrder'
import DocumentFlow from './tabs/DocumentFlow'
import CustomerInfo from './tabs/CustomerInfo'
import SalesmanInfo from './tabs/SalesmanInfo'

export default function PageDeliveryOrderDetail(props: PageDeliveryOrderDetailProps) {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [proccessing, setProccessing] = React.useState('')
  const onProcess = proccessing !== ''
  const router = useRouter()
  const data = useDetail(getDeliveryOrderDetail, { id: router.query.id as string })
  const hasData = Object.keys(data).length > 0

  const ConfirmCancel = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <DebounceSelect
        type="select"
        value={optionsReason.find(({ value }) => reason === value)?.label}
        label={'Reason Cancel Process Quotation'}
        required
        options={optionsReason}
        onChange={({ value }) => setReason(value)}
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
          onClick={() => {
            setProccessing('Wait for cancelling Quotation')
            cancelBatchOrder({
              order_list: [{ id: router.query.id }],
              cancel_reason_id: reason,
            })
              .then(() => {
                setShowConfirm('success-cancel')
                setProccessing('')
              })
              .catch((err) => err)
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessCancel = () => (
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
          <Typography.Text copyable={{ text: router.query.id as string }}>
            {` ${router.query.id} `}
          </Typography.Text>
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

  React.useEffect(() => {
    fieldReason('J')
      .then((res) => {
        setOptionsReason(res)
        setReason(res[0].value)
      })
      .catch(() => setOptionsReason([]))
  }, [])

  return (
    <Col>
      {!hasData && <Loader type="process" text="Wait for get data" />}
      {onProcess && <Loader type="process" text={proccessing} />}
      <div style={{ display: 'flex', gap: 5 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push('/sales/delivery-order')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          {router.query.status === 'New' && (
            <>
              <Button size="big" variant="tertiary">
                Cancel Process
              </Button>
              <Button
                size="big"
                variant="secondary"
                onClick={() => {
                  router.push(`${PATH.SALES}/delivery-order/edit/${router.query.id}`)
                }}
              >
                Edit
              </Button>
            </>
          )}
          <Button size="big" variant="primary" onClick={() => {}}>
            Order Again
          </Button>
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <Tabs
          defaultActiveKey="1"
          onChange={(asd) => {
            setCurrentTab(asd)
          }}
          items={AllTabs}
        />
        {currentTab === '1' && <Quotation data={data} />}
        {currentTab === '2' && <DocumentFlow data={data} />}
        {currentTab === '3' && <CustomerInfo data={data} />}
        {currentTab === '4' && <SalesmanInfo data={data} />}
      </Card>
      {showConfirm === 'cancel' && <ConfirmCancel />}
      {showConfirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </Col>
  )
}
