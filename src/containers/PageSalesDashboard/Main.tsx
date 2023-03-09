import { ArrowDownOutlined } from '@ant-design/icons'
import { Col, Radio, Row, Typography } from 'antd'
import { Card } from 'src/components'
import { FilterSection } from './components'

export default function Main() {
  const from_date = '01 December 2022'
  const to_date = '21 December 2022'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilterSection />
      <Card style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Row gutter={8}>
              <Col>
                <Typography.Text strong>Summary</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>{[from_date, to_date].join('-')}</Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Radio.Group defaultValue={'Day'} size="middle">
              <Radio.Button value="Day" style={{ borderRadius: '16px 0 0 16px' }}>
                <b>Day</b>
              </Radio.Button>
              <Radio.Button value="Week">
                <b>Week</b>
              </Radio.Button>
              <Radio.Button value="Month">
                <b>Month</b>
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={8} wrap={false}>
          <Col flex="22%">
            <Card
              style={{
                height: 316,
                backgroundColor: '#FF34AC',
                color: 'white !important',
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <Typography.Text style={{ color: 'white' }}>Total Revenue</Typography.Text>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Typography.Text style={{ color: 'white' }}>RP</Typography.Text>
                  <Typography.Title level={3} style={{ color: 'white', margin: 0 }}>
                    224.100
                  </Typography.Title>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Typography.Text style={{ color: 'white' }}>VsLM</Typography.Text>
                  <Typography.Text style={{ color: 'white' }}>-84%</Typography.Text>
                  <ArrowDownOutlined style={{ color: 'white' }} />
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Typography.Text style={{ color: 'white' }}>Vs3LM</Typography.Text>
                  <Typography.Text style={{ color: 'white' }}>-84%</Typography.Text>
                  <ArrowDownOutlined style={{ color: 'white' }} />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <Typography.Text style={{ color: 'white' }}>
                  Estimated revenue this month
                </Typography.Text>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Typography.Text style={{ color: 'white' }}>RP</Typography.Text>
                  <Typography.Title level={3} style={{ color: 'white', margin: 0 }}>
                    224.100
                  </Typography.Title>
                </div>
              </div>
            </Card>
          </Col>
          <Col flex="78%">
            <Row gutter={[0, 8]}>
              <Col span={24}>
                <Row gutter={8} wrap={false}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Col key={i} flex="auto" style={{ height: 154 }}>
                      <Card
                        style={{
                          border: '1px solid rgba(43, 190, 203, 0.2)',
                          height: '100%',
                          padding: 12,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}
                      >
                        <Typography.Text>Average Basket Size</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          112.050
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>-84%</Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>-84%</Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col span={24}>
                <Row gutter={8} wrap={false}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Col key={i} flex="auto" style={{ height: 154 }}>
                      <Card
                        style={{
                          border: '1px solid rgba(43, 190, 203, 0.2)',
                          height: '100%',
                          padding: 12,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}
                      >
                        <Typography.Text>Average Basket Size</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          112.050
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>-84%</Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>-84%</Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
