import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'
import { Spacer, Table } from 'pink-lava-ui'
import { getUndeliveredDetail } from 'src/api/undelivered'
import { TableQuotation } from '../columns'

interface QuotationProps {}

const createDataList = (label: string, value: string) => ({ label, value })

export default function Quotation(props: QuotationProps) {
  const table = useTable({
    funcApi: getUndeliveredDetail,
    haveCheckBox: { rowKey: 'status', member: ['new'] },
    columns: TableQuotation,
  })
  const {} = props
  // const table = useTable({ api: '', columns: TableQuotation })
  const dataList = [
    createDataList('Sales Org.', 'sales_org'),
    createDataList('Plant', 'ZOP1'),
    createDataList('Vehicle', 'ZOP1'),
    createDataList('Driver', 'ZOP1'),
    createDataList('Loading Date', 'ZOP1'),
    createDataList('GI Date', 'ZOP1'),
    createDataList('Created On', 'ZOP1'),
    createDataList('Created By', 'ZOP1'),
    createDataList('Modified On', 'ZOP1'),
    createDataList('Modified By', 'ZOP1'),
  ]

  return (
    <>
      <Row style={{ justifyContent: 'space-between' }} gutter={8}>
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
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table columns={TableQuotation} dataSource={[]} />
      </div>
    </>
  )
}
