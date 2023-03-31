import { Tag, Divider, Typography } from 'antd'
import { Col, Spacer, Table, Text, Button } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Modal } from 'src/components'
import List from 'src/components/List'
import { toTitleCase } from 'src/utils/caseConverter'
import { useRouter } from 'next/router'
import {
  createStockAdjustment,
  getDetailStockAdjustment,
  updateStatusStockAdjustment,
} from 'src/api/logistic/stock-adjustment'
import { PATH } from 'src/configs/menus'
import { STOCK_ADJUSTMENT_STATUS as S } from 'src/configs/stockAdjustment'
import dateFormat from 'src/utils/dateFormat'
import TaggedStatus from 'src/components/TaggedStatus'
import { columns } from './columns'
import { Loader } from 'src/components'
import useDetail from 'src/hooks/useDetail'
import moment from 'moment'

export default function DetailStockAdjustment() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const id = String(router.query.id) || ''
  const details: any = useDetail(getDetailStockAdjustment, { id: router.query.id as string }, false)

  // Modals
  const [rejectModal, setRejectModal] = useState(false)
  const [submitModal, setSubmitModal] = useState(false)

  const handleReject = async () => {
    try {
      const payload = { status_id: S.rejected }
      const res = await updateStatusStockAdjustment(id, payload)
      return res
    } catch (error) {
      return false
    }
  }
  const handleSubmit = async () => {
    const payload: any = {
      branch_id: details?.branch_id,
      stock_doct_type: 'PIP',
      material_doc_type: 'WA',
      document_date: moment(details?.document_date).format('YYYY-MM-DD'),
      posting_date: moment(details?.posting_date).format('YYYY-MM-DD'),
      header_text: details?.header_text,
      sloc_id: details?.sloc_id,
      status_id: '00',
      items: details?.items?.length
        ? details?.items?.map((i) => ({
            product_id: i.product_id,
            large: i.qty_unit?.large,
            middle: i.qty_unit?.middle,
            small: i.qty_unit?.small,
            remarks: '',
            batch: '',
          }))
        : [],
    }

    try {
      const res = await createStockAdjustment(payload)
      // await freezeSlocIdByBranchId(
      //   {
      //     id: slocSelected,
      //     is_freeze: 1,
      //   },
      //   branchSelected,
      // )
      return res
    } catch (error) {
      const newLocal = false
      return newLocal
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
            <GoBackArrow to={`${PATH.LOGISTIC}/stock-adjustment`} />
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
              {details?.status && details?.status === 'Rejected' && (
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
                    variant="secondary"
                    onClick={() => {
                      router.push(`${PATH.LOGISTIC}/stock-adjustment/edit/${router.query.id}`)
                    }}
                    loading={loading}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => setSubmitModal(true)}
                    size="big"
                    variant="primary"
                    loading={loading}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </Card>
          <Card>
            <List loading={loading}>
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

          <Modal
            title="Confirm Reject"
            open={rejectModal}
            onOk={handleReject}
            onCancel={() => setRejectModal(false)}
            onOkSuccess={() =>
              router.push(`${PATH.LOGISTIC}/stock-adjustment/detail/${router.query.id}`)
            }
            content="Are you sure want to reject?"
            successContent={() => 'Reject Success'}
            successOkText="OK"
          />

          <Modal
            open={submitModal}
            onOk={handleSubmit}
            onCancel={() => setSubmitModal(false)}
            title="Confirm Submit"
            content={`Are you sure want to Submit this data ?`}
            successOkText="OK"
            onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/stock-adjustment`)}
            successContent={(res: any) => (
              <>
                Stock Adjusment ID :
                <Typography.Text copyable={{ text: res?.data.stock_adjust_id as string }}>
                  {' '}
                  {res?.data.stock_adjust_id}
                </Typography.Text>
                has been successfully submitted
              </>
            )}
          />
        </Col>
      )}
    </>
  )
}
