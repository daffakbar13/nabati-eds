import { ArrowDownOutlined } from '@ant-design/icons'
import { Col, Radio, Row, Typography } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getDashboard } from 'src/api/sales-dashboard'
import { Card, Loader } from 'src/components'
import { FilterSection } from './components'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

export default function Main() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
  )
  const startOfMonth = moment().startOf('month')
  const endOfMonth = moment().endOf('month')

  const [showLoader, setShowLoader] = useState(true)
  const [summaryData, setSummaryData] = useState(null)
  const [selectedDates, setSelectedDate] = useState<[any, any]>([startOfMonth, endOfMonth])

  useEffect(() => {
    const payload = {
      filters: [
        {
          field: 'summary_date',
          option: 'BT',
          from_value: moment(selectedDates[0]).format('YYYY-MM-DD'),
          to_value: moment(selectedDates[1]).format('YYYY-MM-DD'),
        },
      ],
      limit: 100,
      page: 1,
    }

    setShowLoader(true)
    getDashboard(payload)
      .then((res) => {
        setShowLoader(false)
        setSummaryData(res.data?.summary)
      })
      .catch((err) => setShowLoader(false))
  }, [selectedDates])

  const data = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const dataROA = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(235 0 139)',
        tension: 0.1,
      },
    ],
  }

  const dataSalesByProduct = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(170 229 234)',
        tension: 0.1,
      },
    ],
  }

  const datadropSize = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(1 168 98)',
        tension: 0.1,
      },
    ],
  }

  return (
    <>
      {showLoader && <Loader />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FilterSection onDateChange={(dates) => setSelectedDate(dates)} />
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
                        <Typography.Text>SKU</Typography.Text>
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
                        <Typography.Text>Customer</Typography.Text>
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
                        <Typography.Text>Product Gross</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.product_gross_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.product_gross_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.product_gross_vs3lm_percent}%
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
                        <Typography.Text>Selling Price</Typography.Text>
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
                        <Typography.Text>Salesman Billing</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {summaryData?.salesman_billing_total}
                        </Typography.Title>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>VsLM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.salesman_billing_vslm_percent}%
                          </Typography.Text>
                          <ArrowDownOutlined style={{ color: 'red' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Typography.Text>Vs3LM</Typography.Text>
                          <Typography.Text style={{ color: 'red' }}>
                            -{summaryData?.salesman_billing_vs3lm_percent}%
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
                        <Typography.Text>Customer NOO</Typography.Text>
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
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Row gutter={8} wrap={false}>
          <Col span={12}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>Revenue</Typography.Text>
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
                <Line data={data} />
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>Customer (ROA)</Typography.Text>
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
                <Line data={dataROA} />
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={8} wrap={false}>
          <Col span={12}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>Sales By Product</Typography.Text>
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
                <Bar data={dataSalesByProduct} />
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>Dropsize</Typography.Text>
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
                <Line data={datadropSize} />
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
