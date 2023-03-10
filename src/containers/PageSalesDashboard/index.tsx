import React from 'react'
import { Col, Row, Space } from 'antd'
import { Text, Button, Spacer } from 'pink-lava-ui'
import Main from './Main'
import DetailPerformance from './DetailPerformance'
import Warehouse from './Warehouse'

interface TabType {
  title: string
  Component: React.ReactNode
}

const TABS: TabType[] = [
  { title: 'Main', Component: <Main /> },
  { title: 'Detail Performance', Component: <DetailPerformance /> },
  { title: 'Warehouse', Component: <Warehouse /> },
]

interface TabNavProps {
  title: string
  isActive: boolean
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

function TabNav(props: TabNavProps) {
  const { title, isActive, setActiveTab } = props
  const notActiveStyle = { backgroundColor: 'white', border: 'none', color: 'black' }
  return (
    <Button
      size="small"
      style={{ padding: '16px 24px', ...(!isActive && notActiveStyle) }}
      variant="primary"
      onClick={() => setActiveTab(title)}
    >
      {title}
    </Button>
  )
}

export default function PageSalesDashboard() {
  const defaultTab = TABS[0].title
  const [activeTab, setActiveTab] = React.useState<string>(defaultTab)
  const isActive = (title: string) => title === activeTab

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Text variant={'h4'}>Dashboard</Text>
          <Spacer size={5} />
        </Col>

        <Col span={24}>
          <Space size={'middle'} wrap={true}>
            {TABS.map((e, _index) => (
              <TabNav
                key={_index}
                title={e.title}
                isActive={isActive(e.title)}
                setActiveTab={setActiveTab}
              />
            ))}
          </Space>
        </Col>

        <Col span={24}>
          {TABS.map((e, i) => (
            <React.Fragment key={i}>{isActive(e.title) && e.Component}</React.Fragment>
          ))}
        </Col>
      </Row>
    </>
  )
}
