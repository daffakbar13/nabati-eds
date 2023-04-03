import styled from 'styled-components'
import { FilterSection } from './components'
import { Col, Select, Row, Typography, Progress } from 'antd'
import { Card, Loader } from 'src/components'
import { Button, Modal, Spacer, Text, Table } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { FilterValueObj } from 'src/components/SmartFilter2'
import moment from 'moment'
import { Picker } from './elements'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import { columnsStockBarangTipis, columnsTopBarang } from './components/column/WareHouseColumn'

export default function Warehouse() {
  ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

  const StyledSelect = styled(Select)`
    width: 102%;
    padding: 5px 0px;
    border-top: 1px solid #aaa;
    border-left: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  `

  const startOfMonth = moment().startOf('month')
  const endOfMonth = moment().endOf('month')
  const [pickerType, setPickerTypeValue] = useState<'hour' | 'day' | 'week' | 'month'>('month')
  const [selectedDates, setSelectedDate] = useState<[any, any]>([startOfMonth, endOfMonth])
  const [filters, setFilters] = useState<FilterValueObj[]>([])

  const data = {
    labels: ['Total Barang Masuk', 'Total Barang Keluar'],
    datasets: [
      {
        data: [12, 19],
        backgroundColor: ['rgb(43 190 203)', 'rgb(22 95 102)'],
        borderColor: ['rgb(43 190 203)', 'rgb(22 95 102)'],
        borderWidth: 1,
      },
    ],
  }

  const dataTransaksi = {
    labels: ['Total Transaksi Barang Masuk', 'Total Transaksi Barang Keluar'],
    datasets: [
      {
        data: [12, 19],
        backgroundColor: ['rgb(235 0 139)', 'rgb(71 0 42)'],
        borderColor: ['rgb(235 0 139)', 'rgb(71 0 42)'],
        borderWidth: 1,
      },
    ],
  }

  const dataKeluarMasukJenisBarang = {
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
        label: 'Masuk',
        data: [10, 20, 9, 18, 8, 16, 7, 14, 6, 12, 5, 10],
        backgroundColor: 'rgb(235 0 139)',
      },
      {
        label: 'Keluar',
        data: [5, 10, 6, 12, 7, 14, 8, 16, 9, 18, 10, 20],
        backgroundColor: 'rgb(43 190 203)',
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const optionsBar = {
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

  return (
    <>
      <FilterSection
        onFilterChange={setFilters}
        onDateChange={(dates) => setSelectedDate(dates)}
        selectFilter={false}
      />
      <Spacer size={20} />
      <Row gutter={8} wrap={false}>
        <Col flex={'60%'}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col flex={'30%'}>
                <Row gutter={8}>
                  <Col>
                    <Typography.Text strong>Summary</Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col flex={'70%'}>
                <Row justify="end">
                  <Col>
                    <StyledSelect
                      size="large"
                      defaultValue={pickerType}
                      options={['Hour', 'Day', 'Week', 'Month'].map((value) => ({
                        label: value,
                        value: value.toLowerCase(),
                      }))}
                      onChange={(val: any) => setPickerTypeValue(val)}
                    />
                  </Col>

                  <Col>
                    <Picker
                      type={pickerType}
                      onChange={(date) => {
                        if (date && date[0] && date[1]) {
                          setSelectedDate(date)
                        } else {
                          setSelectedDate([moment().startOf('month'), moment().endOf('month')])
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Spacer size={20} />
            <Row gutter={10}>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    {' '}
                    <Typography.Text>Total Barang masuk</Typography.Text>
                    <br />
                    <Typography.Title level={3}>12</Typography.Title> <br />
                    <Typography.Text>Total Barang Keluar</Typography.Text>
                    <br />
                    <Typography.Title level={3}>19</Typography.Title> <br />
                  </Col>
                  <Col span={12}>
                    <Pie data={data} options={options} />
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    {' '}
                    <Typography.Text>Total Transaksi Barang Masuk</Typography.Text>
                    <br />
                    <Typography.Title level={3}>12</Typography.Title> <br />
                    <Typography.Text>Total Transaksi Barang Keluar</Typography.Text>
                    <br />
                    <Typography.Title level={3}>19</Typography.Title> <br />
                  </Col>
                  <Col span={12}>
                    <Pie data={dataTransaksi} options={options} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col flex={'40%'}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Row gutter={8}>
                  <Col>
                    <Typography.Text strong>Total Stock</Typography.Text> <br />
                    <Typography.Title level={1}>20.429</Typography.Title> <br />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Typography.Text strong>PMA Bandung Selatan</Typography.Text>
              <Typography.Text>19.000</Typography.Text>
              <Progress percent={90} showInfo={false} strokeColor={'#eb008b'} />
            </Row>
            <Spacer size={10} />
            <Row justify="space-between" align="middle">
              <Typography.Text strong>PMA Pandeglag</Typography.Text> <br />
              <Typography.Text>1.429</Typography.Text>
              <Progress percent={20} showInfo={false} strokeColor={'#eb008b'} />
            </Row>
          </Card>
        </Col>
      </Row>
      <Spacer size={20} />
      <Row gutter={8} wrap={false}>
        <Col flex={'60%'}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col flex={'40%'}>
                <Row gutter={8}>
                  <Col>
                    <Typography.Text strong>
                      Masuk & Keluar berdasarkan Jenis Barang
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col flex={'60%'}>
                <Row justify="end">
                  <Col>
                    <StyledSelect
                      size="large"
                      defaultValue={'All'}
                      options={['All', 'Day', 'Week', 'Month'].map((value) => ({
                        label: value,
                        value: value.toLowerCase(),
                      }))}
                    />
                  </Col>

                  <Col>
                    <Picker
                      type={'day'}
                      onChange={(date) => {
                        if (date && date[0] && date[1]) {
                          setSelectedDate(date)
                        } else {
                          setSelectedDate([moment().startOf('month'), moment().endOf('month')])
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Spacer size={20} />
            <Row gutter={8}>
              <Col span={24}>
                <Bar
                  options={optionsBar}
                  data={dataKeluarMasukJenisBarang}
                  height="350px"
                  width={'100%'}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col flex={'40%'}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Row gutter={8}>
                  <Col>
                    <Typography.Text strong>Stock Barang Menipis</Typography.Text> <br />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Spacer size={20} />
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
              <Table columns={columnsStockBarangTipis} dataSource={[]} />
            </div>
          </Card>
        </Col>
      </Row>
      <Spacer size={20} />
      <Row gutter={8} wrap={false}>
        <Col flex={'100%'}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col flex={'30%'}>
                <Row gutter={8}>
                  <Col>
                    <Typography.Text strong>
                      Masuk & Keluar berdasarkan Jenis Barang
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col flex={'70%'}>
                <Row justify="end">
                  <Col>
                    <StyledSelect
                      size="large"
                      defaultValue={'All'}
                      options={['All', 'Day', 'Week', 'Month'].map((value) => ({
                        label: value,
                        value: value.toLowerCase(),
                      }))}
                    />
                  </Col>

                  <Col>
                    <Picker
                      type={'day'}
                      onChange={(date) => {
                        if (date && date[0] && date[1]) {
                          setSelectedDate(date)
                        } else {
                          setSelectedDate([moment().startOf('month'), moment().endOf('month')])
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Spacer size={20} />
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
              <Table columns={columnsTopBarang} dataSource={[]} />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}
