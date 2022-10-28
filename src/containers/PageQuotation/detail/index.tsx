import React from 'react'
import { Button as ButtonPinkLava, Col, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Button, Tabs } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { PageQuotationDetailProps } from './types'
import AllTabs from './tabs'
import Quotation from './tabs/Quotation'
import DocumentFlow from './tabs/DocumentFlow'
import CustomerInfo from './tabs/CustomerInfo'
import SalesmanInfo from './tabs/SalesmanInfo'

export default function PageQuotationDetail(props: PageQuotationDetailProps) {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const data = useDetail(
    `https://dist-system.nabatisnack.co.id:3001/v1/quotations/${router.query.id}/detail`,
  )

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
            router.push('/quotation')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 2 }}>
          <Button>asd</Button>
          <ButtonPinkLava size="big" variant="secondary" onClick={() => {}}>
            Edit
          </ButtonPinkLava>
          <ButtonPinkLava size="big" variant="primary" onClick={() => {}}>
            Order Again
          </ButtonPinkLava>
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
    </Col>
  )
}
