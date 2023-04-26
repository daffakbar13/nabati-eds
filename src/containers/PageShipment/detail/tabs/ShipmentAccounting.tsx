import { Col, Row, Divider } from 'antd'
import moment from 'moment'
import React from 'react'
import DataList from 'src/components/DataList'
import { Spacer, Table } from 'pink-lava-ui'
import { TableShipmentAccounting } from '../columns'
import { concatString } from 'src/utils/concatString'

interface AccountingProps {
  data: any
}

// const DataList.createDataList = (label: string, value: string) => ({ label, value })

export default function ShipmentAccounting(props: AccountingProps) {
  const { data } = props
  const company_code = data?.customer_info?.customer_sales_data

  const dataList = [
    DataList.createDataList('Document Number', data.do_number),
    DataList.createDataList('Document Date', moment(data.doc_date).format('DD MMMM YYYY')),
    DataList.createDataList('Posting Date.', moment(data.billing_date).format('DD MMMM YYYY')),
    DataList.createDataList('References', data.reference ? data.reference : ' - '),
    DataList.createDataList('Header', data.header ? data.header : ' - '),
    DataList.createDataList('Document Type', data.billing_type_id),
    DataList.createDataList(
      'Company Code',
      company_code ? concatString(company_code.company_id, company_code.company_name) : '-',
    ),
    DataList.createDataList('Currency', data.currency_id),
    DataList.createDataList('Exchange Rate', moment(data.pricing_date).format('DD MMMM YYYY')),
  ]

  return (
    <>
      <Row gutter={8}>
        <Col span={12}>
          {dataList.slice(0, 5).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={12}>
          {dataList.slice(5, 10).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table
          scroll={{ x: 'max-content' }}
          columns={TableShipmentAccounting}
          data={data.billing_item}
        />
      </div>
      <Spacer size={30} />
    </>
  )
}
