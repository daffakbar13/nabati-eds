import { Col, Row, Divider } from 'antd'
import { Table, Spacer } from 'pink-lava-ui'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { concatString } from 'src/utils/concatString'
import dateFormat from 'src/utils/dateFormat'
import { ColumnsSalesOrder } from '../../columns'

interface SalesOrderProps {
  data: any
}

const createDataList = (label: string, value: string) => ({ label, value })

export default function SalesOrder(props: SalesOrderProps) {
  const { data } = props
  const format = 'DD MMMM YYYY'

  const dataList = [
    DataList.createDataList('Sales Order', data.id),
    DataList.createDataList('Customer', concatString(data.customer_id, data.customer_name)),
    DataList.createDataList('Sales Org.', concatString(data.sales_org_id, data.sales_org_name)),
    DataList.createDataList('Branch', concatString(data.branch_id, data.branch_name)),
    DataList.createDataList('Salesman', concatString(data.salesman_id, data.salesman_name)),
    DataList.createDataList('Doc. Date', dateFormat(data.doc_date, format)),
    createDataList('Delivery Date', dateFormat(data.delivery_date, format)),
    createDataList('Quotation', data.document_ref_id),
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
        <Table columns={ColumnsSalesOrder} dataSource={data.items} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <Total label="Total Gross" value={data.gross_total_amount} />
            </Col>
            <Col span={24}>
              <Total label="Total DPP" value={data.dpp_total_amount} />
            </Col>
            <Col span={24}>
              <Total label="Total Disc" value={data.discount_total_amount} />
            </Col>
            <Col span={24}>
              <Total label="Total Net" value={data.net_total_amount} />
            </Col>
            <Col span={24}>
              <Total label="Total Tax" value={data.tax_total_amount} />
            </Col>
            <Col span={24}>
              <Total label="Total Amount" value={data.total_amount} largeSize />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
