import { useState, useEffect } from 'react'
import { Button, Spacer, Text, Table, Row } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Col, Divider, Typography, Input } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import {
  getListStockReservationDetail,
  updateStatusCancell,
} from 'src/api/logistic/stock-reservation'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'
import { Loader, Modal } from 'src/components'
import { column } from './columns'

export default function PageStockReservationDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const data: any = useDetail(
    getListStockReservationDetail,
    { id: router.query.id as string },
    false,
  )
  const createDataList = (label: string, value: string) => ({ label, value })
  const [approve] = useState(false)
  const [reject, setReject] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reasonCancell, setReasonCancell] = useState('')
  const [modalreject, setModalReject] = useState(false)
  const [modalConfirmReject, setModalConfirmReject] = useState(false)
  const [modalConfrimSubmit, setModalConfrimSubmit] = useState(false)

  const dataList = [
    // row 1
    createDataList('Movement Type', `${data.movement_type_id} - ${data.movement_type_name}`),
    createDataList('Branch', `${data.branch_id} - ${data.branch_name}`),
    createDataList('Supplying Sloc', `${data.supplying_sloc_id} - ${data.supplying_sloc_name}`),
    createDataList('Receiving Sloc', `${data.receiving_sloc_id} - ${data.receiving_sloc_name}`),

    // row 2
    createDataList('Requirement Date', dateFormat(data.requirement_date)),
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

  useEffect(() => {
    if (data.movement_type_id) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [data])

  const content = (
    <>
      <Text variant="headingSmall" textAlign="center" style={{ fontSize: 16, fontWeight: 'bold' }}>
        Reason<span style={{ color: 'red' }}>*</span>
      </Text>
      <Input.TextArea
        id="inputReason"
        style={{
          border: '1px solid #AAAAAA',
          borderRadius: 8,
          height: 150,
          display: 'flex',
          alignItems: 'center',
        }}
        onChange={(e: any) => {
          setReasonCancell(e.target.value)
        }}
      />
    </>
  )

  const onOkCancellation = async () => {
    try {
      return await updateStatusCancell(router.query.id as string, {
        status_id: '02',
        reason: reasonCancell,
      })
    } catch (error) {
      return false
    }
  }

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
                router.push('/logistic/stock-reservation')
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 25 }} />
            </div>
            <Text variant={'h4'}>{titlePage}</Text>
          </div>
          <Card style={{ overflow: 'unset' }}>
            {data.status_id !== '00' ? (
              <Text variant={'h5'}>
                <TaggedStatus status={data.status_name} size="h5" />
              </Text>
            ) : (
              ''
            )}
            <Row justifyContent="space-between" reverse>
              {data.status_id === '00' && (
                <>
                  <Row gap="16px">
                    <Button
                      size="big"
                      variant="tertiary"
                      onClick={() => {
                        setModalReject(true)
                      }}
                    >
                      Cancel Process
                    </Button>
                  </Row>
                  <Text variant={'h5'}>
                    <TaggedStatus status={data.status_name} size="h5" />
                  </Text>
                </>
              )}
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
              <Table scroll={{ x: 'max-content', y: 600 }} columns={column} data={data.item} />
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
                  `Are you sure want to Reject Request Intra Channel ${data.material_document_id}?`
                ) : (
                  <>
                    Request Number
                    <Typography.Text copyable={{ text: data.id as string }}>
                      {' '}
                      {data.id}
                    </Typography.Text>
                    has been
                  </>
                )}
              </div>
              {approve && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  successfully approved
                </div>
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
                    <Button style={{ flexGrow: 1 }} size="big" variant="primary">
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
                        router.push(`${PATH.LOGISTIC}/stock-reservation`)
                      }}
                    >
                      Ok
                    </Button>
                  </>
                )}
              </div>
            </Popup>
          )}

          <Modal
            title={'Confirm Cancellation'}
            open={modalreject}
            onOk={() => {
              setModalConfrimSubmit(true)
            }}
            onCancel={() => {
              if (reasonCancell !== '') {
                setModalConfirmReject(true)
              } else {
                setModalReject(false)
              }
            }}
            content={content}
            loading={loading}
            cancelText="No"
            okText="Yes"
          />
          <Modal
            title={'Confirm Cancellation'}
            open={modalConfirmReject}
            onOk={() => {
              setModalReject(false)
              setModalConfirmReject(false)
              setReasonCancell('')
            }}
            onCancel={() => {
              setModalConfirmReject(false)
            }}
            content={'Are you sure want to cancel? Change you made so far will not saved'}
            loading={loading}
            width={432}
          />
          <Modal
            title={'Confirm Cancellation'}
            open={modalConfrimSubmit}
            onOk={onOkCancellation}
            onCancel={() => {
              setModalConfrimSubmit(false)
            }}
            content="Are you sure want to cancel this stock reservation?"
            loading={loading}
            onOkSuccess={() => {
              setModalReject(false)
              setModalConfirmReject(false)
              router.push(`${PATH.LOGISTIC}/stock-reservation/detail/${router.query.id}`)
            }}
            successContent={(res: any) => 'Stock Reservation has been successfully Cancelled'}
            successOkText="OK"
            width={432}
          />
        </Col>
      )}
    </>
  )
}
