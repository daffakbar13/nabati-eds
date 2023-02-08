/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import { Table, Spacer } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'
import { addColumn } from 'src/utils/createColumns'
import { Linked } from '../columns'

interface DocumentHeaderProps {
  data: any
  revisedDelivery: any[]
}

export default function DocumentHeader(props: DocumentHeaderProps) {
  const { data, revisedDelivery } = props
  const { proforma_invoice_detail, proforma_invoice_items_detail } = data

  const dataList = [
    DataList.createDataList('Sales Org.', proforma_invoice_detail?.sales_org_name),
    DataList.createDataList('Plant', proforma_invoice_detail?.plant_name),
    DataList.createDataList('Vehicle', proforma_invoice_detail?.vehicle_id),
    DataList.createDataList('Driver', proforma_invoice_detail?.driver_name),
    DataList.createDataList('Loading Date', dateFormat(proforma_invoice_detail?.loading_date)),
    DataList.createDataList('Posting Date', dateFormat(proforma_invoice_detail?.posting_date)),
    DataList.createDataList(
      'Actual Delivery Date',
      dateFormat(proforma_invoice_detail?.actual_delivery_date),
    ),
    DataList.createDataList('Created On', dateFormat(proforma_invoice_detail?.created_date)),
    DataList.createDataList('Created By', proforma_invoice_detail?.created_by),
    DataList.createDataList('Modified On', dateFormat(proforma_invoice_detail?.modified_at)),
    DataList.createDataList('Modified By', proforma_invoice_detail?.modified_by),
  ]

  proforma_invoice_items_detail?.map((obj, index) => Object.assign(obj, { no: ++index }))

  const TableDocumentHeader = [
    addColumn({
      title: 'No',
      dataIndex: 'no',
      width: 55,
      fixed: true,
    }),
    addColumn({
      title: 'Delivery Order',
      dataIndex: 'delivery_order_id',
    }),
    addColumn({
      title: 'Order Type',
      dataIndex: 'order_type',
    }),
    addColumn({
      title: 'Order Date',
      dataIndex: 'order_date',
    }),
    addColumn({
      title: 'Delivery Date',
      dataIndex: 'delivery_date',
    }),
    addColumn({
      title: 'Sales Org.',
      dataIndex: 'sales_org_name',
    }),
    addColumn({
      title: 'Plant',
      dataIndex: 'plant_name',
    }),
    addColumn({
      title: 'Ship To Customer',
      dataIndex: 'ship_to_customer',
    }),
    addColumn({
      title: 'Salesman',
      dataIndex: 'salesman_name',
    }),
    addColumn({
      title: 'Status',
      dataIndex: 'status',
      render: (_, { status, delivery_order_id }) =>
        revisedDelivery.find((item) => item.delivery_order_id === delivery_order_id)
          ? 'Revised'
          : status,
    }),
    addColumn({
      title: 'Action',
      render: (_, { delivery_order_id, status }) => (
        <Linked link={delivery_order_id} status={status} type="action" />
      ),
    }),
  ]

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
          dataSource={proforma_invoice_items_detail}
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
