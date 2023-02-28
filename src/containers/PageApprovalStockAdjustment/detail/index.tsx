import { Tag, Divider, Typography, Input } from 'antd'
import { Col, Spacer, Table, Text, Button } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Modal, Popup } from 'src/components'
import List from 'src/components/List'
import { toTitleCase } from 'src/utils/caseConverter'
import { useRouter } from 'next/router'
import {
  freezeSlocIdByBranchId,
  getDetailStockAdjustment,
  updateStatusStockAdjustment,
} from 'src/api/logistic/stock-adjustment'
import { PATH } from 'src/configs/menus'
import dateFormat from 'src/utils/dateFormat'
import TaggedStatus from 'src/components/TaggedStatus'
import { columns } from './columns'
import { Loader } from 'src/components'
import useDetail from 'src/hooks/useDetail'
import { Label } from 'src/components/Text'
import { CheckCircleFilled } from '@ant-design/icons'

export default function DetailStockAdjustment() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const id = String(router.query.id) || ''

  // Modals
  const [successReject, setSuccessReject] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const [approveModal, setApproveModal] = useState(false)
  const [reason, setReason] = useState('')

  const handleReject = async () => {
    try {
      setLoading(true)

      const payload = { status_id: '05', header_text: details?.header_text, reason: reason }
      const res = await updateStatusStockAdjustment(id, payload)

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
      const payload = { status_id: '03', header_text: details?.header_text, reason: '' }
      const res = await updateStatusStockAdjustment(id, payload)

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

  const details: any = useDetail(getDetailStockAdjustment, { id: router.query.id as string }, false)

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
            <GoBackArrow to={`${PATH.LOGISTIC}/approval-stock-adjustment`} />
            <Text variant={'h4'}>View Stock Adjustment {`${router.query.id}`}</Text>
          </div>
          <Spacer size={20} />
          <Card style={{ overflow: 'unset', marginBottom: 9 }}>
            <div style={{ display: 'flex' }}>
              <TaggedStatus
                status={
                  details.status === 'Wait Approval Adjust' ? 'Wait For Approval' : details.status
                }
                size="h5"
              />
              {details?.status && details?.status === 'Wait Approval Adjust' && (
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
                  {/* <Button
                    size="big"
                    variant="secondary"
                    onClick={() => {
                      router.push(`${PATH.LOGISTIC}/stock-adjustment/edit/${router.query.id}`)
                    }}
                    loading={loading}
                  >
                    Edit
                  </Button> */}
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
            <List loading={loading}>
              {/* <List.Item
                label="Movement Type"
                value={`${details?.movement_type_id}-${toTitleCase(details?.movement_type_name)}`}
              /> */}
              <List.Item
                label="Branch"
                value={`${details?.branch_id}-${toTitleCase(details?.branch_name)}`}
              />
              <List.Item
                label="SLoc"
                value={`${details?.sloc_id}-${toTitleCase(details?.sloc_name)}`}
              />
              <List.Item label="" value={''} />

              <List.Item label="Doc Date" value={dateFormat(details?.document_date)} />
              <List.Item label="Posting Date" value={dateFormat(details?.posting_date)} />
              <List.Item label="Header Text" value={details?.header_text} />
              <List.Item label="" value={''} />

              <List.Item label="Created On" value={dateFormat(details?.created_at)} />
              <List.Item label="Created By" value={details?.created_by} />
              <List.Item label="Modified On" value={dateFormat(details?.modified_at)} />
              <List.Item label="Modified By" value={details?.modified_by} />
            </List>
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
                  Stock Adjustment ID :
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
                Stock Adjustment ID :
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
