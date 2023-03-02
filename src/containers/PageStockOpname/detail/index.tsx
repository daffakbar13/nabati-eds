import { Col, Divider, Row } from 'antd'
import { Spacer, Table, Text, Button } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Modal } from 'src/components'
import { toTitleCase } from 'src/utils/caseConverter'
import { useRouter } from 'next/router'
import { getDetailStockOpname, updateStatusStockOpname } from 'src/api/logistic/stock-opname'
import { PATH } from 'src/configs/menus'
import { STOCK_ADJUSTMENT_STATUS as S } from 'src/configs/stockAdjustment'
import dateFormat from 'src/utils/dateFormat'
import TaggedStatus from 'src/components/TaggedStatus'
import { columns } from './columns'
import { Loader } from 'src/components'
import useDetail from 'src/hooks/useDetail'
import DataList from 'src/components/DataList'

export default function DetailStockOpname() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const id = String(router.query.id) || ''

  // Modals
  const [rejectModal, setRejectModal] = useState(false)
  const [approveModal, setApproveModal] = useState(false)

  const handleReject = async () => {
    try {
      const payload = { status_id: S.rejected }
      const res = await updateStatusStockOpname(id, payload)
      return res
    } catch (error) {
      return false
    }
  }
  const handleApprove = async () => {
    try {
      const payload = { status_id: S.approved }
      const res = await updateStatusStockOpname(id, payload)
      return res
    } catch (error) {
      return false
    }
  }

  const details: any = useDetail(getDetailStockOpname, { id: router.query.id as string }, false)

  const dataList = [
    DataList.createDataList(
      'Branch.',
      `${details?.branch_id} - ${toTitleCase(details?.branch_name)}`,
    ),
    DataList.createDataList('SLoc', `${details?.sloc_id} - ${toTitleCase(details?.sloc_name)}`),
    DataList.createDataList('Doc Date', dateFormat(details?.document_date)),
    DataList.createDataList('Posting Date', dateFormat(details?.posting_date)),
    DataList.createDataList('Header Text', details?.header_text),
    DataList.createDataList('Created On', dateFormat(details?.created_at)),
    DataList.createDataList('Created By', details?.created_by),
    DataList.createDataList('Modified On', dateFormat(details?.modified_at)),
    DataList.createDataList('Modified By', details?.modified_by),
  ]

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
            <GoBackArrow to={`${PATH.LOGISTIC}/stock-opname`} />
            <Text variant={'h4'}>View Stock Opname {`${router.query.id}`}</Text>
          </div>
          <Spacer size={20} />
          <Card style={{ overflow: 'unset', marginBottom: 9 }}>
            <div style={{ display: 'flex' }}>
              <TaggedStatus
                status={
                  details.status === 'Wait Approval Opname' ? 'Wait For Approval' : details.status
                }
                size="h5"
              />

              {details?.status && details?.status === 'Rejected' && (
                <div
                  style={{
                    display: 'grid',
                    marginLeft: 'auto',
                    gridTemplateColumns: '1fr',
                    gap: 12,
                  }}
                >
                  <Button
                    size="big"
                    variant="secondary"
                    onClick={() => {
                      router.push(`${PATH.LOGISTIC}/stock-opname/edit/${router.query.id}`)
                    }}
                    loading={loading}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </Card>
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
              <Table
                scroll={{ x: 'max-content', y: 600 }}
                columns={columns}
                dataSource={details?.items || []}
              />
            </div>
          </Card>

          <Modal
            title="Confirm Reject"
            open={rejectModal}
            onOk={handleReject}
            onCancel={() => setRejectModal(false)}
            onOkSuccess={() =>
              router.push(`${PATH.LOGISTIC}/stock-opname/detail/${router.query.id}`)
            }
            content="Are you sure want to reject?"
            successContent={() => 'Reject Success'}
            successOkText="OK"
          />

          <Modal
            title="Confirm Approve"
            open={approveModal}
            onOk={handleApprove}
            onCancel={() => setApproveModal(false)}
            onOkSuccess={() =>
              router.push(`${PATH.LOGISTIC}/stock-opname/detail/${router.query.id}`)
            }
            content="Are you sure want to approve?"
            successContent={() => 'Approve Success'}
            successOkText="OK"
          />
        </Col>
      )}
    </>
  )
}
