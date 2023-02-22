import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { Col, Tabs } from 'antd'
import { Button, Spacer, Table, Text } from 'pink-lava-ui'
import { Card, GoBackArrow, Modal, Loader } from 'src/components'

import { getDetailBadStock, updateStatusBadStock } from 'src/api/logistic/bad-stock'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'
import DocumentHeader from './tabs/DocumentHeader'
import BAP from './tabs/BAP'

export default function PageQuotationDetail() {
  const componentRef = useRef()
  const [currentTab, setCurrentTab] = useState('1')
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

  const AllTabs = [
    { label: 'Document Header', key: '1' },
    { label: 'BAP', key: '2' },
  ]

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
            {details?.status_name === 'Approved' && (
              <Tabs
                defaultActiveKey="1"
                onChange={(e) => {
                  setCurrentTab(e)
                }}
                items={AllTabs}
              />
            )}
            {currentTab === '1' ? (
              <DocumentHeader details={details} loading={loading} />
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: 'grey',
                  padding: '15px 0',
                  maxHeight: 1122.5,
                  overflow: 'scroll',
                }}
              >
                <div ref={componentRef}>{currentTab === '2' && <BAP data={details} />}</div>
              </div>
            )}
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
