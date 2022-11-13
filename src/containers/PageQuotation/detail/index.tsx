import React from 'react'
import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Tabs, Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { cancelBatchOrder, cancelOrder, getDetailQuotation } from 'src/api/quotation'
import { PATH } from 'src/configs/menus'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'
import { PageQuotationDetailProps } from './types'
import AllTabs from './tabs'
import Quotation from './tabs/Quotation'
import DocumentFlow from './tabs/DocumentFlow'
import CustomerInfo from './tabs/CustomerInfo'
import SalesmanInfo from './tabs/SalesmanInfo'

export default function PageQuotationDetail(props: PageQuotationDetailProps) {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const router = useRouter()
  const data = useDetail(getDetailQuotation, { id: router.query.id as string })
  const hasData = Object.keys(data).length > 0

  React.useEffect(() => {
    fieldReason()
      .then((res) => {
        setOptionsReason(res)
        setReason(res[0].value)
      })
  }, [])

  return (
    <Col>
      <div style={{ display: 'flex', gap: 5 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push('/sales/quotation')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          {router.query.status === 'New' && (
            <>
              <Button
                size="big"
                variant="tertiary"
                onClick={() => { setShowConfirm('cancel') }}
              >
                Cancel Process
              </Button>
              <Button
                size="big"
                variant="secondary"
                onClick={() => {
                  router.push(`${PATH.SALES}/quotation/edit/${router.query.id}`)
                }}
              >
                Edit
              </Button>
            </>
          )}
          <Button
            size="big"
            variant="primary"
            onClick={() => {
              router.push(`${PATH.SALES}/quotation/create?id=${router.query.id}`)
            }}
          >
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
        {currentTab === '1' && hasData && <Quotation data={data} />}
        {currentTab === '2' && hasData && <DocumentFlow data={data} />}
        {currentTab === '3' && hasData && <CustomerInfo data={data} />}
        {currentTab === '4' && hasData && <SalesmanInfo data={data} />}
      </Card>
      {showConfirm === 'cancel' && (
        <Popup>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Confirm Cancellation
          </Typography.Title>
          <DebounceSelect
            type='select'
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
              onClick={() => { setShowConfirm('') }}>
              No
            </Button>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="primary"
              onClick={() => {
                cancelBatchOrder({
                  order_list: [{ id: router.query.id }],
                  cancel_reason_id: reason,
                })
                  .then(() => router.push(`${PATH.SALES}/quotation`))
              }}
            >
              Yes
            </Button>
          </div>
        </Popup>
      )}
    </Col>
  )
}
