import { ArrowDownOutlined } from '@ant-design/icons'
import { Col, Radio, Row, Typography } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getDashboard } from 'src/api/sales-dashboard'
import { CommonListParams } from 'src/api/types'
import { Card, Loader } from 'src/components'
import { FilterSection, ChartStatusOrder } from './components'
import { Button, Modal, Spacer, Text, Table } from 'pink-lava-ui'
import { ICFilter } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import { useTable } from 'src/hooks'
import { FilterValueObj } from 'src/components/SmartFilter2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  columnsTopProductQTY,
  columnsTopProductRevenue,
  columnsWorstProductRevenue,
  columnsWorstProductQTY,
  columnsSalesmanRevenue,
  columnsSalesmanEC,
  columnsSalesmanOA,
} from './components/column/MainColumn'

export default function Main() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  )
  const getKey = (array, key) =>
    array?.map((a) => (key === 'date' ? moment(a[key]).format('DD MMMM') : a[key]))

  const startOfMonth = moment().startOf('month')
  const endOfMonth = moment().endOf('month')

  const [showLoader, setShowLoader] = useState(true)
  const [summaryData, setSummaryData] = useState(null)
  const [revenueData, setRevenueData] = useState(null)
  const [custROAData, setCustROAData] = useState(null)
  const [salesProductData, setSalesProductData] = useState(null)
  const [dropsizeData, setDropSizeData] = useState(null)
  const [TopProductData, setTopProductData] = useState(null)
  const [WorstProductData, setWorstProductData] = useState(null)
  const [topSalesManData, setTopSalesManDataData] = useState(null)
  const [outletActiveData, setOutletActiveData] = useState(null)
  const [showFilterTopProduct, setShowFilterTopProduct] = useState(false)
  const [showFilterWorstProduct, setShowFilterWorstProduct] = useState(false)
  const [showFilterSalesman, setShowFilterSalesman] = useState(false)
  const [selectedDates, setSelectedDate] = useState<[any, any]>([startOfMonth, endOfMonth])
  const [filters, setFilters] = useState<FilterValueObj[]>([])
  const [tabsTopProduct, setTabsTopProduct] = useState('Revenue')
  const [tabsWorstProduct, setTabsWorstProduct] = useState('Revenue')
  const [tabsSalesman, setTabsSalesman] = useState('Revenue')

  const statusOption = [
    { label: 'Hour', value: '03' },
    { label: 'Day', value: '02 ' },
    { label: 'Week', value: '00' },
    { label: 'Month', value: '00' },
  ]

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
        setRevenueData(res.data?.revenue)
        setCustROAData(res.data?.customer_roa)
        setSalesProductData(res.data?.sales_by_product)
        setDropSizeData(res.data?.dropsize)
        setTopProductData(res.data?.top_product_data)
        setWorstProductData(res.data?.worst_product)
        setTopSalesManDataData(res.data?.top_salesman_data)
        setOutletActiveData(res.data?.outlet_active)
      })
      .catch((err) => setShowLoader(false))
  }, [selectedDates])

  const data = {
    labels: getKey(revenueData, 'date'),
    datasets: [
      {
        fill: true,
        label: 'Revenue',
        data: getKey(revenueData, 'revenue'),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 200)
          gradient.addColorStop(0, 'rgba(170,229,234,1)')
          gradient.addColorStop(1, 'rgba(170,229,234,0)')
          return gradient
        },
        tension: 0.1,
      },
    ],
  }

  const dataROA = {
    labels: getKey(custROAData, 'date'),
    datasets: [
      {
        fill: true,
        label: 'Customer (ROA)',
        data: getKey(custROAData, 'customer_roa'),
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 200)
          gradient.addColorStop(0, 'rgba(255,52,172,1)')
          gradient.addColorStop(1, 'rgba(255,52,172,0)')
          return gradient
        },
        tension: 0.1,
      },
    ],
  }

  const dataSalesByProduct = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgb(170 229 234)',
        tension: 0.1,
      },
    ],
  }

  const datadropSize = {
    labels: getKey(dropsizeData, 'date'),
    datasets: [
      {
        fill: true,
        label: 'Dropsize',
        data: getKey(dropsizeData, 'dropsize'),
        borderColor: 'rgb(1 168 98)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 200)
          gradient.addColorStop(0, 'rgba(1,168,98,1)')
          gradient.addColorStop(1, 'rgba(1,168,98,0)')
          return gradient
        },
        tension: 0.1,
      },
    ],
  }

  const dataOutletType = {
    labels: ['KR-KIOS ROKOK'],
    datasets: [
      {
        label: '# of Votes',
        data: [12],
        backgroundColor: ['rgb(26 114 122)'],
        borderColor: ['rgb(26 114 122)'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const optionsDoughnut = {
    center: {
      text: 'Revenue',
      sidePadding: 20,
      minFontSize: 25,
      lineHeight: 25,
    },
  }

  const content = (
    <>
      <Spacer size={20} />
      <Row>
        <Col flex={'20%'}>
          <Text
            width="fluid"
            variant="headingSmall"
            textAlign="left"
            style={{ fontSize: 16, marginTop: 10 }}
          >
            Product
          </Text>
        </Col>
        <Col flex={'80%'}>
          <DebounceSelect type="select" options={statusOption} />
        </Col>
      </Row>
      <Spacer size={20} />
      <Row>
        <Col flex={'20%'}>
          <Text
            width="fluid"
            variant="headingSmall"
            textAlign="left"
            style={{ fontSize: 16, marginTop: 10 }}
          >
            Date
          </Text>
        </Col>
        <Col flex={'80%'}>
          <DebounceSelect type="select" options={statusOption} />
        </Col>
      </Row>
      <div
        style={{ display: 'flex', gap: 10, marginBottom: 20, paddingBottom: 20, paddingTop: 60 }}
      >
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="tertiary"
          onClick={() => setShowFilterTopProduct(false)}
        >
          Clear All
        </Button>
        <Button
          size="big"
          variant="primary"
          style={{ flexGrow: 1 }}
          onClick={() => setShowFilterTopProduct(false)}
        >
          Apply
        </Button>
      </div>
    </>
  )

  const contentFilterOUtletType = (
    <>
      <Spacer size={20} />
      <Row>
        <Col flex={'20%'}>
          <Text
            width="fluid"
            variant="headingSmall"
            textAlign="left"
            style={{ fontSize: 16, marginTop: 10 }}
          >
            Outlet Type
          </Text>
        </Col>
        <Col flex={'80%'}>
          <DebounceSelect type="select" options={statusOption} />
        </Col>
      </Row>
      <Spacer size={20} />
      <Row>
        <Col flex={'20%'}>
          <Text
            width="fluid"
            variant="headingSmall"
            textAlign="left"
            style={{ fontSize: 16, marginTop: 10 }}
          >
            Date
          </Text>
        </Col>
        <Col flex={'80%'}>
          <DebounceSelect type="select" options={statusOption} />
        </Col>
      </Row>
      <div
        style={{ display: 'flex', gap: 10, marginBottom: 20, paddingBottom: 20, paddingTop: 60 }}
      >
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="tertiary"
          onClick={() => setShowFilterTopProduct(false)}
        >
          Clear All
        </Button>
        <Button
          size="big"
          variant="primary"
          style={{ flexGrow: 1 }}
          onClick={() => setShowFilterTopProduct(false)}
        >
          Apply
        </Button>
      </div>
    </>
  )

  const contentFilterSalesman = (
    <>
      <Spacer size={20} />
      <Row>
        <Col flex={'20%'}>
          <Text
            width="fluid"
            variant="headingSmall"
            textAlign="left"
            style={{ fontSize: 16, marginTop: 10 }}
          >
            Salesman
          </Text>
        </Col>
        <Col flex={'80%'}>
          <DebounceSelect type="select" options={statusOption} />
        </Col>
      </Row>
      <Spacer size={20} />
      <Row>
        <Col flex={'20%'}>
          <Text
            width="fluid"
            variant="headingSmall"
            textAlign="left"
            style={{ fontSize: 16, marginTop: 10 }}
          >
            Date
          </Text>
        </Col>
        <Col flex={'80%'}>
          <DebounceSelect type="select" options={statusOption} />
        </Col>
      </Row>
      <div
        style={{ display: 'flex', gap: 10, marginBottom: 20, paddingBottom: 20, paddingTop: 60 }}
      >
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="tertiary"
          onClick={() => setShowFilterTopProduct(false)}
        >
          Clear All
        </Button>
        <Button
          size="big"
          variant="primary"
          style={{ flexGrow: 1 }}
          onClick={() => setShowFilterTopProduct(false)}
        >
          Apply
        </Button>
      </div>
    </>
  )

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
        <ChartStatusOrder />
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
                <Line options={options} data={data} />
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
                <Line options={options} data={dataROA} />
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
                <Bar options={options} data={dataSalesByProduct} />
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
                <Line options={options} data={datadropSize} />
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
                      <Typography.Text strong>Top 10 Product</Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button
                    size="small"
                    variant="tertiary"
                    onClick={() => setShowFilterTopProduct(true)}
                    style={{
                      border: '1px solid #888888',
                      color: '#888888',
                      backgroundColor: 'white',
                      justifyContent: 'flex-start',
                      gap: 16,
                    }}
                  >
                    <ICFilter /> Filter
                  </Button>
                  <Modal
                    onCancel={() => setShowFilterTopProduct(false)}
                    destroyOnClose
                    visible={showFilterTopProduct}
                    title={'Filter'}
                    width={500}
                    footer={false}
                    content={content}
                    maskClosable={false}
                  />
                </Col>
              </Row>
              <Spacer size={10} />
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                }}
              >
                <Button
                  size="small"
                  variant={tabsTopProduct === 'Revenue' ? 'primary' : 'tertiary'}
                  onClick={() => setTabsTopProduct('Revenue')}
                >
                  Revenue
                </Button>
                <Button
                  size="small"
                  variant={tabsTopProduct === 'QTY' ? 'primary' : 'tertiary'}
                  onClick={() => setTabsTopProduct('QTY')}
                >
                  Qty (PCS)
                </Button>
              </div>
              <Spacer size={20} />
              <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
                {tabsTopProduct === 'Revenue' ? (
                  <Table
                    columns={columnsTopProductRevenue}
                    dataSource={TopProductData?.top_product_by_revenue || []}
                  />
                ) : (
                  <Table
                    columns={columnsTopProductQTY}
                    dataSource={TopProductData?.top_product_by_qty || []}
                  />
                )}
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>Outlet Type</Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button
                    size="small"
                    variant="tertiary"
                    onClick={() => setShowFilterTopProduct(true)}
                    style={{
                      border: '1px solid #888888',
                      color: '#888888',
                      backgroundColor: 'white',
                      justifyContent: 'flex-start',
                      gap: 16,
                    }}
                  >
                    <ICFilter /> Filter
                  </Button>
                  <Modal
                    onCancel={() => setShowFilterTopProduct(false)}
                    destroyOnClose
                    visible={showFilterTopProduct}
                    title={'Filter'}
                    width={500}
                    footer={false}
                    content={contentFilterOUtletType}
                    maskClosable={false}
                  />
                </Col>
              </Row>
              <Spacer size={20} />
              <Row>
                <Col span={12}>
                  <Doughnut data={dataOutletType} />
                </Col>
                <Col span={12}>
                  <Doughnut data={dataOutletType} />
                </Col>
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
                      <Typography.Text strong>Worst 10 Product</Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button
                    size="small"
                    variant="tertiary"
                    onClick={() => setShowFilterWorstProduct(true)}
                    style={{
                      border: '1px solid #888888',
                      color: '#888888',
                      backgroundColor: 'white',
                      justifyContent: 'flex-start',
                      gap: 16,
                    }}
                  >
                    <ICFilter /> Filter
                  </Button>
                  <Modal
                    onCancel={() => setShowFilterWorstProduct(false)}
                    destroyOnClose
                    visible={showFilterWorstProduct}
                    title={'Filter'}
                    width={500}
                    footer={false}
                    content={content}
                    maskClosable={false}
                  />
                </Col>
              </Row>
              <Spacer size={10} />
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                }}
              >
                <Button
                  size="small"
                  variant={tabsWorstProduct === 'Revenue' ? 'primary' : 'tertiary'}
                  onClick={() => setTabsWorstProduct('Revenue')}
                >
                  Revenue
                </Button>
                <Button
                  size="small"
                  variant={tabsWorstProduct === 'QTY' ? 'primary' : 'tertiary'}
                  onClick={() => setTabsWorstProduct('QTY')}
                >
                  Qty (PCS)
                </Button>
              </div>
              <Spacer size={20} />
              <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
                {tabsWorstProduct === 'Revenue' ? (
                  <Table
                    columns={columnsWorstProductRevenue}
                    dataSource={WorstProductData?.worst_product_by_revenue || []}
                  />
                ) : (
                  <Table
                    columns={columnsWorstProductQTY}
                    dataSource={WorstProductData?.worst_product_by_qty || []}
                  />
                )}
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>Top 10 Salesman</Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button
                    size="small"
                    variant="tertiary"
                    onClick={() => setShowFilterSalesman(true)}
                    style={{
                      border: '1px solid #888888',
                      color: '#888888',
                      backgroundColor: 'white',
                      justifyContent: 'flex-start',
                      gap: 16,
                    }}
                  >
                    <ICFilter /> Filter
                  </Button>
                  <Modal
                    onCancel={() => setShowFilterSalesman(false)}
                    destroyOnClose
                    visible={showFilterSalesman}
                    title={'Filter'}
                    width={500}
                    footer={false}
                    content={contentFilterSalesman}
                    maskClosable={false}
                  />
                </Col>
              </Row>
              <Spacer size={10} />
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                }}
              >
                <Button
                  size="small"
                  variant={tabsSalesman === 'Revenue' ? 'primary' : 'tertiary'}
                  onClick={() => setTabsSalesman('Revenue')}
                >
                  Revenue
                </Button>
                <Button
                  size="small"
                  variant={tabsSalesman === 'EC' ? 'primary' : 'tertiary'}
                  onClick={() => setTabsSalesman('EC')}
                >
                  EC
                </Button>
                <Button
                  size="small"
                  variant={tabsSalesman === 'OA' ? 'primary' : 'tertiary'}
                  onClick={() => setTabsSalesman('OA')}
                >
                  OA
                </Button>
              </div>
              <Spacer size={20} />
              <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
                {tabsSalesman === 'Revenue' && (
                  <Table
                    columns={columnsSalesmanRevenue}
                    dataSource={topSalesManData?.top_salesman_by_revenue || []}
                  />
                )}
                {tabsSalesman === 'EC' && (
                  <Table
                    columns={columnsSalesmanEC}
                    dataSource={topSalesManData?.top_salesman_by_ec || []}
                  />
                )}
                {tabsSalesman === 'OA' && (
                  <Table
                    columns={columnsSalesmanOA}
                    dataSource={topSalesManData?.top_salesman_by_oa || []}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
