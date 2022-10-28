import { Col, Row } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'

interface SalesmanInfoProps {
  data: any
}

const CreateDataList = (label: string, value: string) => ({ label, value })

export default function SalesmanInfo(props: SalesmanInfoProps) {
  const { data } = props

  const generalInformation = [
    CreateDataList('Employee Name', data.salesman.name),
    // FIXME Employee Name
    CreateDataList('Division Name', data.division_name),
    CreateDataList('Branch', data.branch_name),
    CreateDataList('ID Card Number', data.salesman.employee_id),
    // FIXME Mobile Number
    CreateDataList('Mobile Number', data.customer_phone),
    // FIXME Email
    CreateDataList('Email', data.customer_email),
    // FIXME External Code
    CreateDataList('External Code', data.external_code),
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
