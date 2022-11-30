import { Col, Row } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'

interface SalesmanInfoProps {
  data: any
}

// const DataList.createDataList = (label: string, value: string) => ({ label, value })

export default function SalesmanInfo(props: SalesmanInfoProps) {
  const {} = props

  const generalInformation = [
    DataList.createDataList('Employee Name', 'Test123'),
    DataList.createDataList('Division Name', 'Test123'),
    DataList.createDataList('Branch', 'Test123'),
    DataList.createDataList('ID Card Number', 'Test123'),
    DataList.createDataList('Mobile Number', 'Test123'),
    DataList.createDataList('Email', 'Test123'),
    DataList.createDataList('External Code', 'Test123'),
  ]

  return (
    <>
      <Row>
        <TitleDataList title="General Information" />
      </Row>
      <Row>
        <Col span={12}>
          {generalInformation.map(({ label, value }, index) => (
            <DataList key={index} label={label} value={value} />
          ))}
        </Col>
      </Row>
    </>
  )
}
