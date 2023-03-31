import { ArrowDownOutlined } from '@ant-design/icons'
import { Col, Radio, Row, Typography } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getDashboard } from 'src/api/sales-dashboard'
import { CommonListParams } from 'src/api/types'
import { Card, Loader } from 'src/components'
import { FilterValueObj } from 'src/components/SmartFilter2'
import { FilterSection } from './components'

export default function Main() {
  const startOfMonth = moment().startOf('month')
  const endOfMonth = moment().endOf('month')

  const [showLoader, setShowLoader] = useState(true)
  const [summaryData, setSummaryData] = useState(null)
  const [selectedDates, setSelectedDate] = useState<[any, any]>([startOfMonth, endOfMonth])
  const [filters, setFilters] = useState<FilterValueObj[]>([])

  useEffect(() => {
    const resFilters = [
      ...[
        {
          field: 'summary_date',
          option: 'BT',
          from_value: moment(selectedDates[0]).format('YYYY-MM-DD'),
          to_value: moment(selectedDates[1]).format('YYYY-MM-DD'),
        },
      ],
      ...filters,
    ]

    const payload = {
      filters: resFilters,
      limit: 100,
      page: 1,
    }

    setShowLoader(true)
    getDashboard(payload as CommonListParams)
      .then((res) => {
        setShowLoader(false)
        setSummaryData(res.data?.summary)
      })
      .catch((err) => setShowLoader(false))
  }, [selectedDates, filters])

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FilterSection
          onFilterChange={setFilters}
          onDateChange={(dates) => setSelectedDate(dates)}
        />
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Row gutter={8}>
                <Col>
                  <Typography.Text strong>Summary</Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    {[
                      moment(selectedDates[0]).format('DD MMMM YYYY'),
                      moment(selectedDates[1]).format('DD MMMM YYYY'),
                    ].join('-')}
                  </Typography.Text>
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
                      {summaryData?.revenue_total}
                    </Typography.Title>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Typography.Text style={{ color: 'white' }}>VsLM</Typography.Text>
                    <Typography.Text style={{ color: 'white' }}>
                      -{summaryData?.revenue_vslm_percent}%
                    </Typography.Text>
                    <ArrowDownOutlined style={{ color: 'white' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Typography.Text style={{ color: 'white' }}>Vs3LM</Typography.Text>
                    <Typography.Text style={{ color: 'white' }}>
                      -{summaryData?.revenue_vs3lm_percent}%
                    </Typography.Text>
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
                      {summaryData?.estimated_revenue}
                    </Typography.Title>
                  </div>
                </div>
              </Card>
            </Col>
            <Col flex="78%">
              <Row gutter={[0, 8]}>
                <Col span={24}>
                  <Row gutter={8} wrap={false}>
                    <Col flex="auto" style={{ height: 154 }}>
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
                          {summaryData?.average_basket_size_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.average_basket_size_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.average_basket_size_vs3lm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                    <Col flex="auto" style={{ height: 154 }}>
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
                        <Typography.Text>Efective Call</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.efective_call_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.efective_call_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.efective_call_vs3lm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                    <Col flex="auto" style={{ height: 154 }}>
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
                        <Typography.Text>Customer (ROA)</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.customer_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.customer_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.customer_vs3lm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                    <Col flex="auto" style={{ height: 154 }}>
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
                        <Typography.Text>Rev Salesman</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.rev_salesman_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.rev_salesman_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.rev_salesman_vs3lm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                    <Col flex="auto" style={{ height: 154 }}>
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
                        <Typography.Text>Salesman</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.salesman_total}
                        </Typography.Title>
                        <Typography.Text>SKU</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.sku_total}
                        </Typography.Title>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={8} wrap={false}>
                    <Col flex="auto" style={{ height: 154 }}>
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
                        <Typography.Text>NOO</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.customer_noo_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.customer_noo_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.customer_noo_vs3lm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                    <Col flex="auto" style={{ height: 154 }}>
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
                        <Typography.Text>CTN</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.ctn_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.ctn_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.ctn_vs3lm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                    <Col flex="auto" style={{ height: 154 }}>
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
                        <Typography.Text>Selling Price/CTN </Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.selling_price_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.selling_price_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.selling_price_vs3lm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                    <Col flex="auto" style={{ height: 154 }}>
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
                        <Typography.Text>Total Visit</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.sku_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.sku_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.sku_vs3lm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                      </Card>
                    </Col>
                    <Col flex="auto" style={{ height: 154 }}>
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
                        <Typography.Text>SPPO/M</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.product_gross_total}
                        </Typography.Title>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  )
}
