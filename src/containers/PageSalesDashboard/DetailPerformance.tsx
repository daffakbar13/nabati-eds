import { FilterSection } from './components'
import { Col, Radio, Row, Typography } from 'antd'
import { Button, Modal, Spacer, Text, Table } from 'pink-lava-ui'
import { ICFilter } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Loader } from 'src/components'
import { useEffect, useState } from 'react'
import { FilterValueObj } from 'src/components/SmartFilter2'
import moment from 'moment'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

export default function DetailPerformance() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  const startOfMonth = moment().startOf('month')
  const endOfMonth = moment().endOf('month')

  const [selectedDates, setSelectedDate] = useState<[any, any]>([startOfMonth, endOfMonth])
  const [filters, setFilters] = useState<FilterValueObj[]>([])

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const optionsVertical = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const dataBussinessUnit = {
    labels: [
      'Cereal',
      'Wafer Flat',
      'Biscuit',
      'Confectionery',
      'Wafer Stick',
      'Snack',
      'Assorted',
      'Diapers',
      'Noodle',
      'Waffle',
    ],
    datasets: [
      {
        label: 'QTY',
        data: [5, 10, 6, 12, 7, 14, 8, 16, 9, 18, 10, 20],
        backgroundColor: 'rgb(43 190 203)',
      },
      {
        label: 'Outlet',
        data: [10, 20, 9, 18, 8, 16, 7, 14, 6, 12, 5, 10],
        backgroundColor: 'rgb(235 0 139)',
      },
    ],
  }

  const dataRegion = {
    labels: [
      'Jawa Barat',
      'Jawa Tengah',
      'Jakarta',
      'Banten',
      'Balinusta',
      'Tangerang Kota',
      'Sumatra 1',
      'Sumatra 2',
      'Sulawesi 1',
      'Sulawesi 2',
    ],
    datasets: [
      {
        label: 'QTY',
        data: [5, 10, 6, 12, 7, 14, 8, 16, 9, 18, 10, 20],
        backgroundColor: 'rgb(43 190 203)',
      },
      {
        label: 'Outlet',
        data: [10, 20, 9, 18, 8, 16, 7, 14, 6, 12, 5, 10],
        backgroundColor: 'rgb(235 0 139)',
      },
    ],
  }

  const dataBranch = {
    labels: [
      'PMA Bandung Selatan',
      'PMA Bandung Barat',
      'PMA Tanggerang Kota',
      'PMA Jakarta Barat',
      'PMA Cipondoh',
      'PMA Teluk Naga',
      'PMA Bekasi',
      'PMA Sindang Jaya',
      'PMA Bogor Barat',
      'PMA Situbondo',
      'PMA Magelang',
    ],
    datasets: [
      {
        label: 'QTY',
        data: [5, 10, 6, 12, 7, 14, 8, 16, 9, 18, 10, 20, 11],
        backgroundColor: 'rgb(43 190 203)',
      },
      {
        label: 'Outlet',
        data: [10, 20, 9, 18, 8, 16, 7, 14, 6, 12, 5, 10, 4],
        backgroundColor: 'rgb(235 0 139)',
      },
    ],
  }

  const dataOutletType = {
    labels: [
      'RTL-Retail Large',
      'RTS-Retail Small',
      'Retail-SKM',
      'GR-Grosis Reguler',
      'RTM-Retail Medium',
      'SG-Semi Grosir',
      'KR-Kios Rokok',
      'Aneka Pembeli',
      'BG-Big Grosir',
      'Ga-Grosir Armada',
      'IDG-INDOGROSIR',
    ],
    datasets: [
      {
        label: 'QTY',
        data: [5, 10, 6, 12, 7, 14, 8, 16, 9, 18, 10, 20, 11],
        backgroundColor: 'rgb(43 190 203)',
      },
      {
        label: 'Outlet',
        data: [10, 20, 9, 18, 8, 16, 7, 14, 6, 12, 5, 10, 4],
        backgroundColor: 'rgb(235 0 139)',
      },
    ],
  }

  const dataSKU = {
    labels: [
      'Simba Choco Cips REG',
      'Nabati RCB 50g',
      'Nabati RCB 145g',
      'Nabati RCO 46g',
      'Nabati RCE 46g',
      'Nextar Cookies STW',
      'Bisvit Selimut CHE',
      'Nabati RCE 50g',
      'Nabati RCE 42g',
      'Pasta RCE 6g',
      'Nabati RCE 125g',
    ],
    datasets: [
      {
        label: 'QTY',
        data: [5, 10, 6, 12, 7, 14, 8, 16, 9, 18, 10, 20, 11],
        backgroundColor: 'rgb(43 190 203)',
      },
      {
        label: 'Outlet',
        data: [10, 20, 9, 18, 8, 16, 7, 14, 6, 12, 5, 10, 4],
        backgroundColor: 'rgb(235 0 139)',
      },
    ],
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FilterSection
          onFilterChange={setFilters}
          onDateChange={(dates) => setSelectedDate(dates)}
        />
        <Row gutter={8} wrap={false}>
          <Col span={24}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>
                        Bussiness Unit 01 December 2022 - 21 December 2022
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
              <Spacer size={20} />
              <Row gutter={8}>
                <Col span={24}>
                  <Bar options={options} data={dataBussinessUnit} height="350px" width={'100%'} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={8} wrap={false}>
          <Col span={24}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>
                        Region 01 December 2022 - 21 December 2022
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
              <Spacer size={20} />
              <Row gutter={8}>
                <Col span={24}>
                  <Bar options={options} data={dataRegion} height="350px" width={'100%'} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={8} wrap={false}>
          <Col span={24}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>
                        Branch 01 December 2022 - 21 December 2022
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
              <Spacer size={20} />
              <Row gutter={8}>
                <Col span={24}>
                  <Bar options={optionsVertical} data={dataBranch} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={8} wrap={false}>
          <Col span={24}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>
                        Outlet Type 01 December 2022 - 21 December 2022
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
              <Spacer size={20} />
              <Row gutter={8}>
                <Col span={24}>
                  <Bar options={optionsVertical} data={dataOutletType} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={8} wrap={false}>
          <Col span={24}>
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={8}>
                    <Col>
                      <Typography.Text strong>
                        SKU 01 December 2022 - 21 December 2022
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
              <Spacer size={20} />
              <Row gutter={8}>
                <Col span={24}>
                  <Bar options={optionsVertical} data={dataSKU} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
