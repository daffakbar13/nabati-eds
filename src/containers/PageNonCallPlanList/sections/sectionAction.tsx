import { Col, Popover, Row } from 'antd'
// import { useRouter } from 'next/router'
import { Search, Button } from 'pink-lava-ui'
import React from 'react'
import { useFilters } from 'src/hooks'
import { useSFANonCallPlanListContext } from '../states'
import * as XLSX from 'xlsx'
import { ICDownloadTemplate } from 'src/assets'
import { DownloadOutlined } from '@ant-design/icons'

export default function SectionAction() {
  const {
    state: { table },
    handler: { handleShowModal },
  } = useSFANonCallPlanListContext()
  const { searchProps } = useFilters(table, 'Customer&Salesman ID/Name,Generate Date', [
    'customer_id',
    'customer_name',
    'salesman_id',
    'salesman_name',
    'generate_day',
  ])
  // const router = useRouter()

  function downloadNonCallPlanData() {
    const excelData = [
      {
        CompanyID: '131600',
        CustomerID: 'C1624884',
        SalesmanID: '131600',
        VisitDate: '24 Apr 2023',
        GenerateDate: '01 Jan 2024',
        CustomerName: 'RIZKI, TK',
        CustomerAddress: 'PSR KIARA CONDONG',
        SalesmanName: 'OFFICE OFFICE',
        CalendarWeek: '202317',
        CalendarWeekInt: '17',
        CalendarWeekInMonth: '4',
        CalendarMonth: '202304',
        CalendarDayName: 'Monday',
      },
    ]
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'NonCallPlanData.xlsx'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const moreContentForDownload = (
    <Row gutter={[10, 10]} style={{ fontWeight: 'bold', width: 200 }}>
      <Col span={24}>
        <Row gutter={10} style={{ cursor: 'pointer' }}>
          <Col>
            <ICDownloadTemplate />
          </Col>
          <Col onClick={downloadNonCallPlanData}> Download Data</Col>
        </Row>
      </Col>
    </Row>
  )

  return (
    <Row justify="space-between">
      <Row gutter={10}>
        <Col>
          <Search {...searchProps} />
        </Col>
      </Row>
      <Row gutter={10}>
        <Col>
          <Popover placement="bottom" content={moreContentForDownload} trigger="click">
            <Button size="big" variant="tertiary" style={{ gap: 5 }}>
              <DownloadOutlined /> Download
            </Button>
          </Popover>
        </Col>
      </Row>
    </Row>
  )
}
