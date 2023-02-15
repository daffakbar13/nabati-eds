import { Fragment, useState } from 'react'
import { Col, Row, Space } from 'antd'
import { Text, Button, Spacer } from 'pink-lava-ui'
import { Main, DetailPerformance, Warehouse } from './dashboard'

function TabNavItem({
  id,
  title,
  activeTab,
  setActiveTab,
}: {
  id: string
  title: string
  activeTab: string
  setActiveTab: any
}) {
  return (
    <Button
      size="small"
      style={{
        padding: '20px 15px',
        ...(activeTab !== id && {
          backgroundColor: '#fff',
          borderColor: '#fff',
          color: '#333',
        }),
      }}
      variant={activeTab === id ? undefined : 'tertiary'}
      onClick={() => setActiveTab(id)}
    >
      {title}
    </Button>
  )
}

function TabContent({ id, activeTab, children }: { id: string; activeTab: string; children: any }) {
  return activeTab === id ? <div className="TabContent">{children}</div> : null
}

export default function Sales() {
  const TABS = ['Main', 'Detail Performance', 'Warehouse']
  const [activeTab, setActiveTab] = useState(TABS[0])

  return (
    <Fragment>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Text variant={'h4'}>Dashboard</Text>
          <Spacer size={5} />
        </Col>

        <Col span={24}>
          <Space size={'middle'} wrap={true}>
            {TABS.map((_value, _index) => (
              <TabNavItem
                key={_index}
                title={_value}
                id={_value}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </Space>
        </Col>

        <Col span={24}>
          <TabContent id={TABS[0]} activeTab={activeTab}>
            <Main />
          </TabContent>

          <TabContent id={TABS[1]} activeTab={activeTab}>
            <DetailPerformance />
          </TabContent>

          <TabContent id={TABS[2]} activeTab={activeTab}>
            <Warehouse />
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  )
}
