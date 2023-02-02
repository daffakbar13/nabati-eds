import React from 'react'
import { Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Row, Col, Divider } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getGoodIssueDetailStoDelivery } from 'src/api/logistic/good-issue-intra-branch'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import TaggedStatus from 'src/components/TaggedStatus'
import { Loader } from 'src/components'
import { column } from './columns'

export default function PageIntraChannelGoodIssueDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const data: any = useDetail(
    getGoodIssueDetailStoDelivery,
    {
      id: router.query.id as string,
      requestNumber: router.query.request_number as string,
      doc_type: 'WL' as string,
    },
    false,
  )
  const createDataList = (label: string, value: string) => ({ label, value })
  const [loading, setLoading] = React.useState(true)

  const dataList = [
    // row 1
    createDataList('Request Number', data.do_number || '-'),
    createDataList('Supplying Branch', `${data.supply_branch_id} - ${data.supply_branch_name || ''}`),
    createDataList(
      'Receiving Branch',
      `${data.receive_branch_id} - ${data.receive_branch_name || ''}`,
    ),
    createDataList('Remarks', data.remarks !== '' && data.remarks !== null ? data.remarks : '-'),

    // row 2
    createDataList('GI Number', data.gi_number || '-'),
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

  React.useEffect(() => {
    if (data.po_number) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [data])

  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
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
                router.push('/logistic/good-issue')
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 25 }} />
            </div>
            <Text variant={'h4'}>{titlePage}</Text>
          </div>
          <Card style={{ overflow: 'unset' }}>
            <Text variant={'h5'}>
              <TaggedStatus status={data.status} size="h5" />
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
                {dataList.slice(4, 7).map(({ label, value }, i) => (
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
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
              <Table scroll={{ x: 'max-content', y: 600 }} columns={column} data={data.items} />
            </div>
          </Card>
        </Col>
      )}
    </>
  )
}
