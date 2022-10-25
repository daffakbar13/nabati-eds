import { Col, Row } from 'antd'
import React from 'react'
import { DataListProps } from './types'

export default function DataList(props: DataListProps) {
    const { label, value } = props

    return (
        <Row>
            <Col span={12}><h3>{label}</h3></Col>
            <Col span={12}><h3>: {value}</h3></Col>
        </Row>
    )
}
