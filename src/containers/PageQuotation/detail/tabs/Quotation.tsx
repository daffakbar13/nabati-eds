import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { Spacer, Table } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'
import { ColumnsQuotation } from '../columns'

interface QuotationProps {
  data: any
}

const createDataList = (label: string, value: string) => ({ label, value })

export default function Quotation(props: QuotationProps) {
  const { data } = props
  const format = 'DD MMMM YYYY'
  const concatString = (str: string[]) => (str.join(' - '))

  const dataList = [
    createDataList('Quotation', data.id),
    createDataList('Customer', concatString([data.customer_id, data.customer_name])),
    createDataList('Sales Org.', concatString([data.sales_org_id, data.sales_org_name])),
    createDataList('Branch', concatString([data.branch_id, data.branch_name])),
    createDataList('Salesman', concatString([data.salesman_id, data.salesman_name])),
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

  const arrSubTotal = data.items?.map(({ price }) => price)

  let totalAmount = 0
  arrSubTotal?.forEach((element) => {
    totalAmount += element
  });

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
          <Total label="Total Amount" value={totalAmount.toLocaleString()} />
        </Col>
      </Row>
    </>
  )
}
