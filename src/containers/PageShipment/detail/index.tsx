import React from 'react'
import { Button as ButtonPinkLava, Col, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Button, Tabs } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { PageShipmentDetailProps } from './types'
import AllTabs from './tabs'
import DocumentHeader from './tabs/DocumentHeader'
import BPB from './tabs/BPB'
import { useDetail } from 'src/hooks'
import { getDetailShipment } from 'src/api/shipment'
import { useRouter } from 'next/router'

export default function PageShipmentDetail(props: PageShipmentDetailProps) {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const data = useDetail(getDetailShipment, router.query)

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
          onChange={(current) => {
            setCurrentTab(current)
          }}
          items={AllTabs}
        />
        {currentTab === '1' && <DocumentHeader data={data} />}
        {currentTab === '2' && <BPB />}
      </Card>
    </Col>
  )
}
