import { Col, Row, Divider, Typography, Input } from 'antd'
import { Spacer, Table, Text, Button } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Modal } from 'src/components'
import { Popup } from 'src/components'
import { toTitleCase } from 'src/utils/caseConverter'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { STOCK_ADJUSTMENT_STATUS as S } from 'src/configs/stockAdjustment'
import dateFormat from 'src/utils/dateFormat'
import TaggedStatus from 'src/components/TaggedStatus'
import { columns } from './columns'
import { Loader } from 'src/components'
import useDetail from 'src/hooks/useDetail'
import {
  approvalStockOpname,
  freezeSlocIdByBranchId,
  getDetailStockOpname,
  updateStatusStockOpname,
} from 'src/api/logistic/stock-opname'
import { CheckCircleFilled } from '@ant-design/icons'
import { Label } from 'src/components/Text'
import DataList from 'src/components/DataList'

import moment from 'moment'

export default function DetailStockAdjustment() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const id = String(router.query.id) || ''
  const details: any = useDetail(getDetailStockOpname, { id: router.query.id as string }, false)
  const [reason, setReason] = useState('')

  // datalist
  const dataList = [
    DataList.createDataList(
      'Branch.',
      `${details?.branch_id} - ${toTitleCase(details?.branch_name)}`,
    ),
    DataList.createDataList('SLoc', `${details?.sloc_id} - ${toTitleCase(details?.sloc_name)}`),
    DataList.createDataList('Doc Date', dateFormat(details?.document_date)),
    DataList.createDataList('Header Text', details?.header_text),
    DataList.createDataList('Created On', dateFormat(details?.created_at)),
    DataList.createDataList('Created By', details?.created_by),
    DataList.createDataList('Modified On', dateFormat(details?.modified_at)),
    DataList.createDataList('Modified By', details?.modified_by),
  ]

  // Modals
  const [successReject, setSuccessReject] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const [approveModal, setApproveModal] = useState(false)

  const handleReject = async () => {
    try {
      setLoading(true)

      const payload = { status_id: '05', header_text: details?.header_text, reason: reason }
      const res = await updateStatusStockOpname(id, payload)

      setSuccessReject(true)
      setLoading(false)
      return res
    } catch (error) {
      setLoading(false)
      return false
    }
  }
  const handleApprove = async () => {
    try {
      const payload = {
        company_id: details?.company_id,
        id: details?.id,
        // posting_date: details?.posting_date,
        posting_date: moment(details?.posting_date).format('YYYY-MM-DD'),
        // document_date: details?.document_date,
        document_date: moment(details?.document_date).format('YYYY-MM-DD'),
        branch_id: details?.branch_id,
        sloc_id: details?.sloc_id,
        header_text: details?.header_text,
        items: details?.items?.length
          ? details.items.map((item) => ({
              product_id: item?.product_id,
              base_qty: item?.base_qty,
              movement_type_id: item?.movement_type_id || '',
            }))
          : [],
      }
      const res = await approvalStockOpname(id, payload)

      await freezeSlocIdByBranchId(
        {
          id: details?.sloc_id,
          is_freeze: 0,
        },
        details?.branch_id,
      )

      return res
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    if (details.company_id) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [details])

  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
        <Col>
          <div style={{ display: 'flex', gap: 5 }}>
            <GoBackArrow to={`${PATH.LOGISTIC}/approval-stock-opname`} />
            <Text variant={'h4'}>View Approval Stock Opname {`${router.query.id}`}</Text>
          </div>
          <Spacer size={20} />
          <Card style={{ overflow: 'unset', marginBottom: 9 }}>
            <div style={{ display: 'flex' }}>
              <TaggedStatus status={details.status} size="h5" />

              {details?.status_id && details?.status_id === '02' && (
                <div
                  style={{
                    display: 'grid',
                    marginLeft: 'auto',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12,
                  }}
                >
                  <Button
                    size="big"
                    variant="tertiary"
                    onClick={() => setRejectModal(true)}
                    loading={loading}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => setApproveModal(true)}
                    size="big"
                    variant="primary"
                    loading={loading}
                  >
                    Approve
                  </Button>
                </div>
              )}
            </div>
          </Card>
          <Card>
            <Row gutter={12}>
              <Col span={12}>
                {dataList.slice(0, 4).map(({ label, value }, i) => (
                  <DataList key={i} label={label} value={value} />
                ))}
              </Col>
              <Col span={10} offset={2}>
                {dataList.slice(4, 8).map(({ label, value }, i) => (
                  <DataList key={i} label={label} value={value} />
                ))}
              </Col>
            </Row>
            <Divider />
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
              <Table columns={columns} dataSource={details?.items || []} />
            </div>
          </Card>

          {rejectModal && (
            <Popup onOutsideClick={() => setRejectModal(false)}>
              <Typography.Title level={3} style={{ margin: 0 }}>
                Confirm Rejectation
              </Typography.Title>
              <Label>Reason</Label>
              <Input.TextArea
                id="inputReason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <Button
                  size="big"
                  style={{ flexGrow: 1 }}
                  variant="secondary"
                  onClick={() => setRejectModal(false)}
                >
                  No
                </Button>
                <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={handleReject}>
                  Yes
                </Button>
              </div>
            </Popup>
          )}

          {successReject && (
            <Popup>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Text
                  textAlign="center"
                  style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
                >
                  <>
                    <CheckCircleFilled /> Reject Success
                  </>
                </Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 4,
                  fontWeight: 'bold',
                  flexDirection: 'column',
                  textAlign: 'center',
                }}
              >
                <div>
                  Reff. Number :
                  <Typography.Text copyable={{ text: router.query.id as string }}>
                    {' '}
                    {router.query.id}
                  </Typography.Text>
                  has been
                </div>
                <div>successfully rejected</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Button
                  size="big"
                  style={{ flexGrow: 1 }}
                  variant="primary"
                  onClick={() => router.reload()}
                >
                  OK
                </Button>
              </div>
            </Popup>
          )}

          <Modal
            title="Confirm Approve"
            open={approveModal}
            onOk={handleApprove}
            onCancel={() => setApproveModal(false)}
            onOkSuccess={() => router.reload()}
            content="Are you sure want to approve?"
            successOkText="OK"
            successContent={(res: any) => (
              <>
                Reff. Number :
                <Typography.Text copyable={{ text: router.query.id as string }}>
                  {' '}
                  {router.query.id}
                </Typography.Text>{' '}
                has been successfully approved
              </>
            )}
          />
        </Col>
      )}
    </>
  )
}
