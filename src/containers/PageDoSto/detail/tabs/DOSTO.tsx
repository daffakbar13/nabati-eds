import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import dateFormat from 'src/utils/dateFormat'
import { Table } from 'pink-lava-ui'
import { column, columnMT } from '../columns'

interface BillingProps {
  data: any
}

export default function DOSTO(props: BillingProps) {
  const { data } = props
  const createDataList = (label: string, value: string) => ({ label, value })
  const dataList = [
    // row 1
    createDataList('PO Number', data.purchase_id || '-'),
    createDataList(
      'Supplying Branch',
      `${data.supply_branch_id} - ${data.supply_branch_name || ''}`,
    ),
    createDataList(
      'Receiving Branch',
      `${data.receive_branch_id} - ${data.receive_branch_name || ''}`,
    ),

    // row 2
    createDataList('Doc Date', dateFormat(data.document_date)),
    createDataList('Posting Date', dateFormat(data.posting_date)),
    createDataList('Planned GI Date', dateFormat(data.planned_gi_date)),
    createDataList(
      'Header Text',
      data.header_text !== '' && data.header_text !== null ? data.header_text : '-',
    ),

    // row 3
    createDataList(
      'Created On',
      data.created_at !== '' && data.created_at !== null ? dateFormat(data.created_at) : '-',
    ),
    createDataList(
      'Created By',
      data.created_by !== '' && data.created_by !== null ? data.created_by : '-',
    ),
    createDataList(
      'Modified On',
      data.modified_at !== '' && data.modified_at !== null ? dateFormat(data.modified_at) : '-',
    ),
    createDataList(
      'Modified By',
      data.modified_by !== '' && data.modified_by !== null ? dateFormat(data.modified_by) : '-',
    ),
  ]

  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          {dataList.slice(0, 3).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(3, 7).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(7).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
      </Row>
      <Divider />
      <div style={{ overflow: 'scroll' }}>
        <Table
          scroll={{ x: 'max-content', y: 600 }}
          columns={data?.channel_type === 'MT' ? columnMT : column}
          data={data.items}
        />
      </div>
    </>
  )
}
