import { Col, Row } from 'antd'
import React from 'react'
import { DataListProps } from './types'

export default function DataList(props: DataListProps) {
  const { label, value } = props

  return (
    <Row gutter={5} style={{ margin: '2px 0', fontSize: 16 }}>
      <Col span={12} style={{ padding: 0 }}>
        <div style={{ display: 'flex' }}>
          <div>
            <strong>{label}</strong>
          </div>
          <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end' }}>
            <div>:</div>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div>{value}</div>
      </Col>
    </Row>
  )
}

DataList.createDataList = (label: string, value: string) => ({ label, value })
