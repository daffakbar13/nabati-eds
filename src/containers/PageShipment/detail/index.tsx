import React, { useState } from 'react'
import { Button, Col, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Tabs, Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { useDetail } from 'src/hooks'
import {
  getDetailShipment,
  getShipmentBpb,
  getShipmentBstf,
  getShipmentBsts,
  getShipmentHph,
  PGIShipment,
} from 'src/api/shipment'
import { useRouter } from 'next/router'
import ReactToPrint from 'react-to-print'
import Loader from 'src/components/Loader'
import moment from 'moment'
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { PATH } from 'src/configs/menus'
import AllTabs from './tabs'
import DocumentHeader from './tabs/DocumentHeader'
import BPB from './tabs/BPB'
import HPH from './tabs/HPH'
import BSTF from './tabs/BSTF'
import BSTS from './tabs/BSTS'
import { Modal } from 'src/components'
import { validateFreezeByBranchId } from 'src/api/logistic/stock-opname'
import DocumentAccounting from './tabs/DocumentAccounting'

export default function PageShipmentDetail() {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [processing, setProcessing] = React.useState('')
  const [postingDate, setPostingDate] = React.useState(moment().format('YYYY-MM-DD'))
  const [showCheckFreezeModal, setShowCekFreezeModal] = React.useState(false)

  const router = useRouter()

  const data = useDetail(getDetailShipment, router.query)
  const dataBpb = useDetail(getShipmentBpb, router.query)
  const dataBstf = useDetail(getShipmentBstf, router.query)
  const dataBsts = useDetail(getShipmentBsts, router.query)
  const dataHph = useDetail(getShipmentHph, router.query)
  const hasData = Object.keys(data).length > 0
  const componentRef = React.useRef()

  const isStatus = (...value: string[]) => value.includes(router.query.status as string)
  const { tradeType } = router.query

  const ConfirmPGI = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm PGI
      </Typography.Title>
      <DatePickerInput
        fullWidth
        onChange={(val: any) => {
          setPostingDate(moment(val).format('YYYY-MM-DD'))
        }}
        label="Posting Date"
        disabledDate={(current) => current < moment().startOf('day')}
        value={moment(postingDate)}
        format={'YYYY-MM-DD'}
        required
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
          onClick={async () => {
            setProcessing('Wait For PGI')

            const validateResponse = await validateFreezeByBranchId(
              {},
              data?.shipment_detail?.branch_id,
              1,
            )
            if (validateResponse.data !== null) {
              setShowCekFreezeModal(true)
              setShowConfirm('')
              setProcessing('')
              return
            }

            PGIShipment(router.query.id as string, { posting_date: postingDate })
              .then(() => {
                setProcessing('')
                setShowConfirm('success-pgi')
              })
              .catch(() => {
                setProcessing('')
              })
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessPGI = () => (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Submit Success
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
          Shipment{' '}
          <Typography.Text copyable={{ text: router.query.id as string }}>
            {router.query.id}
          </Typography.Text>
          has been
        </div>
        <div>successfully submitted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/shipment`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  return (
    <Col>
      {processing !== '' && <Loader type="process" text={processing} />}
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push({
              pathname: `${PATH.SALES}/shipment`,
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
          {isStatus('New') && (
            <>
              <Button size="big" variant="tertiary" onClick={() => {}}>
                Cancel Process
              </Button>
              {currentTab === '1' && (
                <>
                  <Button size="big" variant="secondary" onClick={() => {}}>
                    Edit
                  </Button>
                  <Button size="big" variant="primary" onClick={() => setShowConfirm('pgi')}>
                    PGI
                  </Button>
                </>
              )}
            </>
          )}
          {currentTab !== '1' && (
            <ReactToPrint
              trigger={() =>
                tradeType === 'MT' ? (
                  <Button size="big" variant="primary">
                    {currentTab === '2' && 'Print BPB'}
                    {currentTab === '3' && 'Print BSTS'}
                    {currentTab === '4' && 'Print HPH'}
                    {currentTab === '5' && 'Print'}
                  </Button>
                ) : (
                  <Button size="big" variant="primary">
                    {currentTab === '2' && 'Print BPB'}
                    {currentTab === '3' && 'Print BSTF'}
                    {currentTab === '4' && 'Print HPH'}
                    {currentTab === '5' && 'Print'}
                  </Button>
                )
              }
              content={() => componentRef.current}
            />
          )}
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <Tabs
          defaultActiveKey="1"
          onChange={(current) => {
            setCurrentTab(current)
          }}
          items={
            isStatus('New')
              ? AllTabs(tradeType as 'MT' | 'GT').slice(0, 2)
              : AllTabs(tradeType as 'MT' | 'GT')
          }
        />
        {hasData && (
          <>
            {currentTab === '1' ? (
              <DocumentHeader data={data} />
            ) : currentTab === '5' ? (
              <DocumentAccounting data={data} />
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
                {tradeType === 'MT' ? (
                  <div ref={componentRef}>
                    {currentTab === '2' && <BPB data={dataBpb} />}
                    {currentTab === '3' && <BSTS data={dataBsts} />}
                    {currentTab === '4' && <HPH data={dataHph} />}
                  </div>
                ) : (
                  <div ref={componentRef}>
                    {currentTab === '2' && <BPB data={dataBpb} />}
                    {currentTab === '3' && <BSTF data={dataBstf} />}
                    {currentTab === '4' && <HPH data={dataHph} />}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Card>
      {showConfirm === 'pgi' && <ConfirmPGI />}
      {showConfirm === 'success-pgi' && <ConfirmSuccessPGI />}
      <Modal
        open={showCheckFreezeModal}
        onOk={() => router.back()}
        onCancel={() => setShowCekFreezeModal(false)}
        title="Warning"
        content={`This transactionn cannot be processed, because the Branch ${data?.shipment_detail?.branch_id} with the SLoc ${data?.shipment_detail?.sloc_id} is being freeze, please wait a few moments`}
      />
    </Col>
  )
}
