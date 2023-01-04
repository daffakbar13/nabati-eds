import React from 'react'
import { Button, Spacer, Text, Table, Row } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Col, Divider, Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getDetailRequestIntraSloc } from 'src/api/logistic/request-intra-sloc'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import { column } from './columns'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'

export default function PageIntraSlocRequestDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const data: any = useDetail(getDetailRequestIntraSloc, { id: router.query.id as string }, false)
  const createDataList = (label: string, value: string) => ({ label, value })
  const format = 'DD MMMM YYYY'
  const [approve, setApprove] = React.useState(false)
  const [reject, setReject] = React.useState(false)

  const changedStatus = (status: string) => {
    // ChangeStatus({ id: data.id, status_id: status })
    if (status == '02') {
      router.push(`${PATH.LOGISTIC}/request-intra-channel`)
    }
  }

  const dataList = [
    //row 1
    createDataList('Request Number', data.id),
    createDataList('Branch', `${data.suppl_branch_id} - ${data.supply_branch_name}`),
    createDataList('From Sloc', `${data.suppl_sloc_id} - ${data.suppl_sloc_name}`),
    createDataList('To Sloc', `${data.receive_sloc_id} - ${data.receive_sloc_name}`),

    //row 2
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
            router.push('/logistic/request-intra-sloc')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
      </div>
      <Card style={{ overflow: 'unset' }}>
        {data.status == 'Canceled' || data.status == 'Done' ? (
          <Text variant={'h5'}>
            <TaggedStatus status={data.status} size="h5" />
          </Text>
        ) : (
          ''
        )}
        <Row justifyContent="space-between" reverse>
          {(() => {
            if (data.status == 'Pending') {
              return (
                <>
                  <Row gap="16px">
                    <Button
                      size="big"
                      variant="tertiary"
                      onClick={() => {
                        setReject(true)
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      size="big"
                      variant="primary"
                      onClick={() => {
                        setApprove(true)
                        changedStatus('01')
                      }}
                    >
                      Approve
                    </Button>
                  </Row>
                  <Text variant={'h5'}>
                    <TaggedStatus status={data.status} size="h5" />
                  </Text>
                </>
              )
            } else if (data.status == 'Canceled') {
              return <></>
            }
          })()}
        </Row>
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
        <div style={{ overflow: 'scroll' }}>
          <Table scroll={{ x: 'max-content', y: 600 }} columns={column} data={data.items} />
        </div>
      </Card>

      {(reject || approve) && (
        <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text variant="headingSmall" textAlign="center">
              {reject ? 'Confirm Cancellation' : 'Success'}
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {reject ? (
              `Are you sure want to Reject Request Intra Channel <strong>${data.id}</strong>?`
            ) : (
              <>
                Request Number
                <Typography.Text copyable={{ text: data.id as string }}> {data.id}</Typography.Text>
                has been
              </>
            )}
          </div>
          {approve && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>successfully approved</div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {reject && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    setReject(false)
                  }}
                >
                  No
                </Button>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    changedStatus('02')
                  }}
                >
                  Yes
                </Button>
              </>
            )}
            {approve && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    router.push(`${PATH.LOGISTIC}/request-intra-channel`)
                  }}
                >
                  Ok
                </Button>
              </>
            )}
          </div>
        </Popup>
      )}
    </Col>
  )
}
