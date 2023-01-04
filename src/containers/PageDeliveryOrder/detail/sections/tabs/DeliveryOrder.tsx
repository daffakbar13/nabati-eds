/* eslint-disable radix */
import { Col, Row, Divider } from 'antd'
import React from 'react'
import { Table, Spacer } from 'pink-lava-ui'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import dateFormat from 'src/utils/dateFormat'
import { ColumnsDeliveryOrder } from '../../columns'

interface DeliveryOrderProps {
  data: any
}

const createDataList = (label: string, value: string) => ({ label, value: value || '-' })

export default function DeliveryOrder(props: DeliveryOrderProps) {
  const { data } = props

  const dataList = [
    createDataList('Order Type', data.order_type),
    createDataList('Customer', data.customer),
    createDataList('Sales Org.', data.sales_org),
    createDataList('Branch', data.branch),
    createDataList('Salesman', data.salesman),
    createDataList('Doc. Date', dateFormat(data.document_date)),
    createDataList('Delivery Date', dateFormat(data.delivery_date)),
    createDataList('Quotation', data.quotation_id),
    createDataList('Reference', data.reference),
    createDataList('Created On', dateFormat(data.created_at)),
    createDataList('Created By', data.created_by),
    createDataList('Modified On', dateFormat(data.modified_at)),
    createDataList('Modified By', data.modified_by),
  ]

  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          {dataList.slice(0, 5).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(5, 9).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(9).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
          {data.status === 'Cancel' && (
            <DataList label={'Reason Cancel'} value={data.cancel_reason_name} />
          )}
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={ColumnsDeliveryOrder} dataSource={data.delivery_items} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Total label="Total Gross" value={parseInt(data.gross_total_amount).toLocaleString()} />
            <Total label="Total DPP" value={parseInt(data.dpp_total_amount).toLocaleString()} />
            <Total
              label="Total Disc"
              value={parseInt(data.discount_total_amount).toLocaleString()}
            />
            <Total label="Total Net" value={parseInt(data.net_total_amount).toLocaleString()} />
            <Total label="Total Tax" value={parseInt(data.tax_total_amount).toLocaleString()} />
          </div>
        </Col>
      </Row>
    </>
  )
}
