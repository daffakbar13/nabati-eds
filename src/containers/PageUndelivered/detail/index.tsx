import React, { useState } from 'react'
import { Button, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, DataList } from 'src/components'
import { Divider, Row, Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { confirmUndelivered, getUndeliveredDetail } from 'src/api/undelivered'
import { PATH } from 'src/configs/menus'
import { fieldReason } from 'src/configs/fieldFetches'
import Loader from 'src/components/Loader'
import dateFormat from 'src/utils/dateFormat'
import TitleDataList from 'src/components/TitleDataList'
import { tableUndelivered } from './columns'
import ConfirmApprove from '../alerts/ConfirmApprove'
import ConfirmSuccessApprove from '../alerts/ConfirmSuccessApprove'
import ConfirmSuccessReject from '../alerts/ConfirmSuccessReject'
import ConfirmSuccessReschedule from '../alerts/ConfirmSuccessReschedule'
import ConfirmConfirm from '../alerts/ConfirmConfirm'

export default function PageApprovalDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState<
    'approve' | 'success-approve' | 'success-reject' | 'success-reschedule' | 'confirm' | ''
  >('')
  const [reason, setReason] = React.useState('')
  const [dataTable, setDataTable] = React.useState([])
  const [optionsReason, setOptionsReason] = React.useState([])
  const [payloads, setPayloads] = React.useState({})
  const [proccessing, setProccessing] = React.useState('')
  const [isSuccessConfirm, setIsSuccessConfirm] = useState(false)
  const onProcess = proccessing !== ''
  const data = useDetail(getUndeliveredDetail, { id: router.query.id as string }, false)
  const hasData = Object.keys(data).length > 0

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

  React.useEffect(() => {
    if (hasData) {
      setDataTable(data.item)
    }
  }, [data])

  React.useEffect(() => {
    fieldReason('J')
      .then((res) => {
        setOptionsReason(res)
        setReason(res[0].value)
      })
      .catch(() => setOptionsReason([]))
  }, [])

  React.useEffect(() => {
    setPayloads(() => ({
      shipment_id: router.query.id,
      delivery_data: dataTable.map((d, i) => ({
        delivery_id: d.delivery_oder_id,
        delivery_date: d.order_date,
        is_delivery: 0,
        cancelation_reason_id: reason,
      })),
    }))
  }, [dataTable])

  const handleApprove = (date: any) => {
    setProccessing('Wait for approving')

    const newPayload = {
      shipment_id: router.query.id,
      delivery_data:
        dataTable?.length > 0
          ? dataTable.map((item) => ({
              delivery_id: item?.delivery_oder_id,
              delivery_date: date,
              is_delivery: 1,
              cancelation_reason_id: '',
            }))
          : [],
    }
    setPayloads(newPayload)

    // confirmUndelivered(payload)
    //   .then(() => {
    //     setIsSuccessConfirm(true)
    //     setShowConfirm('success-approve')
    //     setProccessing('')
    //   })
    //   .catch(() => setProccessing(''))
  }

  const handleReject = (reason: string, index: number) => {
    // setProccessing('Wait for rejecting')

    // const payload = {
    //   shipment_id: router.query.id,
    //   items: [
    //     {
    //       delivery_order_id: dataTable[index]['delivery_oder_id'],
    //       new_delivery_date: dataTable[index]['order_date'],
    //       cancel_reason: reason,
    //     },
    //   ],
    // }
    const newPayload = {
      shipment_id: router.query.id,
      delivery_data: [
        {
          delivery_id: dataTable[index].delivery_oder_id,
          delivery_date: dataTable[index].order_date,
          is_delivery: 0,
          cancelation_reason_id: reason,
        },
      ],
    }
    setPayloads(newPayload)
    const newData = [...dataTable]
    newData[index] = {
      ...dataTable[index],
      cancel_reason: reason,
    }
    setDataTable(newData)

    // confirmUndelivered(payload)
    //   .then(() => {
    //     setShowConfirm('success-reject')

    //     const newData = [...dataTable]
    //     newData[index] = {
    //       ...dataTable[index],
    //       cancel_reason: reason,
    //     }
    //     setDataTable(newData)

    //     setProccessing('')
    //   })
    //   .catch(() => setProccessing(''))
  }

  const handleReschedule = (date: any, index: number) => {
    // setProccessing('Wait for reschedule')
    // const payload = {
    //   shipment_id: router.query.id,
    //   items: [
    //     {
    //       delivery_order_id: dataTable[index]['delivery_oder_id'],
    //       new_delivery_date: date,
    //       cancel_reason: dataTable[index]['cancel_reason'],
    //     },
    //   ],
    // }

    const payload = {
      shipment_id: router.query.id,
      delivery_data: [
        {
          delivery_id: dataTable[index].delivery_oder_id,
          delivery_date: date,
          is_delivery: 1,
          cancelation_reason_id: '',
        },
      ],
    }

    setPayloads(payload)

    const newData = [...dataTable]
    newData[index] = {
      ...dataTable[index],
      new_delivery_date: date,
    }
    setDataTable(newData)

    // console.log(date)
    // confirmUndelivered(payload)
    //   .then(() => {
    //     setShowConfirm('success-reschedule')

    //     const newData = [...dataTable]
    //     newData[index] = {
    //       ...dataTable[index],
    //       new_delivery_date: date,
    //     }
    //     setDataTable(newData)

    //     setProccessing('')
    //   })
    //   .catch(() => setProccessing(''))
  }

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
            router.push(`${PATH.SALES}/undelivered`)
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          {!isSuccessConfirm && (
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                setShowConfirm('confirm')
              }}
            >
              Confirm
            </Button>
          )}
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
              columns={tableUndelivered(handleReject, handleReschedule)}
              data={dataTable}
            />
          </div>
        </Card>
      )}
      {showConfirm === 'confirm' && (
        <ConfirmConfirm
          payload={payloads}
          onCancel={() => setShowConfirm('')}
          setProccessing={setProccessing}
          setShowConfirm={setShowConfirm}
        />
      )}
      {showConfirm === 'approve' && (
        <ConfirmApprove
          selectedItems={[router.query.id]}
          onSubmit={handleApprove}
          onCancel={() => setShowConfirm('')}
        />
      )}
      {showConfirm === 'success-approve' && (
        <ConfirmSuccessApprove selectedItems={[router.query.id]} onOk={() => setShowConfirm('')} />
      )}
      {showConfirm === 'success-reject' && (
        <ConfirmSuccessReject selectedItems={[router.query.id]} onOk={() => setShowConfirm('')} />
      )}
      {showConfirm === 'success-reschedule' && (
        <ConfirmSuccessReschedule
          selectedItems={[router.query.id]}
          onOk={() => setShowConfirm('')}
        />
      )}

      {proccessing && <Loader type="process" text={proccessing} />}
    </Col>
  )
}
