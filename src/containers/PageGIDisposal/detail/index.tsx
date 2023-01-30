import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col } from 'antd'
import { Button, Spacer, Table, Text } from 'pink-lava-ui'
import { Card, GoBackArrow, Modal, Loader } from 'src/components'
import dateFormat from 'src/utils/dateFormat'
import List from 'src/components/List'
import { getDetailBadStock, updateStatusBadStock } from 'src/api/logistic/bad-stock'
import { PATH } from 'src/configs/menus'
import { toTitleCase } from 'src/utils/caseConverter'
import { columns } from './columns'
import TaggedStatus from 'src/components/TaggedStatus'

export default function PageQuotationDetail() {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(null)
  const router = useRouter()
  const id = String(router.query.id) || ''

  // Modals
  const [rejectModal, setRejectModal] = useState(false)
  const [approveModal, setApproveModal] = useState(false)

  const updateStatus = async (statusId: string) => {
    try {
      const payload = { status_id: statusId }
      const res = await updateStatusBadStock(id, payload)
      return res
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getDetailBadStock({ id })
        setDetails(res.data || [])
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
        <Col>
          <div style={{ display: 'flex', gap: 5 }}>
            <GoBackArrow to={`${PATH.LOGISTIC}/gi-disposal`} />
            <Text variant={'h4'}>View BS Reservation {`${router.query.id}`}</Text>
          </div>
          <Spacer size={20} />
          <Card style={{ overflow: 'unset', marginBottom: 9 }}>
            <div style={{ display: 'flex' }}>
              <TaggedStatus status={details?.status_name} size="h5" />

              {details?.status_id && details?.status_id === '00' && (
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
            <List loading={loading}>
              <List.Item
                label="Reservation Number"
                value={`${details?.movement_type_id}-${toTitleCase(details?.movement_type_name)}`}
              />
              <List.Item
                label="Movement Type"
                value={`${details?.branch_id}-${toTitleCase(details?.branch_name)}`}
              />
              <List.Item
                label="Branch"
                value={`${details?.branch_id}-${toTitleCase(details?.branch_name)}`}
              />
              <List.Item
                label="SLoc"
                value={`${details?.sloc_id}-${toTitleCase(details?.sloc_name)}`}
              />

              <List.Item label="Requirement Date" value={dateFormat(details?.document_date)} />
              <List.Item label="Header Text" value={details?.header_text} />
              <List.Item label="" value={''} />
              <List.Item label="" value={''} />

              <List.Item label="Created On" value={dateFormat(details?.created_at)} />
              <List.Item label="Created By" value={details?.created_by} />
              <List.Item label="Modified On" value={dateFormat(details?.modified_at)} />
              <List.Item label="Modified By" value={details?.modified_by} />
            </List>
            <div style={{ borderTop: '1px solid #AAAAAA', margin: '32px auto 0' }} />
            <div style={{ overflow: 'scroll', marginTop: 16 }}>
              <Table columns={columns} dataSource={details?.item || []} />
            </div>
          </Card>

          <Modal
            title="Confirm Reject"
            open={rejectModal}
            onOk={() => updateStatus('02')}
            onCancel={() => setRejectModal(false)}
            onOkSuccess={(res) =>
              router.push(`${PATH.LOGISTIC}/gi-disposal/detail/${router.query.id}`)
            }
            content="Are you sure want to reject?"
            successContent={(res: any) => 'Reject Success'}
            successOkText="OK"
          />

          <Modal
            title="Confirm Approve"
            open={approveModal}
            onOk={() => updateStatus('01')}
            onCancel={() => setApproveModal(false)}
            onOkSuccess={(res) =>
              router.push(`${PATH.LOGISTIC}/gi-disposal/detail/${router.query.id}`)
            }
            content="Are you sure want to approve?"
            successContent={(res: any) => 'Approve Success'}
            successOkText="OK"
          />
        </Col>
      )}
    </>
  )
}
