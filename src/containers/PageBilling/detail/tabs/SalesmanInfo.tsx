import { Col, Row } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'

interface SalesmanInfoProps {
  data: any
}

// const DataList.createDataList = (label: string, value: string) => ({ label, value })

export default function SalesmanInfo(props: SalesmanInfoProps) {
  const { data } = props

  const generalInformation = [
    DataList.createDataList('Employee Name', data?.salesman_info?.employee_name || ''),
    DataList.createDataList('Division Name', data?.salesman_info?.division_name || ''),
    DataList.createDataList('Branch', data?.salesman_info?.branch || ''),
    DataList.createDataList('ID Card Number', data?.salesman_info?.id_card_number || ''),
    DataList.createDataList('Mobile Number', data?.salesman_info?.mobile_number || ''),
    DataList.createDataList('Email', data?.salesman_info?.email || ''),
    DataList.createDataList('External Code', data?.salesman_info?.external_code || ''),
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
