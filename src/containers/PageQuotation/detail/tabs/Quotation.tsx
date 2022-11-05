import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { Spacer, Table } from 'pink-lava-ui'
import useDetail from 'src/hooks/useDetail'
import { ColumnsQuotation } from '../columns'
import dateFormat from 'src/utils/dateFormat'

interface QuotationProps {
  data: any
}

const createDataList = (label: string, value: string) => ({ label, value })

export default function Quotation(props: QuotationProps) {
  const { data } = props
  const format = 'DD MMMM YYYY'

  const dataList = [
    createDataList('Quotation', data.id),
    createDataList('Customer', data.customer_name),
    createDataList('Sales Org.', data.sales_org_id),
    createDataList('Plant', data.branch_id),
    createDataList('Salesman', data.salesman_id),
    // FIXME Doc. Date
    createDataList('Doc. Date', dateFormat(data.doc_date, format)),
    createDataList('Valid From', dateFormat(data.valid_from, format)),
    createDataList('Valid To', dateFormat(data.valid_to, format)),
    createDataList('Delivery Date', dateFormat(data.delivery_date, format)),
    createDataList('Reference', data.customer_ref),
    createDataList('Created On', dateFormat(data.created_at, format)),
    createDataList('Created By', data.created_by),
    createDataList('Modified On', dateFormat(data.modified_at, format)),
    createDataList('Modified By', data.modified_by),
    // FIXME Created From
    createDataList('Created From', data.created_from),
  ]

  if (data.items) {
    data.items.forEach((obj, index) => {
      Object.assign(obj, { no: index + 1, sub_total: obj.order_qty * obj.price })
    })
  }

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
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={ColumnsQuotation} data={data.items} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <Total label="Total Amount" value={data.total_amount} />
        </Col>
      </Row>
    </>
  )
}
