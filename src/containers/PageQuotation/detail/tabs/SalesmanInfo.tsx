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
        CreateDataList('Employee Name', data.customer_name),
        CreateDataList('Division Name', data.division_name),
        CreateDataList('Branch', data.branch_name),
        CreateDataList('ID Card Number', data.id_card_number),
        CreateDataList('Mobile Number', data.customer_phone),
        CreateDataList('Email', data.customer_email),
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
