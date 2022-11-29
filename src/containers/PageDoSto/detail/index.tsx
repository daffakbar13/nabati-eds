import React from 'react'
import { Button, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Row, Col, Divider } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getPoStoDetail } from 'src/api/logistic/do-sto'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import { column } from './columns'

export default function PageDoStoDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const data: any = useDetail(getPoStoDetail, { id: router.query.id as string }, false)
  const createDataList = (label: string, value: string) => ({ label, value })
  const format = 'DD MMMM YYYY'

  const dataList = [
    //row 1
    createDataList('PO Number', data.purchase_id || '-'),
    createDataList(
      'Supplying Branch',
      `${data.supply_branch_id} - ${data.supply_branch_name || ''}`,
    ),
    createDataList(
      'Receiving Branch',
      `${data.receive_branch_id} - ${data.receive_branch_name || ''}`,
    ),

    //row 2
    createDataList('Doc Date', dateFormat(data.document_date, format)),
    createDataList('Posting Date', dateFormat(data.posting_date, format)),
    createDataList('Planned GI Date', dateFormat(data.planned_gi_date, format)),
    createDataList(
      'Header Text',
      data.header_text != '' && data.header_text != null ? data.header_text : '-',
    ),

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
            router.push('/logistic/do-sto')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
      </div>
      {/* <Card style={{ padding: '16px 20px' }}>
                Done
            </Card> */}
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
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
          <Table columns={column} data={data.items} />
        </div>
      </Card>
    </Col>
  )
}
