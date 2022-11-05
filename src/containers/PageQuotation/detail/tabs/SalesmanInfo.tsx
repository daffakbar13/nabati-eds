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
  const salesman = data.salesman

  const generalInformation = [
    CreateDataList('Employee Name', salesman.name),
    // FIXME Employee Name
    CreateDataList('Division Name', salesman.division_name),
    CreateDataList('Branch', salesman.branch_name),
    CreateDataList('ID Card Number', salesman.employee_id),
    // FIXME Mobile Number
    CreateDataList('Mobile Number', salesman.mobile_number),
    // FIXME Email
    CreateDataList('Email', salesman.email),
    // FIXME External Code
    CreateDataList('External Code', salesman.external_number),
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
