import React from 'react'
import { Text, Table, Spacer } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Row, Col, Divider } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import TaggedStatus from 'src/components/TaggedStatus'
import { column } from './columns'

export default function Detail(props: any) {
  const router = useRouter()
  const titlePage = useTitlePage('detail')
  const createDataList = (label: string, value: string) => ({ label, value })
  const data = props?.data

  const dataList = [
    createDataList(
      'Supplying Branch',
      `${data.supply_branch_id || ''} - ${data.supply_branch_name || ''}`,
    ),
    createDataList(
      'Receiving Branch',
      `${data.receive_branch_id || ''} - ${data.receive_branch_name || ''}`,
    ),
    createDataList('Remarks', data.remarks !== '' && data.remarks !== null ? data.remarks : '-'),

    // row 2
    createDataList('Doc Date', dateFormat(data.document_date)),
    createDataList('Posting Date', dateFormat(data.posting_date)),

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
    <Col>
      <div style={{ display: 'flex', gap: 5 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push('/logistic/good-receipt-intra-branch')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
      </div>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Text variant={'h5'}>
          <TaggedStatus status={data.status} size="h5" />
        </Text>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <Row gutter={8}>
          <Col span={8}>
            {dataList.slice(0, 3).map(({ label, value }, i) => (
              <DataList key={i} label={label} value={value} />
            ))}
          </Col>
          <Col span={8}>
            {dataList.slice(3, 5).map(({ label, value }, i) => (
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
          <Table scroll={{ x: 'max-content', y: 600 }} columns={column} data={data.items} />
        </div>
      </Card>
    </Col>
  )
}
