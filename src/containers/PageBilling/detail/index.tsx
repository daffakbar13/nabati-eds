import React from 'react'
import { Button as ButtonPinkLava, Col, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Button, Tabs } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { useRouter } from 'next/router'
import { useDetail } from 'src/hooks'
import { getDetailBilling } from 'src/api/billing'
import axios from 'axios'
import { PageBillingDetailProps } from './types'
import AllTabs from './tabs'
import DocumentFlow from './tabs/DocumentFlow'
import CustomerInfo from './tabs/CustomerInfo'
import SalesmanInfo from './tabs/SalesmanInfo'
import Billing from './tabs/Billing'
import PricingCondition from './tabs/PricingCondition'

export default function PageBillingDetail(props: PageBillingDetailProps) {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const data = useDetail('', getDetailBilling, { id: router.query.id as string })

  React.useEffect(() => {
    axios
      .post('https://dist-system.nabatisnack.co.id:3001/v1/billing/list', { id: router.query.id })
      .then((res) => console.log(res))
      .then((e) => console.log('asd'))
  }, [])

  return (
    <Col>
      <div style={{ display: 'flex' }}>
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
        {currentTab === '1' && <Billing data={data} />}
        {currentTab === '2' && <PricingCondition data={data} />}
        {currentTab === '3' && <DocumentFlow data={data} />}
        {currentTab === '4' && <CustomerInfo data={data} />}
        {currentTab === '5' && <SalesmanInfo data={data} />}
      </Card>
    </Col>
  )
}
