import { ArrowDownOutlined } from '@ant-design/icons'
import { Col, Radio, Row, Typography } from 'antd'
import { Spacer } from 'pink-lava-ui'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getDashboard } from 'src/api/sales-dashboard'
import { Card, Loader } from 'src/components'
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
  Filler,
  ScriptableContext,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

export default function ChartStatusOrder() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  )
  const dataStatusOrder = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: false,
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: (context: ScriptableContext<'line'>) => {
        //   const ctx = context.chart.ctx
        //   const gradient = ctx.createLinearGradient(0, 0, 0, 200)
        //   gradient.addColorStop(0, 'rgba(235,0,139,1)')
        //   gradient.addColorStop(1, 'rgba(235,0,139,0)')
        //   return gradient
        // },
        yAxisID: 'y',
      },
      {
        fill: true,
        label: 'Dataset 2',
        data: [67, 49, 87, 83, 58, 50, 50],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 200)
          gradient.addColorStop(0, 'rgba(43,190,203,1)')
          gradient.addColorStop(1, 'rgba(43,190,203,0)')
          return gradient
        },
        yAxisID: 'y1',
      },
    ],
  }

  const dataStatusOrderNew = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(43 190 203)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 100)
          gradient.addColorStop(0, 'rgba(43,190,203,1)')
          gradient.addColorStop(1, 'rgba(228,247,248,0)')
          return gradient
        },
      },
    ],
  }
  const dataStatusOrderSAPProcessed = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(255 225 46)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 100)
          gradient.addColorStop(0, 'rgba(255,225,46,1)')
          gradient.addColorStop(1, 'rgba(254,243,236,0)')
          return gradient
        },
      },
    ],
  }
  const dataStatusOrderSAPComplete = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(237 27 151)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 100)
          gradient.addColorStop(0, 'rgba(237,27,151,1)')
          gradient.addColorStop(1, 'rgba(252,216,237,0)')
          return gradient
        },
      },
    ],
  }
  const dataStatusDoProcess = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(170 229 234)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 100)
          gradient.addColorStop(0, 'rgba(170,229,234,1)')
          gradient.addColorStop(1, 'rgba(244,252,252,0)')
          return gradient
        },
      },
    ],
  }
  const dataStatusDoComplete = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(57 255 172)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 100)
          gradient.addColorStop(0, 'rgba(57,255,172,1)')
          gradient.addColorStop(1, 'rgba(226,255,243,0)')
          return gradient
        },
      },
    ],
  }
  const dataStatusError = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(255 77 83)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 100)
          gradient.addColorStop(0, 'rgba(255,77,83,1)')
          gradient.addColorStop(1, 'rgba(255,227,228,0)')
          return gradient
        },
      },
    ],
  }

  const dataStatusCancel = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(165 7 6)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 100)
          gradient.addColorStop(0, 'rgba(165,7,6,1)')
          gradient.addColorStop(1, 'rgba(244,235,235,0)')
          return gradient
        },
      },
    ],
  }

  const dataReturnProcess = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(194 148 39)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 100)
          gradient.addColorStop(0, 'rgba(194,148,39,1)')
          gradient.addColorStop(1, 'rgba(246,238,222,0)')
          return gradient
        },
      },
    ],
  }

  const dataReturnComplete = {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        fill: true,
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(33 150 100)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 100)
          gradient.addColorStop(0, 'rgba(33,150,100,1)')
          gradient.addColorStop(1, 'rgba(224,240,233,0)')
          return gradient
        },
      },
    ],
  }

  const optionsMultiple = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  const optionsStatusOrder = {
    maintainAspectRatio: false,
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
        display: false,
        beginAtZero: true,
      },
      x: {
        display: false,
      },
    },
  }

  return (
    <>
      <Card>
        <Row justify="space-between" align="middle">
          <Col>
            <Row gutter={8}>
              <Col>
                <Typography.Text strong>
                  All Status Order 01 December 2022 - 21 December 2022
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
        <Row gutter={8}>
          <Col span={24}>
            <Line options={optionsMultiple} data={dataStatusOrder} height="350px" width={'100%'} />
          </Col>
        </Row>
        <Spacer size={10} />
        <Row gutter={8}>
          <Col span={8}>
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
              <Row>
                <Col>
                  <Typography.Text>New</Typography.Text> <br />
                  <Typography.Text>Total 100.000 (100%)</Typography.Text>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    82.980 (82%)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Line
                    options={optionsStatusOrder}
                    data={dataStatusOrderNew}
                    height="100px"
                    width={'100%'}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
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
              <Row>
                <Col>
                  <Typography.Text>SAP SO Processed</Typography.Text> <br />
                  <Typography.Text>Total 100.000 (100%)</Typography.Text>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    80.980 (80%)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Line
                    options={optionsStatusOrder}
                    data={dataStatusOrderSAPProcessed}
                    height="100px"
                    width={'100%'}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
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
              <Row>
                <Col>
                  <Typography.Text>SAP SO Complete</Typography.Text> <br />
                  <Typography.Text>Total 100.000 (100%)</Typography.Text>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    72.980 (72%)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Line
                    options={optionsStatusOrder}
                    data={dataStatusOrderSAPComplete}
                    height="100px"
                    width={'100%'}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Spacer size={10} />
        <Row gutter={8}>
          <Col span={8}>
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
              <Row>
                <Col>
                  <Typography.Text>DO Process</Typography.Text> <br />
                  <Typography.Text>Total 100.000 (100%)</Typography.Text>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    62.980 (62%)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Line
                    options={optionsStatusOrder}
                    data={dataStatusDoProcess}
                    height="100px"
                    width={'100%'}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
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
              <Row>
                <Col>
                  <Typography.Text>DO Complete</Typography.Text> <br />
                  <Typography.Text>Total 100.000 (100%)</Typography.Text>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    52.980 (52%)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Line
                    options={optionsStatusOrder}
                    data={dataStatusDoComplete}
                    height="100px"
                    width={'100%'}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
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
              <Row>
                <Col>
                  <Typography.Text>Error</Typography.Text> <br />
                  <Typography.Text>Total 100.000 (100%)</Typography.Text>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    98 (0.2%)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Line
                    options={optionsStatusOrder}
                    data={dataStatusError}
                    height="100px"
                    width={'100%'}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Spacer size={10} />
        <Row gutter={8}>
          <Col span={8}>
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
              <Row>
                <Col>
                  <Typography.Text>Cancel</Typography.Text> <br />
                  <Typography.Text>Total 100.000 (100%)</Typography.Text>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    980 (0.8%)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Line
                    options={optionsStatusOrder}
                    data={dataStatusCancel}
                    height="100px"
                    width={'100%'}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
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
              <Row>
                <Col>
                  <Typography.Text>Return Process</Typography.Text> <br />
                  <Typography.Text>Total 100.000 (100%)</Typography.Text>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    490 (0.5%)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Line
                    options={optionsStatusOrder}
                    data={dataReturnProcess}
                    height="100px"
                    width={'100%'}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
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
              <Row>
                <Col>
                  <Typography.Text>Return Complete</Typography.Text> <br />
                  <Typography.Text>Total 100.000 (100%)</Typography.Text>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    245 (0.5%)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Line
                    options={optionsStatusOrder}
                    data={dataReturnComplete}
                    height="100px"
                    width={'100%'}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  )
}
