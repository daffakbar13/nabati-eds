/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
import { Col, Popover, Row, message } from 'antd'
import { Search, Button } from 'pink-lava-ui'
import React from 'react'
import { useFilters } from 'src/hooks'
import * as XLSX from 'xlsx'
import { ICDownloadTemplate, ICUpload } from 'src/assets'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { useSFACallPlanListContext } from '../states'
import { uploadCallPlanListData } from 'src/api/call-plan-list'

export default function SectionAction() {
  const {
    state: { table },
    handler: { handleShowModal },
  } = useSFACallPlanListContext()
  const { searchProps } = useFilters(table, 'Salesman&Customer ID/Name', [
    'salesman_id',
    'salesman_name',
    'customer_id',
    'customer_name',
  ])
  const showPopUpMessage = (fieldName: string, isSuccess: boolean) =>
    message[isSuccess ? 'success' : 'error'](`${fieldName}`)

  const excelData = [
    {
      'Salesman ID': '131600',
      'Salesman Name': 'SANGKAKALA, TK',
      'Customer ID': 'C1624001',
      'Customer Name': 'SANGKAKALA, TK',
      'Branch ID': 'P104',
      Company: 'PP01',
      Cycle: 'M1',
      Date: '24/03/2023',
      Day: 'Monday',
      Week: '4',
      'Week ID': '202317',
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

  const handleClickUpload = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = input?.files?.[0]
    if (file) {
      try {
        await uploadCallPlanListData(file)
        input.value = ''
        showPopUpMessage('Upload Data Success !', true)
      } catch (error) {
        showPopUpMessage('Failed to upload data!', false)
      }
    } else {
      showPopUpMessage('No file selected!', false)
    }
  }

  const uploadCallPlanList = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    if (!file) {
      showPopUpMessage('No file selected !', false)
      return
    }

    const allowedFileType = '.xlsx'
    const fileType = file.type
    const validationFile = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const validFileType = fileType === validationFile
    const validExtension = file.name.endsWith(allowedFileType)
    if (!validFileType || !validExtension) {
      showPopUpMessage('Invalid file type or extension', false)
      event.target.value = null
      return
    }
    const reader = new FileReader()

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      const expectedHeaders = [
        'Salesman ID',
        'Salesman Name',
        'Customer ID',
        'Customer Name',
        'Branch ID',
        'Company',
        'Cycle',
        'Call Date',
        'Day',
        'Week',
        'Week ID',
      ]
      const headerRow = json[0] as string[]
      if (!expectedHeaders.every((header) => headerRow.includes(header))) {
        showPopUpMessage('Excel data does not match the format !', false)
        event.target.value = null
        return
      }
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
          <input type="file" onChange={uploadCallPlanList} />
        </div>
      </Col>
      <Col span={24}>
        <Row gutter={10} style={{ cursor: 'pointer' }}>
          <Col>
            <ICUpload />
          </Col>
          <Col onClick={handleClickUpload}>Click here to Upload</Col>
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
        <Col>
          <Popover placement="bottom" content={moreContentForUpload} trigger="click">
            <Button size="big" variant="secondary" style={{ gap: 5 }}>
              <UploadOutlined /> Upload
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
