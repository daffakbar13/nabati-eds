import React from 'react'
import { Button as ButtonPinkLava, Col, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Button, Tabs } from 'antd';
import useTitlePage from 'src/hooks/useTitlePage'
import { PageApprovalDetailProps } from './types'
import AllTabs from './tabs';
import Quotation from './tabs/Quotation';
import DocumentFlow from './tabs/DocumentFlow';
import CustomerInfo from './tabs/CustomerInfo';
import SalesmanInfo from './tabs/SalesmanInfo';

export default function PageApprovalDetail(props: PageApprovalDetailProps) {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')

  return (
    <Col>
      <div style={{ display: 'flex' }}>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 2 }} >
          <Button>
            asd
          </Button>
          <ButtonPinkLava size="big" variant="secondary" onClick={() => { }}>
            Edit
          </ButtonPinkLava>
          <ButtonPinkLava size="big" variant="primary" onClick={() => { }}>
            Order Again
          </ButtonPinkLava>
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <Tabs
          defaultActiveKey="1"
          onChange={(asd) => { setCurrentTab(asd) }}
          items={AllTabs}
        />
        {currentTab === '1'
          && <Quotation />
        }
        {currentTab === '2'
          && <DocumentFlow />
        } {currentTab === '3'
          && <CustomerInfo />
        } {currentTab === '4'
          && <SalesmanInfo />
        }
      </Card>
    </Col>
  )
}
