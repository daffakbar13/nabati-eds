import React from 'react'
import { Button, Spacer, Text } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Row, Col, Tabs, Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import useDetail from 'src/hooks/useDetail'
import { cancelSalesOrder, getDetailSalesOrder } from 'src/api/sales-order'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { PATH } from 'src/configs/menus'
import { fieldReason } from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import Loader from 'src/components/Loader'
import { PageSalesOrderDetailProps } from './types'
import AllTabs from './tabs'
import SalesOrder from './tabs/SalesOrder'
import PricingCondition from './tabs/PricingCondition'
import PromotionList from './tabs/PromotionList'
import DocumentFlow from './tabs/DocumentFlow'
import CustomerInfo from './tabs/CustomerInfo'
import SalesmanInfo from './tabs/SalesmanInfo'

export default function PageSalesOrderDetail(props: PageSalesOrderDetailProps) {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [proccessing, setProccessing] = React.useState('')
  const onProcess = proccessing !== ''
  const router = useRouter()
  const data = useDetail(getDetailSalesOrder, { id: router.query.id as string })
  const hasData = Object.keys(data).length > 0

  const isStatus = (...value: string[]) => value.includes(router.query.status as string)

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
            cancelSalesOrder({
              order_list: [{ id: router.query.id }],
              cancel_reason_id: reason,
            })
              .then(() => {
                setShowConfirm('success-cancel')
                setProccessing('')
              })
              .catch((err) => console.log(err))
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
            router.push(`${PATH.SALES}/sales-order`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  React.useEffect(() => {
    fieldReason('C')
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
      <Row justify="space-between">
        <Row gutter={5}>
          <Col>
            <ArrowLeftOutlined
              onClick={() => {
                router.push(`${PATH.SALES}/sales-order`)
              }}
              style={{ fontSize: 25, lineHeight: '48px' }}
            />
          </Col>
          <Col>
            <Text variant={'h4'}>{titlePage}</Text>
          </Col>
        </Row>
        <Row gutter={10}>
          {isStatus('New') && (
            <>
              <Col>
                <Button
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    setShowConfirm('cancel')
                  }}
                >
                  Cancel Process
                </Button>
              </Col>
              <Col>
                <Button
                  size="big"
                  variant="secondary"
                  onClick={() => {
                    router.push(
                      `${PATH.SALES}/sales-order/edit/${router.query.id}?status=${router.query.status}`,
                    )
                  }}
                >
                  Edit
                </Button>
              </Col>
            </>
          )}
          {isStatus('Complete', 'New') && (
            <Col>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  router.push(
                    `${PATH.SALES}/sales-order/create?id=${router.query.id}&status=${router.query.status}`,
                  )
                }}
              >
                Order Again
              </Button>
            </Col>
          )}
        </Row>
      </Row>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <Tabs
          defaultActiveKey="1"
          onChange={(asd) => {
            setCurrentTab(asd)
          }}
          items={AllTabs}
        />
        {hasData && currentTab === '1' && <SalesOrder data={data} />}
        {hasData && currentTab === '2' && <PricingCondition data={data} />}
        {hasData && currentTab === '3' && <PromotionList data={data} />}
        {hasData && currentTab === '4' && <DocumentFlow data={data} />}
        {hasData && currentTab === '5' && <CustomerInfo data={data} />}
        {hasData && currentTab === '6' && <SalesmanInfo data={data} />}
      </Card>
      {showConfirm === 'cancel' && <ConfirmCancel />}
      {showConfirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </Col>
  )
}
