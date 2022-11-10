import React from 'react'
import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Tabs } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getDetailQuotation } from 'src/api/quotation'
import { PATH } from 'src/configs/menus'
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
  const data = useDetail(getDetailQuotation, { id: router.query.id as string })

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
              <Button size="big" variant="tertiary">
                Cancel Process
              </Button>
              <Button size="big" variant="secondary" onClick={() => { router.push(`${PATH.SALES}/quotation/edit/${router.query.id}`) }}>
                Edit
              </Button>
            </>
          )}
          <Button size="big" variant="primary" onClick={() => { }}>
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
    </Col>
  )
}
