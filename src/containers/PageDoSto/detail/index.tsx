import React from 'react'
import { Button, Spacer, Text, Table, Row as RowPinkLava } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Row, Col, Divider, Tabs } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import TaggedStatus from 'src/components/TaggedStatus'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getPoStoDetail } from 'src/api/logistic/do-sto'
import AllTabs from './tabs'
import DOSTO from './tabs/DOSTO'
import DeliveryNote from './tabs/DeliveryNote'

export default function PageDoStoDetail() {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const data: any = useDetail(getPoStoDetail, { id: router.query.id as string }, false)
  const hasData = Object.keys(data).length > 0
  const componentRef = React.useRef()

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
            router.push('/logistic/do-sto')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
      </div>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        {data.status != 'Pending' && data.status != 'Wait For Approval' ? (
          <Text variant={'h5'}>
            <TaggedStatus status={data.status} size="h5" />
          </Text>
        ) : (
          ''
        )}
        <RowPinkLava justifyContent="space-between" reverse>
          {data.status == 'Pending' || data.status == 'Wait For Approval' ? (
            <>
              <RowPinkLava gap="16px">
                <Button size="big" variant="tertiary">
                  Cancel
                </Button>
                <Button
                  size="big"
                  variant="secondary"
                  onClick={() => {
                    router.push(`/logistic/do-sto/edit/${router.query.id}`)
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="big"
                  variant="primary"
                  onClick={() => {
                    router.push('/logistic/do-sto')
                  }}
                >
                  PGI
                </Button>
              </RowPinkLava>
              <Text variant={'h5'}>
                <TaggedStatus status={data.status} size="h5" />
              </Text>
            </>
          ) : (
            ''
          )}
        </RowPinkLava>
      </Card>
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
            {currentTab === '1' ? (
              <DOSTO data={data} />
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
                <div ref={componentRef}>{currentTab === '2' && <DeliveryNote data={data} />}</div>
              </div>
            )}
          </>
        )}
      </Card>
    </Col>
  )
}
