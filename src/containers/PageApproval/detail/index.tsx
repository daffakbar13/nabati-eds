import React from 'react'
import { Button, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, DataList, Popup } from 'src/components'
import { Divider, Row, Typography, Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getApprovalDetail, multipleSubmitApproval } from 'src/api/approval'
import { PATH } from 'src/configs/menus'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'
import Loader from 'src/components/Loader'
import dateFormat from 'src/utils/dateFormat'
import TitleDataList from 'src/components/TitleDataList'
import Total from 'src/components/Total'
import { concatString } from 'src/utils/concatString'
import { PageApprovalDetailProps } from './types'
import { tableApproval } from './columns'

export default function PageApprovalDetail(props: PageApprovalDetailProps) {
  const titlePage = useTitlePage('detail')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [proccessing, setProccessing] = React.useState('')
  const onProcess = proccessing !== ''
  const router = useRouter()
  const data = useDetail(getApprovalDetail, { id: router.query.id as string })
  const hasData = Object.keys(data).length > 0

  const dataList = [
    DataList.createDataList('Quotation', data.document_ref_id),
    DataList.createDataList('Customer', concatString(data.customer_id, data.customer_name)),
    DataList.createDataList('Sales Org.', concatString(data.sales_org_id, data.sales_org_name)),
    DataList.createDataList('Branch', concatString(data.branch_id, data.branch_name)),
    DataList.createDataList('Salesman', concatString(data.salesman_id, data.salesman_name)),
    // FIXME Doc. Date
    DataList.createDataList('Doc. Date', dateFormat(data.doc_date)),
    DataList.createDataList('Valid From', dateFormat(data.valid_from)),
    DataList.createDataList('Valid To', dateFormat(data.valid_to)),
    DataList.createDataList('Delivery Date', dateFormat(data.delivery_date)),
    DataList.createDataList('Reference', data.customer_ref),
    DataList.createDataList('Created On', dateFormat(data.created_at)),
    DataList.createDataList('Created By', data.created_by),
    DataList.createDataList('Modified On', dateFormat(data.modified_at)),
    DataList.createDataList('Modified By', data.modified_by),
    // FIXME Created From
    DataList.createDataList('Created From', data.created_from),
  ]

  const ConfirmApprove = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Approve
      </Typography.Title>
      Are you sure to approve Sales Order {router.query.id} ?
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            setProccessing('Wait for approving')
            multipleSubmitApproval({
              order_list: [{ id: router.query.id }],
              status_approved_id: '01',
            })
              .then(() => {
                setShowConfirm('success-approve')
                setProccessing('')
              })
              .catch(() => setProccessing(''))
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessApprove = () => (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Approve Success
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
          Sales Order
          <Typography.Text copyable={{ text: router.query.id as string }}>
            {` ${router.query.id}`}
          </Typography.Text>{' '}
          has been
        </div>
        <div>successfully approved</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/approval`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  const ConfirmReject = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Rejectation
      </Typography.Title>
      <DebounceSelect
        type="select"
        value={optionsReason.find(({ value }) => reason === value)?.label}
        label={'Reason Reject Sales Order'}
        required
        options={optionsReason}
        onChange={(e) => setReason(e.value)}
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            setProccessing('Wait for rejecting')
            multipleSubmitApproval({
              order_list: [{ id: router.query.id }],
              status_approved_id: '02',
              reject_reason_id: reason,
            })
              .then(() => {
                setShowConfirm('success-reject')
                setProccessing('')
              })
              .catch(() => setProccessing(''))
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessReject = () => (
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
          Sales Order
          <Typography.Text copyable={{ text: router.query.id as string }}>
            {` ${router.query.id} `}
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
          onClick={() => {
            router.push(`${PATH.SALES}/approval`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  React.useEffect(() => {
    fieldReason('C')
      .then((res) => {
        setOptionsReason(res)
        setReason(res[0].value)
      })
      .catch(() => setOptionsReason([]))
  }, [])

  return (
    <Col>
      {!hasData && <Loader type="process" text="Wait for get data" />}
      {onProcess && <Loader type="process" text={proccessing} />}
      <div style={{ display: 'flex', gap: 5 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push({
              pathname: `${PATH.SALES}/approval`,
              query: {
                page: router.query.page,
                limit: router.query.limit,
              },
            })
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          {router.query.status === 'Wait For Approval' && (
            <>
              <Button
                size="big"
                variant="tertiary"
                onClick={() => {
                  setShowConfirm('reject')
                }}
              >
                Reject
              </Button>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  setShowConfirm('approve')
                }}
              >
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
      <Spacer size={20} />
      {hasData && (
        <Card style={{ padding: '16px 20px' }}>
          <Row>
            <TitleDataList title="Sales Order" />
          </Row>
          <Row>
            <Col span={12}>
              {dataList.slice(0, 5).map(({ label, value }, i) => (
                <DataList key={i} label={label} value={value} />
              ))}
              <DataList label="Block Status" value="Not Implement" />
              {data.status_approved_id === '02' && (
                <DataList label="Reason Reject" value="Not Implement" />
              )}
            </Col>
            <Col span={12}>
              {dataList.slice(5, 10).map(({ label, value }, i) => (
                <DataList key={i} label={label} value={value} />
              ))}
            </Col>
          </Row>
          <Divider />
          <Table scroll={{ x: 'max-content' }} columns={tableApproval} data={data.items} />
          <Spacer size={30} />
          <Row>
            <Col span={12} offset={12}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <Total label="Total Gross" value={data.gross_total_amount.toLocaleString()} />
                <Total label="Total DPP" value={data.dpp_total_amount.toLocaleString()} />
                <Total label="Total Disc" value={data.discount_total_amount.toLocaleString()} />
                <Total label="Total Net" value={data.net_total_amount.toLocaleString()} />
                <Total label="Total Tax" value={data.tax_total_amount.toLocaleString()} />
                <Total label="Total Amount" value={data.total_amount.toLocaleString()} largeSize />
              </div>
            </Col>
          </Row>
        </Card>
      )}
      {showConfirm === 'approve' && <ConfirmApprove />}
      {showConfirm === 'success-approve' && <ConfirmSuccessApprove />}
      {showConfirm === 'reject' && <ConfirmReject />}
      {showConfirm === 'success-reject' && <ConfirmSuccessReject />}
    </Col>
  )
}
