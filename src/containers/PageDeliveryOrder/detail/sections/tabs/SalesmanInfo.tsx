import { Col, Row } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import { concatString } from 'src/utils/concatString'

interface SalesmanInfoProps {
  data: any
}

const CreateDataList = (label: string, value: string) => ({ label, value })

export default function SalesmanInfo(props: SalesmanInfoProps) {
  const {
    data: {
      salesman_detail: {
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
    CreateDataList('Employee Name', salesman_name),
    CreateDataList('Division Name', division_name),
    CreateDataList('Branch', concatString(branch_id, branch_name)),
    CreateDataList('ID Card Number', employee_id_card),
    CreateDataList('Mobile Number', mobile_number),
    CreateDataList('Email', email),
    CreateDataList('External Code', ''),
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
