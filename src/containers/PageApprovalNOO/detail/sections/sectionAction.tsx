import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { PATH } from 'src/configs/menus'
import { Text, Button } from 'pink-lava-ui'
import { useTitlePage } from 'src/hooks'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { Popup } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { multipleSubmitApprovalNOO } from 'src/api/approval-noo'
import { fieldReason } from 'src/configs/fieldFetches'

export default function SectionAction() {
  const {
    state: { data },
  } = useSalesQuotationDetailContext()
  const titlePage = useTitlePage('detail')
  const router = useRouter()

  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [proccessing, setProccessing] = React.useState('')
  const onProcess = proccessing !== ''

  const ConfirmApprove = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Approve
      </Typography.Title>
      Are you sure to approve customer {router.query.id} ?
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
            multipleSubmitApprovalNOO(
              { id: data?.bill_to_customer?.bill_to_customer_id },
              { status_approved_id: '01' },
            )
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
          Customer
          <Typography.Text copyable={{ text: router.query.id as string }}>
            {` ${router.query.id}`}
          </Typography.Text>{' '}
        </div>
        <div>Approved successfully</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/approval-noo`)
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
            multipleSubmitApprovalNOO(
              { id: data?.bill_to_customer?.bill_to_customer_id },
              { status_approved_id: '02', rejecet_reason_id: reason },
            )
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
            router.push(`${PATH.SALES}/approval-noo`)
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
    <>
      <Row justify="space-between">
        <Row gutter={5}>
          <Col>
            <ArrowLeftOutlined
              onClick={() => {
                router.push({ pathname: `${PATH.SALES}/approval-noo` })
              }}
              style={{ fontSize: 25, lineHeight: '48px' }}
            />
          </Col>
          <Col>
            <Text variant={'h4'}>{titlePage}</Text>
          </Col>
        </Row>
      </Row>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card style={{ borderRadius: 10 }}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: 'fit-content',
                  padding: 10,
                  fontWeight: 600,
                  border: '1.5px solid #aaa',
                  borderRadius: 10,
                }}
              >
                {data?.status?.description}
              </div>
              <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
                {data?.status?.id === '00' && (
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
          </Card>
        </Col>
      </Row>
      {showConfirm === 'approve' && <ConfirmApprove />}
      {showConfirm === 'success-approve' && <ConfirmSuccessApprove />}
      {showConfirm === 'reject' && <ConfirmReject />}
      {showConfirm === 'success-reject' && <ConfirmSuccessReject />}
    </>
  )
}
