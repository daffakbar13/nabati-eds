import { Col, Row, Divider } from 'antd'
import { Table, Spacer } from 'pink-lava-ui'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { useSalesSalesOrderDetailContext } from 'src/hooks/contexts'
import { concatString } from 'src/utils/concatString'
import dateFormat from 'src/utils/dateFormat'
import { ColumnsSalesOrder } from '../../columns'

export default function SalesOrder() {
  const {
    state: { data },
  } = useSalesSalesOrderDetailContext()

  const dataList = [
    DataList.createDataList('Order Type', concatString(data.order_type_id, data.doc_type_name)),
    DataList.createDataList('Customer', concatString(data.customer_id, data.customer_name)),
    DataList.createDataList('Sales Org.', concatString(data.sales_org_id, data.sales_org_name)),
    DataList.createDataList('Branch', concatString(data.branch_id, data.branch_name)),
    DataList.createDataList('Salesman', concatString(data.salesman_id, data.salesman_name)),
    DataList.createDataList('Doc. Date', dateFormat(data.doc_date)),
    DataList.createDataList('Delivery Date', dateFormat(data.delivery_date)),
    DataList.createDataList('Quotation', data.document_ref_id),
    DataList.createDataList('Reference', data.customer_ref),
    DataList.createDataList('Created On', dateFormat(data.created_at)),
    DataList.createDataList('Created By', data.created_by),
    DataList.createDataList('Modified On', dateFormat(data.modified_at)),
    DataList.createDataList('Modified By', data.modified_by),
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
          {data.status_id === '7' && (
            <DataList label={'Reason Cancel'} value={data.cancel_reason_name} />
          )}
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={ColumnsSalesOrder} dataSource={data.items} scroll={{ x: 'max-content' }} />
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
