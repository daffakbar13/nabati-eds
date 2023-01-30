import React from 'react'
import { Spacer, Text, Table, Row } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Col, Divider } from 'antd'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import TaggedStatus from 'src/components/TaggedStatus'
import { column } from './columns'

interface propsDetail {
  data: any
}

export default function TransferToGSDetail(props: propsDetail) {
  const createDataList = (label: string, value: string) => ({ label, value })

  const dataList = [
    // row 1
    createDataList('Ref. Doc. Number', props.data.ref_doc_number),
    createDataList(
      'Movement Type',
      `${props.data.movement_type_id} - ${props.data.movement_type_name}`,
    ),
    createDataList('Branch', `${props.data.branch_id} - ${props.data.branch_name}`),
    createDataList(
      'Supplying Sloc',
      `${props.data.supplaying_sloc_id} - ${props.data.supplaying_sloc_name}`,
    ),
    createDataList(
      'Receiving Sloc',
      `${props.data.receiving_sloc_id} - ${props.data.receiving_sloc_name}`,
    ),

    // row 2
    createDataList('Document Date', dateFormat(props.data.document_date)),
    createDataList('Posting Date', dateFormat(props.data.posting_date)),
    createDataList(
      'Header Text',
      props.data.header_text !== '' && props.data.header_text !== null
        ? props.data.header_text
        : '-',
    ),

    // row 3
    createDataList(
      'Created On',
      props.data.created_at !== '' && props.data.created_at !== null
        ? dateFormat(props.data.created_at)
        : '-',
    ),
    createDataList(
      'Created By',
      props.data.created_by !== '' && props.data.created_by !== null ? props.data.created_by : '-',
    ),
    createDataList(
      'Modified On',
      props.data.modified_at !== '' && props.data.modified_at !== null
        ? dateFormat(props.data.modified_at)
        : '-',
    ),
    createDataList(
      'Modified By',
      props.data.modified_by !== '' && props.data.modified_by !== null
        ? dateFormat(props.data.modified_by)
        : '-',
    ),
  ]

  return (
    <>
      <Card style={{ overflow: 'unset' }}>
        <Text variant={'h5'}>
          <TaggedStatus status={props.data.status_name} size="h5" />
        </Text>
      </Card>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <Row gutter={8}>
          <Col span={8}>
            {dataList.slice(0, 4).map(({ label, value }, i) => (
              <DataList key={i} label={label} value={value} />
            ))}
          </Col>
          <Col span={8}>
            {dataList.slice(4, 6).map(({ label, value }, i) => (
              <DataList key={i} label={label} value={value} />
            ))}
          </Col>
          <Col span={8}>
            {dataList.slice(6).map(({ label, value }, i) => (
              <DataList key={i} label={label} value={value} />
            ))}
          </Col>
        </Row>
        <Divider />
        <div style={{ overflow: 'scroll' }}>
          <Table scroll={{ x: 'max-content', y: 600 }} columns={column} data={props.data.item} />
        </div>
      </Card>
    </>
  )
}
