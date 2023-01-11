import React from 'react'
import { Spacer, Text, Table, Row } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Col, Divider } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getPoStoDetail } from 'src/api/logistic/po-sto'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import TaggedStatus from 'src/components/TaggedStatus'
import { columns } from './column'
import { Loader } from 'src/components'

export default function PagePoSToDetail() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const data: any = useDetail(getPoStoDetail, { id: router.query.id as string }, false)
  const createDataList = (label: string, value: string) => ({ label, value })

  const dataList = [
    // row 1
    createDataList(
      'Receiving Branch',
      `${data.receive_plant_id || ''} - ${data.receive_plant_name || ''}`,
    ),
    createDataList(
      'Supplying Branch',
      `${data.suppl_branch_id || ''} - ${data.suppl_branch_name || ''}`,
    ),

    // row 2
    createDataList('Doc Date', dateFormat(data.document_date)),
    createDataList('Posting Date', dateFormat(data.posting_date)),
    createDataList('Remarks', data.remarks !== '' && data.remarks !== null ? data.remarks : '-'),

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
    if (data.receive_plant_id) {
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
                router.push('/logistic/po-sto')
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 25 }} />
            </div>
            <Text variant={'h4'}>View PO STO - {router.query.id}</Text>
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
                {dataList.slice(0, 2).map(({ label, value }, i) => (
                  <DataList key={i} label={label} value={value} />
                ))}
              </Col>
              <Col span={8}>
                {dataList.slice(2, 5).map(({ label, value }, i) => (
                  <DataList key={i} label={label} value={value} />
                ))}
              </Col>
              <Col span={8}>
                {dataList.slice(5).map(({ label, value }, i) => (
                  <DataList key={i} label={label} value={value} />
                ))}
              </Col>
            </Row>
            <Divider />
            <div style={{ overflow: 'scroll' }}>
              <Table scroll={{ x: 'max-content', y: 600 }} columns={columns} data={data.items} />
            </div>
          </Card>
        </Col>
      )}
    </>
  )
}
