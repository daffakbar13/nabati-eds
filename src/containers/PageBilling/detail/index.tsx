import React from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Button as ButtonPinkLava, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Tabs, Popover, Row, Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { useRouter } from 'next/router'
import { useDetail } from 'src/hooks'
import { getDetailBilling } from 'src/api/billing'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { PageBillingDetailProps } from './types'
import AllTabs from './tabs'
import DocumentFlow from './tabs/DocumentFlow'
import CustomerInfo from './tabs/CustomerInfo'
import SalesmanInfo from './tabs/SalesmanInfo'
import Billing from './tabs/Billing'
import PricingCondition from './tabs/PricingCondition'
import { ICEdit, ICPurchaseOrg } from 'src/assets'

export default function PageBillingDetail(props: PageBillingDetailProps) {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const data = useDetail(getDetailBilling, { id: router.query.id as string })
  const hasData = Object.keys(data).length > 0

  const moreContent = (
    <Row gutter={[10, 10]} style={{ fontWeight: 'bold', width: 200 }}>
      <Col span={24}>
        <Row
          gutter={10}
          onClick={() => {
            router.push(`/sales/billing/edit/${router.query.id}?status=${router.query.status}`)
          }}
          style={{ cursor: 'pointer' }}
        >
          <Col>
            <ICEdit />
          </Col>
          <Col> Edit</Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row
          gutter={10}
          onClick={() => {
            router.push(`/sales/billing/order-again/${router.query.id}?status=${router.query.status}`)
          }}
          style={{ cursor: 'pointer' }}
        >
          <Col>
            <ICEdit />
          </Col>
          <Col> Order Again</Col>
        </Row>
      </Col>
    </Row>
  )

  return (
    <Col>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push('/sales/billing')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
        {(() => {
          if (data.status_id == '1') {
            return (
              <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 2 }}>
                <ButtonPinkLava size="big" variant="tertiary" onClick={() => {}}>
                  Cancel Process
                </ButtonPinkLava>

                <Popover placement="bottom" content={moreContent} trigger="click">
                  <ButtonPinkLava size="big" variant="secondary" onClick={() => {}}>
                    More
                    <DownOutlined />
                  </ButtonPinkLava>
                </Popover>
                <ButtonPinkLava size="big" variant="primary" onClick={() => {}}>
                  Print
                </ButtonPinkLava>
              </div>
            )
          } else if (data.status_id == '7' || data.status_id == '4') {
            return (
              <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 2 }}>
                <ButtonPinkLava
                  size="big"
                  variant="secondary"
                  onClick={() => {
                    router.push(`/sales/billing/order-again/${router.query.id}?status=${router.query.status}`)
                  }}
                >
                  Order Again
                </ButtonPinkLava>
                <ButtonPinkLava size="big" variant="primary">
                  Print
                </ButtonPinkLava>
              </div>
            )
          }
        })()}
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
        {hasData && (
          <>
            {currentTab === '1' && <Billing data={data} />}
            {currentTab === '2' && <PricingCondition data={data} />}
            {currentTab === '3' && <DocumentFlow data={data} />}
            {currentTab === '4' && <CustomerInfo data={data} />}
            {currentTab === '5' && <SalesmanInfo data={data} />}
          </>
        )}
      </Card>
    </Col>
  )
}
