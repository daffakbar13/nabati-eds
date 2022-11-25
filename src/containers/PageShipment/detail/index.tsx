import React from 'react'
import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Tabs } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { useDetail } from 'src/hooks'
import { getDetailShipment, getShipmentBpb } from 'src/api/shipment'
import { useRouter } from 'next/router'
import ReactToPrint from 'react-to-print'
import { PageShipmentDetailProps } from './types'
import AllTabs from './tabs'
import DocumentHeader from './tabs/DocumentHeader'
import BPB from './tabs/BPB'
import HPH from './tabs/HPH'
import BSTF from './tabs/BSTF'

export default function PageShipmentDetail(props: PageShipmentDetailProps) {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const data = useDetail(getDetailShipment, router.query)
  const dataBpb = useDetail(getShipmentBpb, router.query)
  const hasData = Object.keys(data).length > 0
  const componentRef = React.useRef()

  return (
    <Col>
      <div style={{ display: 'flex' }}>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 2 }}>
          <Button size="big" variant="secondary" onClick={() => {}}>
            Edit
          </Button>
          {currentTab !== '1' && (
            <ReactToPrint
              trigger={() => (
                <Button size="big" variant="primary">
                  {currentTab === '2' && 'Print BPB'}
                  {currentTab === '3' && 'Print BSTF'}
                  {currentTab === '4' && 'Print HPH'}
                </Button>
              )}
              content={() => componentRef.current}
            />
          )}
          {currentTab === '1' && (
            <Button size="big" variant="primary">
              PGI
            </Button>
          )}
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
        {currentTab === '1' ? (
          <DocumentHeader data={data} />
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'grey',
              padding: '15px 0',
              maxHeight: 1122.5,
              overflow: 'scroll',
            }}
          >
            <div ref={componentRef}>
              {currentTab === '2' && <BPB data={dataBpb} />}
              {currentTab === '3' && <BSTF />}
              {currentTab === '4' && <HPH />}
            </div>
          </div>
        )}
      </Card>
    </Col>
  )
}
