/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { Table, Spacer } from 'pink-lava-ui'

import { TableDocumentHeader } from '../columns'

interface DocumentHeaderProps {
  data: any
}

const createDataList = (label: string, value: string) => ({ label, value })

export default function DocumentHeader(props: DocumentHeaderProps) {
  const { data } = props
  const { shipment_detail, shipment_items_detail } = data

  const dataList = [
    createDataList('Sales Org.', shipment_detail?.sales_org_name),
    createDataList('Plant', shipment_detail?.plant_name),
    createDataList('Vehicle', shipment_detail?.vehicle_id),
    createDataList('Driver', shipment_detail?.driver_name),
    createDataList('Loading Date', shipment_detail?.loading_date),
    createDataList('Posting Date', shipment_detail?.posting_date),
    createDataList('Actual Delivery Date', shipment_detail?.actual_delivery_date),
    createDataList('Created On', shipment_detail?.created_date),
    createDataList('Created By', shipment_detail?.created_by),
    createDataList('Modified On', shipment_detail?.modified_at),
    createDataList('Modified By', shipment_detail?.modified_by),
  ]

  shipment_items_detail?.map((obj, index) => Object.assign(obj, { no: ++index }))

  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          {dataList.slice(0, 4).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(4, 7).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(7).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={TableDocumentHeader} dataSource={shipment_items_detail} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <Total label="Total Amount" value={123} />
        </Col>
      </Row>
    </>
  )
}
