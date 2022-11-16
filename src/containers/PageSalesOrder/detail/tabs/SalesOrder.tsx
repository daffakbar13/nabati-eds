import { Col, Row, Divider } from 'antd'
import { Table, Spacer } from 'pink-lava-ui'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'
import dateFormat from 'src/utils/dateFormat'

import { TableSalesOrder } from '../columns'

interface SalesOrderProps {
  data: any
}

const createDataList = (label: string, value: string) => ({ label, value })

export default function SalesOrder(props: SalesOrderProps) {
  const { data } = props
  const format = 'DD MMMM YYYY'
  const concatString = (str: string[]) => (str.join(' - '))

  const dataList = [
    createDataList('Sales Order', data.id),
    createDataList('Customer', concatString([data.customer_id, data.customer_name])),
    createDataList('Sales Org.', concatString([data.sales_org_id, data.sales_org_name])),
    // FIXME Plant
    createDataList('Branch', concatString([data.branch_id, data.branch_name])),
    createDataList('Salesman', concatString([data.salesman_id, data.salesman_name])),
    // FIXME Doc. Date
    createDataList('Doc. Date', dateFormat(data.doc_date, format)),
    createDataList('Delivery Date', dateFormat(data.delivery_date, format)),
    // FIXME Quotation
    createDataList('Quotation', data.quotation),
    createDataList('Reference', data.customer_ref),
    createDataList('Created On', dateFormat(data.created_at, format)),
    createDataList('Created By', data.created_by),
    createDataList('Modified On', dateFormat(data.modified_at, format)),
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
        <Table columns={TableSalesOrder} dataSource={data.items} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Total label="Total Gross" value={data.gross_total_amount} />
            <Total label="Total DPP" value={data.dpp_total_amount} />
            <Total label="Total Disc" value={data.discount_total_amount} />
            <Total label="Total Net" value={data.net_total_amount} />
            <Total label="Total Tax" value={data.tax_total_amount} />
            <Total label="Total Amount" value={data.total_amount} largeSize />
          </div>
        </Col>
      </Row>
    </>
  )
}
