import { Col, Row } from 'antd'
import React from 'react'
import { DataListProps } from './types'

export default function DataList(props: DataListProps) {
    const { label, value } = props

    return (
        <Row gutter={5}>
            <Col span={12}>
                <div style={{ display: 'flex' }}>
                    <h3>{label}</h3>
                    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end' }}>
                        <h3>:</h3>
                    </div>
                </div>
            </Col>
            <Col span={12}>
                <h3>{value}</h3>
            </Col>
        </Row>
    )
}
