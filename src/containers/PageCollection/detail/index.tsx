import React from 'react'
import { Button as ButtonPinkLava, Col, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Button, Tabs } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { PageCollectionDetailProps } from './types'
import AllTabs from './tabs'
import Quotation from './tabs/Quotation'
import DocumentFlow from './tabs/DocumentFlow'
import CustomerInfo from './tabs/CustomerInfo'
import SalesmanInfo from './tabs/SalesmanInfo'

export default function PageCollectionDetail(props: PageCollectionDetailProps) {
  const titlePage = useTitlePage('edit')
  const [currentTab, setCurrentTab] = React.useState('1')

  return (
    <Col>
      <div style={{ display: 'flex' }}>
        <Text variant={'h4'}>Confirm {titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 2 }}>
          <Button>asd</Button>
          <ButtonPinkLava size="big" variant="primary" onClick={() => {}}>
            Finish
          </ButtonPinkLava>
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>{currentTab === '1' && <Quotation />}</Card>
    </Col>
  )
}
