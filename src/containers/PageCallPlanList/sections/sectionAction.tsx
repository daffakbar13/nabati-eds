/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
import { Col, Popover, Row } from 'antd'
import { Search, Button } from 'pink-lava-ui'
import React from 'react'
import { useFilters } from 'src/hooks'
import * as XLSX from 'xlsx'
import { ICDownloadTemplate, ICUpload } from 'src/assets'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { useSFACallPlanListContext } from '../states'

export default function SectionAction() {
  const {
    state: { table },
    handler: { handleShowModal },
  } = useSFACallPlanListContext()
  const { searchProps } = useFilters(table, 'Salesman ID, Customer ID, etc', [
    'salesman_id',
    'salesman_name',
    'customer_id',
    'customer_name',
  ])
  let jsonData = null

  const excelData = [
    {
      'Salesman ID': '131600',
      'Salesman Name': 'OFFCE OFFICE',
      'Customer ID': 'C1624884',
      'Customer Name': 'RIZKI, TK',
      Day: 'Monday',
      Date: '24 Apr 2023 07:00',
      Status: 'Generate',
      'Week ID': '202317',
      'Week In Period': '4',
      'Call Pattern': 'Call PLan',
    },
  ]

  function downloadCallPlanPattern() {
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
    link.download = 'CallPlanListTemplate.xlsx'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleClickUpload = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (jsonData !== null) {
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
    const validationFile = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const validFileType = fileType === validationFile
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

      const expectedHeaders = Object.keys(excelData[0])
      const headerRow = json[0] as string[]
      if (!expectedHeaders.every((header) => headerRow.includes(header))) {
        alert('Excel data does not match the format !')
        event.target.value = null
        return
      }
      const [newJson] = json
      jsonData = newJson
    }
    reader.readAsArrayBuffer(file)
  }

  const moreContentForDownload = (
    <Row gutter={[10, 10]} style={{ fontWeight: 'bold', width: 200 }}>
      <Col span={24}>
        <Row gutter={10} style={{ cursor: 'pointer' }}>
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
      <Col>
        <div>
          <input type="file" onChange={uploadCallPlanPattern} />
        </div>
      </Col>
      <Col span={24}>
        <Row gutter={10} style={{ cursor: 'pointer' }}>
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
            Generate
          </Button>
        </Col>
      </Row>
    </Row>
  )
}
