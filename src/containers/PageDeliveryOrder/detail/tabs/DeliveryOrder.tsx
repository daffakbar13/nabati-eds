import { Col, Row, Table, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'
import { Spacer } from 'pink-lava-ui'
import { TableDeliveryOrder } from '../columns'

interface DeliveryOrderProps {
  data: any
}

const createDataList = (label: string, value: string) => ({ label, value })

export default function DeliveryOrder(props: DeliveryOrderProps) {
  const { data } = props
  // const table = useTable({ api: '', columns: TableDeliveryOrder })
  const dataList = [
    createDataList('Order Type', data.order_type),
    createDataList('Customer', data.customer),
    createDataList('Sales Org.', data.sales_org),
    // FIXME Plant
    createDataList('Plant', data.plant),
    createDataList('Salesman', data.salesman),
    createDataList('Doc. Date', data.document_date),
    createDataList('Delivery Date', data.delivery_date),
    createDataList('Quotation', data.quotation_id),
    createDataList('Reference', data.reference),
    createDataList('Created On', data.created_at),
    createDataList('Created By', data.created_by),
    createDataList('Modified On', data.modified_at),
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
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={TableDeliveryOrder} dataSource={data.items} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Total label="Total Gross" value={123} />
            <Total label="Total DPP" value={123} />
            <Total label="Total Disc" value={123} />
            <Total label="Total Net" value={123} />
            <Total label="Total Tax" value={123} />
          </div>
        </Col>
      </Row>
    </>
  )
}
