import { Col, Row } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'

export default function SalesmanInfo() {
  const {
    state: {
      data: { salesman },
    },
  } = useSalesQuotationDetailContext()

  const generalInformation = [
    DataList.createDataList('Employee Name', salesman.name),
    DataList.createDataList('Division Name', salesman.division_name),
    DataList.createDataList('Branch', salesman.branch_name),
    DataList.createDataList('ID Card Number', salesman.employee_id),
    DataList.createDataList('Mobile Number', salesman.mobile_number),
    DataList.createDataList('Email', salesman.email),
    DataList.createDataList('External Code', salesman.external_number),
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
