import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'
import { Spacer, Table } from 'pink-lava-ui'
import { getCollectionDetail } from 'src/api/collection'
import { TableQuotation } from '../columns'

interface QuotationProps {}

// const DataList.createDataList = (label: string, value: string) => ({ label, value })

export default function Quotation(props: QuotationProps) {
  const table = useTable({
    funcApi: getCollectionDetail,
    haveCheckBox: { rowKey: 'status', member: ['new'] },
    columns: TableQuotation,
  })
  const {} = props
  // const table = useTable({ api: '', columns: TableQuotation })
  const dataList = [
    DataList.createDataList('Quotation', 'ZOP1'),
    DataList.createDataList('Customer', 'ZOP1'),
    DataList.createDataList('Sales Org.', 'ZOP1'),
    DataList.createDataList('Plant', 'ZOP1'),
    DataList.createDataList('Salesman', 'ZOP1'),
    DataList.createDataList('Doc. Date', 'ZOP1'),
    DataList.createDataList('Valid From', 'ZOP1'),
    DataList.createDataList('Valid To', 'ZOP1'),
    DataList.createDataList('Delivery Date', 'ZOP1'),
    DataList.createDataList('Reference', 'ZOP1'),
    DataList.createDataList('Created On', 'ZOP1'),
    DataList.createDataList('Created By', 'ZOP1'),
    DataList.createDataList('Modified On', 'ZOP1'),
    DataList.createDataList('Modified By', 'ZOP1'),
    DataList.createDataList('Created From', 'ZOP1'),
  ]

  return (
    <>
      <div style={{ overflow: 'scroll' }}>
        <Table columns={TableQuotation} dataSource={[]} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <Total label="Total Amount" value={123} />
        </Col>
      </Row>
    </>
  )
}
