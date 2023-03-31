import { Col, Row } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'

interface SalesmanInfoProps {}

const CreateDataList = (label: string, value: string) => ({ label, value })

export default function SalesmanInfo(props: SalesmanInfoProps) {
  const {} = props

  const generalInformation = [
    CreateDataList('Employee Name', 'Test123'),
    CreateDataList('Division Name', 'Test123'),
    CreateDataList('Branch', 'Test123'),
    CreateDataList('ID Card Number', 'Test123'),
    CreateDataList('Mobile Number', 'Test123'),
    CreateDataList('Email', 'Test123'),
    CreateDataList('External Code', 'Test123'),
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
