import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { Spacer, Table } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'
import { concatString } from 'src/utils/concatString'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { ColumnsQuotation } from '../../columns'

export default function Quotation() {
  const {
    state: { data },
  } = useSalesQuotationDetailContext()

  const dataList = [
    DataList.createDataList('Quotation Type', concatString(data.order_type_id, data.doc_type_name)),
    DataList.createDataList('Customer', concatString(data.customer_id, data.customer_name)),
    DataList.createDataList('Sales Org.', concatString(data.sales_org_id, data.sales_org_name)),
    DataList.createDataList('Branch', concatString(data.branch_id, data.branch_name)),
    DataList.createDataList('Salesman', concatString(data.salesman_id, data.salesman_name)),
    DataList.createDataList('Doc. Date', dateFormat(data.doc_date)),
    DataList.createDataList('Valid From', dateFormat(data.valid_from)),
    DataList.createDataList('Valid To', dateFormat(data.valid_to)),
    DataList.createDataList('Delivery Date', dateFormat(data.delivery_date)),
    DataList.createDataList('Reference', data.customer_ref),
    DataList.createDataList('Created On', dateFormat(data.created_at)),
    DataList.createDataList('Created By', data.created_by),
    DataList.createDataList('Modified On', dateFormat(data.modified_at)),
    DataList.createDataList('Modified By', data.modified_by),
    DataList.createDataList('Created From', data.created_from),
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
          {dataList.slice(5, 10).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(10).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
          {data.status_id === '5' && (
            <DataList label={'Reason Cancel'} value={data.cancel_reason_name} />
          )}
        </Col>
      </Row>
      <Divider />
      {/* <Row style={{ overflow: 'scroll' }}> */}
      <Table columns={ColumnsQuotation} data={data.items} scroll={{ x: 'max-content' }} />
      {/* </Row> */}
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <Total label="Total Amount" value={data.total_amount.toLocaleString()} />
        </Col>
      </Row>
    </>
  )
}
