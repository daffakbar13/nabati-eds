import { Col, Popover, Row } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
// import { useRouter } from 'next/router'
import { Search, Button } from 'pink-lava-ui'
import React from 'react'
import { useFilters } from 'src/hooks'
import * as XLSX from 'xlsx'
import { ICDownloadTemplate, ICUpload } from 'src/assets'
import { useSFACallPlanPatternContext } from '../states'
import { uploadCallPlanPatternData } from 'src/api/call-plan-pattern'

export default function SectionAction() {
  const {
    state: { table },
    handler: { handleShowModal },
  } = useSFACallPlanPatternContext()
  const { searchProps } = useFilters(table, 'Salesman/Customer/Branch ID, Cycle', [
    'salesman_id',
    'customer_id',
    //'eds_customer_salesman.company_id',
    'eds_salesman.branch_id',
    'cycle',
    //'visit_day',
  ])
  // const router = useRouter()
  let jsonData = null

  function downloadCallPlanPattern() {
    const excelData = [
      {
        SalesmanID: '131600',
        CustomerID: 'C1624002',
        Company: 'PP01',
        Branch: 'P104',
        Cycle: 'M1',
        'Week 1': '1',
        'Week 2': '1',
        'Week 3': '1',
        'Week 4': '1',
        'Call Date': '4',
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
    link.download = 'CallPlanPatternTemplate.xlsx'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleClickUpload = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (jsonData !== null) {
      //console.log(jsonData)
      //uploadCallPlanPatternData(jsonData)
      jsonData = null
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      input.value = ''
      alert('Upload Data Success !')
    } else {
      alert('No file selected !')
    }
  }

  const uploadCallPlanPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    if (!file) {
      alert('No file selected !')
      return
    }

    const allowedFileType = '.xlsx'
    const fileType = file.type
    const validFileType =
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const validExtension = file.name.endsWith(allowedFileType)
    if (!validFileType || !validExtension) {
      alert('Invalid file type or extension')
      event.target.value = null
      return
    }
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      const expectedHeaders = [
        'SalesmanID',
        'CustomerID',
        'Company',
        'Branch',
        'Cycle',
        'Week 1',
        'Week 2',
        'Week 3',
        'Week 4',
        'Call Date',
      ]
      const headerRow = json[0] as string[]
      if (!expectedHeaders.every((header) => headerRow.includes(header))) {
        alert('Excel data does not match the format !')
        event.target.value = null
        return
      }
      jsonData = json[1]
    }
    reader.readAsArrayBuffer(file)
  }

  const moreContentForDownload = (
    <Row gutter={[10, 10]} style={{ fontWeight: 'bold', width: 200 }}>
      <Col span={24}>
        <Row gutter={10}>
          <Col>
            <ICDownloadTemplate />
          </Col>
          <Col onClick={downloadCallPlanPattern}> Download Template</Col>
        </Row>
      </Col>
    </Row>
  )

  const moreContentForUpload = (
    <Row gutter={[10, 10]} style={{ fontWeight: 'bold', width: 200 }}>
      <Col span={24}>
        <Row gutter={10}>
          <div>
            <input type="file" onChange={uploadCallPlanPattern} />
          </div>
          <Col>
            <ICUpload />
          </Col>
          <Col onClick={handleClickUpload}> Upload Data</Col>
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
              <DownOutlined /> Download
            </Button>
          </Popover>
        </Col>
        <Col>
          <Popover placement="bottom" content={moreContentForUpload} trigger="click">
            <Button size="big" variant="secondary" style={{ gap: 5 }}>
              <UpOutlined /> Upload
            </Button>
          </Popover>
        </Col>
        <Col>
          <Button size="big" variant="primary" onClick={() => handleShowModal(true)}>
            Create New
          </Button>
        </Col>
      </Row>
    </Row>
  )
}
