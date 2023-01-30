import { Col, Row } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import { concatString } from 'src/utils/concatString'

interface SalesmanInfoProps {
  data: any
}

// const DataList.createDataList = (label: string, value: string) => ({ label, value })

export default function SalesmanInfo(props: SalesmanInfoProps) {
  const {
    data: {
      salesman_info: {
        salesman_name,
        division_name,
        branch_id,
        branch_name,
        employee_id_card,
        mobile_number,
        email,
      },
    },
  } = props

  const generalInformation = [
    DataList.createDataList('Employee Name', salesman_name),
    DataList.createDataList('Division Name', division_name),
    DataList.createDataList('Branch', concatString(branch_id, branch_name)),
    DataList.createDataList('ID Card Number', employee_id_card),
    DataList.createDataList('Mobile Number', mobile_number),
    DataList.createDataList('Email', email),
    DataList.createDataList('External Code', ''),
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
