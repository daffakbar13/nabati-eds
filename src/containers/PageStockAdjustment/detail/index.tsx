import { Tag } from 'antd'
import { Col, Spacer, Table, Text, Button } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Modal } from 'src/components'

import moment from 'moment'
import List from 'src/components/List'
import { toTitleCase } from 'src/utils/caseConverter'

import { useRouter } from 'next/router'
import {
  getDetailStockAdjustment,
  updateStatusStockAdjustment,
} from 'src/api/logistic/stock-adjustment'
import { PATH } from 'src/configs/menus'

import { STOCK_ADJUSTMENT_STATUS as S } from 'src/configs/stockAdjustment'

import { getTagColor } from 'src/utils/getTagColor'
import { columns } from './columns'

const DATE_FORMAT = 'DD-MMM-YYYY'
export default function DetailStockAdjustment() {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(null)
  const router = useRouter()
  const id = String(router.query.id) || ''

  // Modals
  const [rejectModal, setRejectModal] = useState(false)
  const [approveModal, setApproveModal] = useState(false)

  const handleReject = async () => {
    try {
      const payload = { status_id: S.rejected }
      const res = await updateStatusStockAdjustment(id, payload)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  const handleApprove = async () => {
    try {
      const payload = { status_id: S.approved }
      const res = await updateStatusStockAdjustment(id, payload)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }

  useEffect(() => {
    if (!id) return
    console.log('id useEffect', id)
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getDetailStockAdjustment(id)
        setDetails(res.data || [])
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }
    fetchData()
  }, [id])

  return (
    <Col>
      <div style={{ display: 'flex', gap: 5 }}>
        <GoBackArrow to={`${PATH.LOGISTIC}/stock-adjustment`} />
        <Text variant={'h4'}>View Stock Adjustment {`${router.query.id}`}</Text>
      </div>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset', marginBottom: 9 }}>
        <div style={{ display: 'flex' }}>
          <Tag
            style={{
              width: 200,
              padding: '8px 20px',
              border: '1px solid #AAAAAA',
              borderRadius: 8,
            }}
            color={getTagColor(details?.status)}
          >
            {<p style={{ marginTop: 4 }}>{details?.status}</p> || (
              <p style={{ color: 'black' }}>Status...</p>
            )}
          </Tag>

          {details?.status && details?.status === 'Pending' && (
            <div
              style={{
                display: 'grid',
                marginLeft: 'auto',
                gridTemplateColumns: '1fr 1fr 1fr',
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
              <Button size="big" variant="secondary" onClick={() => {}} loading={loading}>
                Edit
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
        <List loading={loading}>
          <List.Item
            label="Movement Type"
            value={`${details?.movement_type_id}-${toTitleCase(details?.movement_type_name)}`}
          />
          <List.Item
            label="Branch"
            value={`${details?.branch_id}-${toTitleCase(details?.branch_name)}`}
          />
          <List.Item
            label="SLoc"
            value={`${details?.from_sloc}-${toTitleCase(details?.from_sloc_name)}`}
          />
          <List.Item label="" value={''} />

          <List.Item label="Doc Date" value={moment(details?.document_date).format(DATE_FORMAT)} />
          <List.Item
            label="Posting Date"
            value={moment(details?.posting_date).format(DATE_FORMAT)}
          />
          <List.Item label="Header Text" value={details?.header_text} />
          <List.Item label="" value={''} />

          <List.Item label="Created On" value={moment(details?.created_at).format(DATE_FORMAT)} />
          <List.Item label="Created By" value={details?.created_by} />
          <List.Item label="Modified On" value={details?.modified_at} />
          <List.Item label="Modified By" value={details?.modified_by} />
        </List>
        <div style={{ borderTop: '1px solid #AAAAAA', margin: '32px auto 0' }} />
        <div style={{ overflow: 'scroll', marginTop: 16 }}>
          <Table columns={columns} dataSource={details?.items || []} />
        </div>
      </Card>

      <Modal
        title="Confirm Reject"
        open={rejectModal}
        onOk={handleReject}
        onCancel={() => setRejectModal(false)}
        onOkSuccess={(res) => router.reload()}
        content="Are you sure want to reject?"
        successContent={(res: any) => 'Reject Success'}
        successOkText="OK"
      />

      <Modal
        title="Confirm Approve"
        open={approveModal}
        onOk={handleApprove}
        onCancel={() => setApproveModal(false)}
        onOkSuccess={(res) => router.reload()}
        content="Are you sure want to approve?"
        successContent={(res: any) => 'Approve Success'}
        successOkText="OK"
      />
    </Col>
  )
}
