import React from 'react'
import { Button, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Row, Col, Divider } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getGoodReceiptIntraChannelDetail } from 'src/api/good-receipt-intra-channel/index'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import { TableIntraChannelGoodReceiptDetail } from '../columns'

export default function PageIntraChannelGoodReceiptDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const data: any = useDetail(
    getGoodReceiptIntraChannelDetail,
    { id: router.query.id as string },
    false,
  )
  const createDataList = (label: string, value: string) => ({ label, value })
  const format = 'DD MMMM YYYY'

  const dataList = [
    //row 1
    createDataList('Request Number', data.id || '-'),
    createDataList(
      'Supplying Branch',
      `${data.suppl_branch_id || ''} - ${data.suppl_branch_name || ''}`,
    ),
    createDataList(
      'Receiving Branch',
      `${data.receive_plant_id || ''} - ${data.receive_plant_name || ''}`,
    ),
    createDataList('From Channel', data.from_channel || '-'),
    createDataList('To Channel', data.to_channel || '-'),

    //row 2
    createDataList('GI Number', data.gi_number),
    createDataList('From Sloc', `${data.from_sloc || ''} - ${data.from_sloc_name || ''}`),
    createDataList('To Sloc', `${data.to_sloc || ''} - ${data.to_sloc_name || ''}`),
    createDataList('Doc Date', dateFormat(data.document_date, format)),
    createDataList('Posting Date', dateFormat(data.posting_date, format)),
    createDataList('Remarks', data.remarks != '' && data.remarks != null ? data.remarks : '-'),

    // row 3
    createDataList(
      'Created On',
      data.created_at != '' && data.created_at != null ? dateFormat(data.created_at, format) : '-',
    ),
    createDataList(
      'Created By',
      data.created_by != '' && data.created_by != null ? data.created_by : '-',
    ),
    createDataList(
      'Modified On',
      data.modified_at != '' && data.modified_at != null
        ? dateFormat(data.modified_at, format)
        : '-',
    ),
    createDataList(
      'Modified By',
      data.modified_by != '' && data.modified_by != null
        ? dateFormat(data.modified_by, format)
        : '-',
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
            router.push('/logistic/goods-receipt-intra-channel')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <Row gutter={8}>
          <Col span={8}>
            {dataList.slice(0, 5).map(({ label, value }, i) => (
              <DataList key={i} label={label} value={value} />
            ))}
          </Col>
          <Col span={8}>
            {dataList.slice(5, 11).map(({ label, value }, i) => (
              <DataList key={i} label={label} value={value} />
            ))}
          </Col>
          <Col span={8}>
            {dataList.slice(11).map(({ label, value }, i) => (
              <DataList key={i} label={label} value={value} />
            ))}
          </Col>
        </Row>
        <Divider />
        <div style={{ overflow: 'scroll' }}>
          <Table
            scroll={{ x: 'max-content', y: 600 }}
            columns={TableIntraChannelGoodReceiptDetail}
            data={data.items}
          />
        </div>
      </Card>
    </Col>
  )
}
