/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import { Table, Spacer } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'
import { TableDocumentHeader } from '../columns'

interface DocumentHeaderProps {
  data: any
}

export default function DocumentHeader(props: DocumentHeaderProps) {
  const { data } = props
  const { shipment_detail, shipment_items_detail } = data

  const dataList = [
    DataList.createDataList('Sales Org.', shipment_detail?.sales_org_name),
    DataList.createDataList('Branch', shipment_detail?.plant_name),
    DataList.createDataList('Vehicle', shipment_detail?.vehicle_id),
    DataList.createDataList('Driver', shipment_detail?.driver_name),
    DataList.createDataList('Loading Date', dateFormat(shipment_detail?.loading_date)),
    DataList.createDataList('Posting Date', dateFormat(shipment_detail?.posting_date)),
    DataList.createDataList(
      'Actual Delivery Date',
      dateFormat(shipment_detail?.actual_delivery_date),
    ),
    DataList.createDataList('Created On', dateFormat(shipment_detail?.created_date)),
    DataList.createDataList('Created By', shipment_detail?.created_by),
    DataList.createDataList('Modified On', dateFormat(shipment_detail?.modified_at)),
    DataList.createDataList('Modified By', shipment_detail?.modified_by),
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
        <Table
          columns={TableDocumentHeader}
          dataSource={shipment_items_detail}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <Spacer size={30} />
      {/* <Row>
        <Col span={12} offset={12}>
          <Total label="Total Amount" value={123} />
        </Col>
      </Row> */}
    </>
  )
}
