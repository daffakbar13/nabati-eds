import React from 'react'
import { Button, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, DataList, Popup } from 'src/components'
import { Divider, Row, Typography, Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getUndeliveredDetail, multipleSubmitUndelivered } from 'src/api/undelivered'
import { PATH } from 'src/configs/menus'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'
import Loader from 'src/components/Loader'
import dateFormat from 'src/utils/dateFormat'
import TitleDataList from 'src/components/TitleDataList'
import { tableUndelivered } from './columns'

export default function PageApprovalDetail() {
  const titlePage = useTitlePage('detail')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [proccessing, setProccessing] = React.useState('')
  const onProcess = proccessing !== ''
  const router = useRouter()
  const data = useDetail(getUndeliveredDetail, { id: router.query.id as string }, false)
  const hasData = Object.keys(data).length > 0
  const [dataTable, setDataTable] = React.useState([])

  const dataList = [
    DataList.createDataList('Sales Org.', data.sales_org),
    DataList.createDataList('Plant', data.plant),
    DataList.createDataList('Vehicle', data.vechile),
    DataList.createDataList('Driver', data.driver),
    DataList.createDataList('Loading Date', dateFormat(data.loading_date)),
    DataList.createDataList('Gl Date', data.gl_date),
    DataList.createDataList('Created On', data.created_on),
    DataList.createDataList('Created By', data.created_by),
    DataList.createDataList('Modified On', data.modified_on),
    DataList.createDataList('Modified By', data.modified_by),
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
            multipleSubmitUndelivered({
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
        value={optionsReason.find((e) => reason === e.value)?.label}
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
            multipleSubmitUndelivered({
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

  const RejectRerason = (value: string, index: number) => {
    const newData = [...dataTable]
    newData[index] = {
      ...dataTable[index],
      rejectReason: value,
    }
    setDataTable(newData)
  }

  React.useEffect(() => {
    setDataTable(data.item)
  }, [data])

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
          <Button
            size="big"
            variant="primary"
            onClick={() => {
              setShowConfirm('approve')
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
      <Spacer size={20} />
      {hasData && (
        <Card style={{ padding: '16px 20px' }}>
          <Row>
            <TitleDataList title="Undelivered Shipment" />
          </Row>
          <Row>
            <Col span={12}>
              {dataList.slice(0, 5).map(({ label, value }, i) => (
                <DataList key={i} label={label} value={value} />
              ))}
            </Col>
            <Col span={12}>
              {dataList.slice(5, 10).map(({ label, value }, i) => (
                <DataList key={i} label={label} value={value} />
              ))}
            </Col>
          </Row>
          <Divider />
          <div style={{ overflow: 'scroll' }}>
            <Table
              scroll={{ x: 'max-content', y: 600 }}
              columns={tableUndelivered(RejectRerason)}
              data={dataTable}
            />
          </div>
        </Card>
      )}
      {showConfirm === 'approve' && <ConfirmApprove />}
      {showConfirm === 'success-approve' && <ConfirmSuccessApprove />}
      {showConfirm === 'reject' && <ConfirmReject />}
      {showConfirm === 'success-reject' && <ConfirmSuccessReject />}
    </Col>
  )
}
