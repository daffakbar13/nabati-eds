import { useState, useEffect } from 'react'
import { Button, Spacer, Text, Table, Row } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Col, Divider, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getPoStoDetail, updateStatusPoSto } from 'src/api/logistic/po-sto'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import TaggedStatus from 'src/components/TaggedStatus'
import { Loader, Modal } from 'src/components'
import { PATH } from 'src/configs/menus'
import { columns, columnsMT } from './column'

export default function PageApprovalDetail() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const data: any = useDetail(getPoStoDetail, { id: router.query.id as string }, false)
  const createDataList = (label: string, value: string) => ({ label, value })
  const [modalApprove, setModalApprove] = useState(false)
  const [modalReject, setModalReject] = useState(false)
  const [statusChange, setStatusChange] = useState('')

  const changedStatus = async () => {
    try {
      return await updateStatusPoSto({ id: data.id, status_id: statusChange })
    } catch (error) {
      return false
    }
  }

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

  useEffect(() => {
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
                router.push('/logistic/approval')
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 25 }} />
            </div>
            <Text variant={'h4'}>View Approval PO STO - {router.query.id}</Text>
          </div>
          <Spacer size={20} />
          <Card style={{ overflow: 'unset' }}>
            {data.status === 'Rejected' || data.status === 'Approved' ? (
              <Text variant={'h5'}>
                <TaggedStatus status={data.status} size="h5" />
              </Text>
            ) : (
              ''
            )}
            <Row justifyContent="space-between" reverse>
              {data.status === 'Wait For Approval' && (
                <>
                  <Row gap="16px">
                    <Button
                      size="big"
                      variant="tertiary"
                      onClick={() => {
                        setModalReject(true)
                        setStatusChange('02')
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      size="big"
                      variant="primary"
                      onClick={() => {
                        setModalApprove(true)
                        setStatusChange('01')
                      }}
                    >
                      Approve
                    </Button>
                  </Row>
                  <Text variant={'h5'}>
                    <TaggedStatus status={data.status} size="h5" />
                  </Text>
                </>
              )}
            </Row>
          </Card>
          <Spacer size={20} />
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
              {data.channel_type === 'MT' ? (
                <Table
                  scroll={{ x: 'max-content', y: 600 }}
                  columns={columnsMT}
                  data={data.items}
                />
              ) : (
                <Table scroll={{ x: 'max-content', y: 600 }} columns={columns} data={data.items} />
              )}
            </div>
          </Card>
          <Modal
            title={'Confirm Approve'}
            open={modalApprove}
            onOk={changedStatus}
            onCancel={() => {
              setModalApprove(false)
            }}
            content={'Are you sure want to Approve This PO STO ?'}
            successTitle="Success"
            onOkSuccess={() => {
              router.push(`${PATH.LOGISTIC}/approval`)
            }}
            successContent={(res: any) => (
              <p>
                PO Number
                <Typography.Text copyable={{ text: data?.id as string }}>
                  {' '}
                  {data?.id}
                </Typography.Text>{' '}
                has been successfully Approved
              </p>
            )}
            successOkText="OK"
            width={432}
          />
          <Modal
            title={'Confirm Reject'}
            open={modalReject}
            onOk={changedStatus}
            onCancel={() => {
              setModalReject(false)
            }}
            content={'Are you sure want to Reject This PO STO ?'}
            successTitle="Success"
            onOkSuccess={() => {
              router.push(`${PATH.LOGISTIC}/approval`)
            }}
            successContent={(res: any) => (
              <p>
                PO Number
                <Typography.Text copyable={{ text: data.id as string }}>
                  {' '}
                  {data.id}
                </Typography.Text>{' '}
                has been successfully Rejected
              </p>
            )}
            successOkText="OK"
            width={432}
          />
        </Col>
      )}
    </>
  )
}
